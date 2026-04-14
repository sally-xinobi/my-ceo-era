import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { handle } = await req.json();
    const cleanHandle = handle.replace("@", "");

    let scrapedBio = "No public bio found.";
    let stats = "No stats available.";

    // 1. 오픈 API를 통한 TikTok 프로필 데이터 추출 시도 (틱봇 방어 우회)
    // Tokcount API 사용 (서드파티 무료 통계 API)
    try {
      const response = await fetch(`https://tokcount.com/?user=${cleanHandle}`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36",
        },
      });

      if (response.ok) {
        const html = await response.text();
        
        // 정규식으로 Tokcount 페이지 내의 script 데이터 추출 시도
        const followersMatch = html.match(/"followers":\s*(\d+)/);
        const followingMatch = html.match(/"following":\s*(\d+)/);
        const likesMatch = html.match(/"likes":\s*(\d+)/);
        const bioMatch = html.match(/"signature":\s*"([^"]+)"/);

        if (bioMatch && bioMatch[1]) {
          // 이스케이프된 유니코드 텍스트 디코딩
          scrapedBio = bioMatch[1].replace(/\\u[\dA-F]{4}/gi, 
            function (match) {
              return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
            }
          );
        }

        if (followersMatch && likesMatch) {
          stats = `Followers: ${followersMatch[1]}, Likes: ${likesMatch[1]}`;
        }
      }
    } catch (scrapeError) {
      console.error("Scraping error:", scrapeError);
    }

    // 2. 크롤링된 데이터를 바탕으로 AI 비즈니스 분석
    const result = await generateObject({
      model: openai("gpt-4o"),
      schema: z.object({
        personaSummary: z
          .string()
          .describe(
            "A slightly snarky but highly accurate 1-sentence summary of their Gen Z aesthetic based on their actual bio."
          ),
        businessTitle: z
          .string()
          .describe(
            "Catchy title of the business they should start (e.g., 'Digital Notion Templates')"
          ),
        niche: z
          .string()
          .describe("Their specific aesthetic niche based on the bio"),
        step1: z
          .string()
          .describe(
            "Step 1: What is the exact digital product they should make based on their vibe? Keep it short and actionable."
          ),
        step2: z
          .string()
          .describe(
            "Step 2: How to funnel traffic using their current platform."
          ),
      }),
      prompt: `Act as a hyper-intelligent, Gen-Z digital footprint analyst and business strategist. 
      Analyze this real data extracted from the TikTok profile "@${cleanHandle}":
      
      Extracted Bio: "${scrapedBio}"
      Stats: "${stats}"
      
      CRITICAL INSTRUCTION: If the "Extracted Bio" contains any specific keywords, emojis, or clues (e.g., fitness, gaming, art, music, studying, links, quotes), you MUST structure the business EXACTLY around those real interests. NEVER output an empty vibe. 
      If the bio is completely empty or "No public bio found", deeply analyze the username "${cleanHandle}" itself. What kind of person uses that username? Infer a hyper-specific Gen Z archetype from the name and invent a brilliant business for them.
      
      Based on this data, create a highly specific, low-overhead digital business they could launch today. 
      The business must perfectly match their aesthetic/vibe so it feels authentic to their followers.`,
    });

    return NextResponse.json(result.object);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to analyze footprint" },
      { status: 500 }
    );
  }
}