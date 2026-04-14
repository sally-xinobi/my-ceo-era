import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
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

    const digitalFootprint: Record<string, any> = {
      target_id: cleanHandle,
      platforms: {},
    };

    // 1. TikTok Extraction
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

    // 2. Reddit Extraction (To catch the "uncensored" vibe)
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

    // 3. Instagram Presence
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

    digitalFootprint.platforms.tiktok =
      tiktokData.status === "fulfilled" ? tiktokData.value : { active: false };
    digitalFootprint.platforms.reddit =
      redditData.status === "fulfilled" ? redditData.value : { active: false };
    digitalFootprint.platforms.instagram =
      instaData.status === "fulfilled" ? instaData.value : { active: false };

    // --- AI PSYCHOANALYSIS & EMPATHY ENGINE ---
    // 프롬프트 핵심: 단순히 사업 제안이 아니라 뼈 때리는 공감(Relatability)과 "이거 내 얘긴데?"라는 반응 유도.
    const result = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        psychoanalysis: z
          .string()
          .describe(
            "A brutally honest, highly empathetic 1-sentence read of their internet persona. E.g., 'You project a pristine 'that girl' aesthetic on Insta, but your Reddit history shows you're actually a stressed-out overthinker who loves cozy games.'",
          ),
        epiphanyMoment: z
          .string()
          .describe(
            "The 'OMG I need this' realization. Tell them exactly what pain point in their life this business solves. E.g., 'Stop complaining about corporate 9-to-5s. You already curate better Notion templates than your boss.'",
          ),
        businessTitle: z
          .string()
          .describe(
            "A Gen-Z catchy product/business name. E.g., 'The Burnout Recovery OS (Notion)' or 'Unhinged Coping Mechanism Sticker Pack'",
          ),
        niche: z
          .string()
          .describe(
            "Hyper-specific internet micro-niche (e.g., 'Corporate Goth', 'Cozy Doomscroller', 'Delusional Academic')",
          ),
        step1_product: z
          .string()
          .describe(
            "Exactly what to build first. Low effort, high aesthetic value. E.g., 'Bundle your actual ADHD study playlists into a $5 Spotify/Gumroad link.'",
          ),
        step2_marketing: z
          .string()
          .describe(
            "How to sell it using their exact vibe. E.g., 'Post a 7-second POV TikTok complaining about midterms with the playlist in bio. Do NOT try to look professional.'",
          ),
      }),
      prompt: `You are a Palantir-level OSINT analyst and a world-class Gen Z brand strategist.
      Analyze this multi-platform raw data extracted for the target ID "${cleanHandle}":
      
      OSINT Data:
      ${JSON.stringify(digitalFootprint, null, 2)}
      
      CRITICAL INSTRUCTIONS FOR MAXIMUM EMPATHY:
      1. READ THEM TO FILTH: Synthesize the data. If they have high Reddit karma but no TikTok bio, they are a lurker with strong opinions. If they have Insta and TikTok, they care about image. 
      2. If all data is blank, psychoanalyze the username "${cleanHandle}". What kind of teenager chooses that handle? Are they an e-girl? A gym bro? A quiet nerd?
      3. The business idea MUST NOT BE GENERIC (No 'dropshipping' or 'social media agency'). It must be a weird, hyper-specific digital product (templates, lists, aesthetics, micro-guides, discord servers) that turns their personal flaws/obsessions into money.
      4. The tone must be a mix of a best friend hyping them up, and a brutal reality check. Use internet slang naturally (e.g., 'bestie', 'era', 'delulu', 'gatekeeping'). Make them say "OMG this AI knows me better than my therapist."`,
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
