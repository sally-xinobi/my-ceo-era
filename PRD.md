# CEO ERA - Product Requirements Document (PRD)

## 1. Product Overview
**Name:** CEO ERA  
**Tagline:** "Stop scrolling. Start earning. Monetize your vibe."  
**Target Audience:** Gen Z (10s-20s) active on social media (TikTok, Instagram, Reddit, GitHub) who want to start a digital side hustle but lack direction.  
**Core Value Proposition:** An AI-powered OSINT (Open-Source Intelligence) tool that scans a user's multi-platform digital footprint, psychoanalyzes their "vibe," and instantly generates a hyper-personalized digital business plan using a billionaire mega-creator's playbook. It then transitions into an iMessage-style chat with an AI co-founder ("Hype Wingman") to execute the plan.

---

## 2. Technical Stack
*   **Framework:** Next.js 16 (App Router)
*   **Language:** TypeScript
*   **UI/Styling:** Tailwind CSS v4, Lucide React (Icons), Custom CSS Animations (Keyframes)
*   **AI SDK:** Vercel AI SDK (`@ai-sdk/google`)
*   **LLM Engine:** Google Gemini (`gemini-2.5-flash`)
*   **Data Extraction (OSINT):** `fetch` (Parallel async requests with timeouts)
*   **Formatting/Linting:** Biome (`npm run lint`, `npm run format`)

---

## 3. Core Features & User Flow

### Step 1: Onboarding (The Hook)
*   **UI:** Dark/Hacker aesthetic with glowing neon blobs (Purple/Blue). Glassmorphism container.
*   **Interaction:** User inputs their TikTok/Instagram handle (`@username`).
*   **Copywriting:** Aggressive, hype-driven Gen Z slang ("Drop your @handle", "Enter my CEO Era").

### Step 2: OSINT Scanning Engine (Analyzing)
*   **Backend Logic (`/api/analyze`):**
    *   Fires parallel `Promise.allSettled` requests to gather real digital footprint data.
    *   **TikTok:** Fetches bio, follower count, and likes via `tokcount.com` API workaround (bypasses standard bot protection).
    *   **Reddit:** Fetches `about.json` to find total karma and public descriptions (extracts raw, uncensored interests).
    *   **Instagram:** Performs a `HEAD` request to check if the username exists (404 vs 200).
    *   **Fallback:** If all data is private, the engine relies heavily on psychoanalyzing the username itself.
*   **UI:** A spinning hacker radar animation. Progress bar increments alongside a sequence of terminal-style logs:
    *   `Initializing OSINT Engine... 👁️`
    *   `Pinging TikTok endpoint... 📱`
    *   `Bypassing Reddit API blocks... 🕵️‍♀️`
    *   `Matching vibe with Billionaire Playbooks... 👑`

### Step 3: The Blueprint Reveal (Result)
*   **AI Processing:** Passes the aggregated JSON footprint to Gemini-2.5-flash with a highly constrained prompt using `zod` schema generation.
*   **Output Structure (JSON):**
    1.  **The Tea (Psychoanalysis):** Brutally honest 1-sentence read of their internet persona (e.g., "You project a pristine aesthetic on Insta, but your Reddit history shows you're a stressed-out overthinker").
    2.  **Epiphany Moment:** The "OMG" realization tailored to their pain point.
    3.  **Business Title & Niche:** Catchy Gen-Z product name (e.g., "Cozy Doomscroller Notion OS").
    4.  **The Billionaire Muse:** Matches the user's niche with a mega-creator (e.g., Kylie Jenner for beauty, MrBeast for viral hooks, Emma Chamberlain for relatable lifestyle, Naval for tech).
    5.  **Muse Strategy (The Secret Sauce):** Explains exactly how to steal that creator's playbook (e.g., "Applying Kylie's manufactured scarcity model...").
    6.  **Step 1 (Product) & Step 2 (Funnel):** Actionable, low-effort execution steps.
*   **UI:** Cards displaying the analysis, with a dedicated highlight box for the "Billionaire Muse."

### Step 4: AI Co-founder Chat (Hype Wingman)
*   **Backend Logic (`/api/chat`):**
    *   Takes the entire generated blueprint as context (`persona` object).
    *   System Prompt instructs the LLM to act as "Hype Wingman" — a chaotic, genius, hyper-supportive digital co-founder who uses slang naturally and pushes for micro-actions.
*   **UI:** Designed identically to iOS iMessage.
    *   Top nav with AI profile, "Online" status indicator.
    *   Blue (user) and Gray (AI) message bubbles with tailored border-radii.
    *   "Read" receipts for user messages.
    *   Animated `●●●` typing indicator.
*   **Initial Interaction:** The AI sends the first message immediately, referencing the Billionaire Muse and challenging the user to take action today.

---

## 4. Prompt Engineering Architecture

### A. The OSINT Extraction Prompt (`/api/analyze`)
*   **Role:** Palantir-level OSINT analyst & World-class Gen Z brand strategist.
*   **Directives:**
    *   "READ THEM TO FILTH": Synthesize multi-platform data to guess the exact internet archetype.
    *   "THE BILLIONAIRE PLAYBOOK": Identify a relevant mega-creator and explicitly state how to inject their specific success secret (scarcity, retention editing, vulnerability) into the user's tiny business.
    *   "TONE": Brutal reality check mixed with hype-man energy. Make them say "OMG this AI knows me better than my therapist."

### B. The Wingman Chat Prompt (`/api/chat`)
*   **Role:** Smart, slightly unhinged, ultra-supportive digital co-founder.
*   **Directives:**
    *   "COMMUNICATION STYLE": Use lowercase for casual thoughts, uppercase for emphasis. Use specific emojis (💅, 💀, 📈, ✨). Use current slang ('no cap', 'gaslight', 'gatekeep').
    *   "FOCUS": Avoid fluffy corporate jargon. Force micro-actions ("literally just make a Carrd link tonight").

---

## 5. Security & Stability Considerations
*   **API Timeouts:** Custom `fetchWithTimeout` wrapper (2.5s) around external OSINT calls prevents the serverless function from hanging if a social media site blocks the request.
*   **Graceful Degradation (Fallbacks):** If social APIs fail or return empty, the LLM prompt is engineered to infer a rich persona solely from the linguistics of the `@username`.
*   **Type Safety:** Strict TypeScript interfaces for all React state hooks and API responses. Removed all `any` types.
*   **Provider Swapped:** Migrated from OpenAI to Google Gemini (`@ai-sdk/google`) to bypass local environment `.env` OpenAI key authorization issues while maintaining high reasoning capabilities.