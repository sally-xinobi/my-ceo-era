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

    // --- AI PSYCHOANALYSIS & BILLIONAIRE BLUEPRINT ENGINE ---
    const result = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: z.object({
        psychoanalysis: z
          .string()
          .describe(
            "A brutally honest, highly empathetic 1-sentence read of their internet persona based on the data. E.g., 'You project a pristine aesthetic on Insta, but your Reddit history shows you're a stressed-out overthinker.'",
          ),
        epiphanyMoment: z
          .string()
          .describe(
            "The 'OMG I need this' realization. E.g., 'Stop complaining about your 9-to-5. You already curate better Notion templates than your boss.'",
          ),
        businessTitle: z
          .string()
          .describe("A Gen-Z catchy product/business name."),
        niche: z
          .string()
          .describe(
            "Hyper-specific internet micro-niche (e.g., 'Corporate Goth', 'Cozy Doomscroller')",
          ),
        billionaireMuse: z
          .string()
          .describe(
            "The name of the celebrity/billionaire whose playbook you are applying (e.g., 'Kylie Jenner', 'MrBeast', 'Emma Chamberlain', 'Naval').",
          ),
        museStrategy: z
          .string()
          .describe(
            "The exact strategy stolen from that muse. E.g., 'Applying Kylie Jenner's lip-kit scarcity model: we are going to hype up this digital product for 3 weeks on TikTok, then release only 100 copies to create insane FOMO.'",
          ),
        step1_product: z
          .string()
          .describe(
            "Exactly what digital product to build first. Low effort, high aesthetic value.",
          ),
        step2_marketing: z
          .string()
          .describe(
            "How to market it using their exact vibe and the Muse's strategy.",
          ),
      }),
      prompt: `You are a Palantir-level OSINT analyst and a world-class Gen Z brand strategist.
      Analyze this multi-platform raw data extracted for the target ID "${cleanHandle}":
      ${JSON.stringify(digitalFootprint, null, 2)}
      
      CRITICAL INSTRUCTIONS:
      1. READ THEM TO FILTH: Synthesize their data/username to guess their exact internet archetype.
      2. THE BILLIONAIRE PLAYBOOK: Once you figure out their niche (Beauty, Gaming, Tech, Aesthetic Lifestyle, etc.), pick a famous Billionaire or Mega-Creator who dominates that space (e.g., Kylie Jenner for beauty, MrBeast for viral hooks, Emma Chamberlain for relatable coffee/lifestyle, Naval for tech philosophy).
      3. Explain EXACTLY how you are taking that mega-creator's specific success secret (e.g., 'manufactured scarcity', 'retention editing', 'vulnerable oversharing') and injecting it into the user's tiny digital business.
      4. Tone: Brutal reality check mixed with hype-man energy. Use Gen Z slang ('delulu', 'era', 'gatekeeping'). Make them say "OMG this AI knows me better than my therapist, AND is giving me a billionaire's playbook."`,
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
