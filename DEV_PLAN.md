# CEO ERA - Autonomous Development Plan (Multi-Agent Subagent Driven Development)

## 1. Goal
Achieve production-level completion of the "CEO ERA" app. When a Gen Z user enters their TikTok/Instagram handle, the app must scan their multi-platform digital footprint (OSINT) and generate a highly empathetic, actionable, and hype-driven digital business plan ("OMG, this is exactly what I've always wanted to build! 💅"). The UI/UX should feel like a polished, viral Gen Z product.

## 2. Multi-Agent Architecture
We will use the `delegate_task` tool to spawn isolated, parallel subagents. Each subagent assumes a specific role, executes its task autonomously, commits its work, and returns a summary. 

**Roles:**
*   **Agent 1: UX/UI Designer & Client Developer (Front-end)**
    *   Goal: Enhance the `src/app/[locale]/page.tsx` UI to feel like a premium, viral Gen Z app. Add micro-interactions, better typography, and "omg this is so me" empathetic copywriting. Ensure the chat interface feels like a real texting app.
*   **Agent 2: OSINT Researcher & Back-end Developer (Back-end/AI)**
    *   Goal: Upgrade the `src/app/api/analyze/route.ts` and `src/app/api/chat/route.ts`. Improve the OSINT extraction logic (fallback robustness) and drastically improve the OpenAI prompt so the generated business plan hits the user right in the feels (extreme empathy, citing specific internet subcultures).
*   **Agent 3: QA Tester & CEO (Verification & Polish)**
    *   Goal: Run the dev server, simulate a user journey, test edge cases (empty handles, weird bios), and ensure the overall flow is seamless and bug-free.

## 3. Workflow
1.  **Phase 1 (Parallel Execution):** Launch Agent 1 (Front-end) and Agent 2 (Back-end) simultaneously. They will work in their isolated contexts, modify their respective files, and run standard validation (`npm run format`, `npm run lint`).
2.  **Context Clear:** Once Phase 1 completes, the main agent clears the mental state and absorbs only the final results from the subagents.
3.  **Phase 2 (QA & Polish):** Launch Agent 3 (QA/CEO) to test the integrated app, fix any integration bugs, and make the final git commit.