import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeoutMs = 2500,
) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
};

export async function POST(req: Request) {
  try {
    const { handle } = await req.json();
    const cleanHandle = handle.replace("@", "").trim();

    const digitalFootprint: Record<string, unknown> = {
      target_id: cleanHandle,
      platforms: {},
    };

    // --- OSINT EXTRACTION ---
    const getTikTok = async () => {
      try {
        const res = await fetchWithTimeout(
          `https://tokcount.com/?user=${cleanHandle}`,
          { headers: { "User-Agent": "Mozilla/5.0" } },
        );
        if (res.ok) {
          const html = await res.text();
          const followersMatch = html.match(/"followers":\s*(\d+)/);
          const bioMatch = html.match(/"signature":\s*"([^"]+)"/);
          let bio = "No bio";
          if (bioMatch?.[1])
            bio = bioMatch[1].replace(/\\u[\dA-F]{4}/gi, (m) =>
              String.fromCharCode(parseInt(m.replace(/\\u/g, ""), 16)),
            );
          return {
            active: true,
            followers: followersMatch ? followersMatch[1] : 0,
            bio,
          };
        }
      } catch (_e) {
        return { active: false };
      }
      return { active: false };
    };

    const getReddit = async () => {
      try {
        const res = await fetchWithTimeout(
          `https://www.reddit.com/user/${cleanHandle}/about.json`,
        );
        if (res.ok) {
          const data = await res.json();
          return {
            active: true,
            karma: data.data.total_karma,
            bio: data.data.subreddit?.public_description || "No bio",
          };
        }
      } catch (_e) {
        return { active: false };
      }
      return { active: false };
    };

    const checkInsta = async () => {
      try {
        const res = await fetchWithTimeout(
          `https://www.instagram.com/${cleanHandle}/`,
          { method: "HEAD" },
        );
        return { active: res.status === 200 || res.status === 302 };
      } catch (_e) {
        return { active: "unknown" };
      }
    };

    const [tiktokData, redditData, instaData] = await Promise.allSettled([
      getTikTok(),
      getReddit(),
      checkInsta(),
    ]);

    digitalFootprint.platforms = {
      tiktok:
        tiktokData.status === "fulfilled"
          ? tiktokData.value
          : { active: false },
      reddit:
        redditData.status === "fulfilled"
          ? redditData.value
          : { active: false },
      instagram:
        instaData.status === "fulfilled" ? instaData.value : { active: false },
    };

    // --- AI ACTION PLAN ENGINE ---
    const result = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: z.object({
        epiphanyMoment: z
          .string()
          .describe(
            "A harsh but highly empathetic 1-sentence wake-up call to stop consuming and start creating based on their vibe. E.g., 'You spend 4 hours a day curating outfits on TikTok. People will literally pay you $15 for that taste.'",
          ),
        businessName: z
          .string()
          .describe("A catchy, modern digital business name."),
        productToBuild: z
          .string()
          .describe(
            "EXACTLY what the digital product is. E.g., 'A 10-page Notion template organizing minimalist capsule wardrobes.'",
          ),
        pricingStrategy: z
          .string()
          .describe(
            "Exact pricing model. E.g., 'Free lead magnet -> $19 premium template upsell.'",
          ),
        billionaireMuse: z
          .string()
          .describe(
            "The mega-creator strategy applied (e.g., 'Kylie Jenner Scarcity', 'MrBeast Retention', 'Emma Chamberlain Vulnerability').",
          ),
        actionPlanPhase1: z
          .string()
          .describe(
            "Phase 1 (Day 1-3) Creation: What exact tools to use and what to make. E.g., 'Use Carrd to make a free landing page. Build the template in Notion.'",
          ),
        actionPlanPhase2: z
          .string()
          .describe(
            "Phase 2 (Day 4-14) Traffic: How to get eyes on it using their existing social media habits. E.g., 'Post 7-second POV TikToks showing your messy room vs. your organized Notion template.'",
          ),
        actionPlanPhase3: z
          .string()
          .describe(
            "Phase 3 (Scale): How to make it passive income. E.g., 'Set up an automated Stan Store email sequence.'",
          ),
      }),
      prompt: `You are an elite, highly pragmatic Startup Advisor and OSINT Analyst for Gen Z creators.
      Analyze this multi-platform raw data extracted for the target ID "${cleanHandle}":
      ${JSON.stringify(digitalFootprint, null, 2)}
      
      CRITICAL INSTRUCTIONS:
      1. SKIP THE FLUFF. We are building an ACTION PLAN. Focus purely on WHAT to build, HOW to price it, and HOW to execute it.
      2. If the data is empty, deeply analyze the username itself to invent a hyper-niche archetype.
      3. The business MUST be a high-margin digital product (e.g., Notion template, curated list, Discord community, ebook, aesthetic presets) that requires ZERO upfront cost.
      4. Incorporate a specific Billionaire/Mega-Creator strategy as the marketing angle.
      5. Tone: Pragmatic, direct, hype-driven, and highly structured. Speak like a smart tech-founder giving advice over iMessage. Use terms like 'funnel', 'lead magnet', 'conversion'.`,
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to run OSINT engine" },
      { status: 500 },
    );
  }
}
