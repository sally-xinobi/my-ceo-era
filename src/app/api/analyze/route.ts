import { NextResponse } from "next/server";
import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { z } from "zod";
import * as cheerio from "cheerio";

// Ensure you have OPENAI_API_KEY in your .env.local
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { handle } = await req.json();
    const cleanHandle = handle.startsWith("@") ? handle : `@${handle}`;

    // 1. 실제 TikTok 프로필 페이지 크롤링 (OSINT Extraction)
    let scrapedBio = "No public bio found.";
    let scrapedTitle = "";

    try {
      const response = await fetch(`https://www.tiktok.com/${cleanHandle}`, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          "Accept-Language": "en-US,en;q=0.9",
        },
      });

      if (response.ok) {
        const html = await response.text();
        const $ = cheerio.load(html);
        
        // TikTok의 메타 태그에는 유저의 소개글(Bio)과 팔로워 통계가 포함되어 있습니다.
        scrapedTitle = $("title").text() || "";
        scrapedBio = $('meta[name="description"]').attr("content") || "No public bio found.";
      } else {
        console.warn(`Failed to fetch TikTok profile for ${cleanHandle}. Status: ${response.status}`);
      }
    } catch (scrapeError) {
      console.error("Scraping error:", scrapeError);
    }

    // 2. 크롤링된 실제 데이터를 기반으로 AI 비즈니스 분석
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
      Analyze this real data extracted from the TikTok profile "${cleanHandle}":
      
      Page Title: ${scrapedTitle}
      Profile Bio & Stats: ${scrapedBio}
      
      If the bio contains specific keywords (e.g., fitness, gaming, art, music, studying), structure the business EXACTLY around those real interests. 
      If the bio is empty or generic, infer their vibe from the handle name and standard Gen Z archetypes.
      
      Based on this REAL extracted data, create a highly specific, low-overhead digital business they could launch today. 
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
