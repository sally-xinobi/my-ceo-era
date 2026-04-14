import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import { type Blueprint, buildFamPrompt } from "@/features/chat";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, blueprint } = (await req.json()) as {
      messages: { role: string; content: string }[];
      blueprint?: Blueprint | null;
    };

    const result = await generateText({
      model: google("gemini-2.5-flash"),
      system: buildFamPrompt(blueprint),
      messages: messages.map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    return NextResponse.json({ reply: result.text });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Chat failed" }, { status: 500 });
  }
}
