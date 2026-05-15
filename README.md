# AIID Hackathon 2025 - Team Documentation Website
_A comprehensive documentation website for AIID Hackathon 2025 (team collaboration, dev process, outcomes)._

---

## 🚀 Project Overview
Sovereign School OS is a revolutionary, AI-native operating system designed to solve the crisis of time in education. By rebuilding the classroom around AI, we've created a privacy-first, hyper-efficient, and deeply engaging ecosystem that gives time back to teachers and a universe of personalized learning to students. It is a serverless, client-side-only single-page application (SPA) where all data is stored exclusively in the browser's `localStorage`, ensuring absolute privacy and FERPA compliance.

The stack is centered around **React 19, TypeScript, and Vite**, with all AI capabilities powered by the **Google Gemini API family** (`gemini-2.5-pro`, `imagen-4.0-generate-001`, `veo-3.1-fast-generate-preview`, etc.).

### Key Features
- **🛡️ Privacy-First Design** — A serverless model where all sensitive data is stored and processed exclusively in the browser's `localStorage`. No cloud databases, no servers, no compromises.
- **🗺️ Multi-Portal Ecosystem** — Dedicated, feature-rich portals for Students, Teachers, and Administrators, each with a bespoke AI co-pilot.
- **🤖 Adaptive AI Mentors** — Students choose a historical or cultural "Hero" as their AI companion, which teaches and adapts its narrative based on real-time performance.
- **⚡ One-Click Content Factory** — Teachers can generate entire lesson plans, slide decks, worksheets, videos, and interactive adventures from a simple prompt or document upload.
- **🧠 Advanced Prompt Engineering** — Utilizes Gemini's `responseSchema` for reliable JSON output and `thinkingConfig` for deeper pedagogical reasoning, making the AI as dependable as a traditional API.
- **🎨 Dynamic Component Architecture** — A unique pipeline that parses AI text responses to render interactive React components (quizzes, fill-in-the-blanks) directly within a chat stream.

---

## 🏗️ Website Structure

### Main Sections
- 🏠 **Home** — Introduction to the Sovereign School OS vision and core principles.
- 👥 **Team** — Profiles of the hackathon team members and their roles.
- 🚀 **Project 1: The Student Universe**
  - **The Challenge**: Passive, one-size-fits-all learning disengages students and stifles curiosity.
  - **Solution Idea**: A gamified, personalized universe where every student is the hero, guided by an adaptive AI mentor.
  - **Implementation**: Real-time narrative adaptation, multi-modal content generation (images and video), and a suite of powerful, subject-specific AI learning tools.
  - **Results & Impact**: A dramatic increase in student engagement, personalized learning paths that target areas of weakness, and a learning experience that feels like a heroic adventure.
- 👩‍🏫 **Project 2: The Teacher Command Center**
  - **The Challenge**: Teachers are drowning in administrative tasks, curriculum design, and content creation, leaving little time to teach.
  - **Solution Idea**: An AI co-pilot that automates the mundane and amplifies creativity, acting as a tireless teaching assistant.
  - **Implementation**: The "5-Minute Lesson Plan" generator, a one-click "Lesson Kit" factory (slides, worksheets, rubric), the "Adventure Architect" for creating interactive stories, and an AI Coach for professional development.
  - **Results & Impact**: A significant reduction in teacher workload, higher-quality and more engaging lesson materials, and more time for direct student interaction and inspiration.
- 🏛️ **Project 3: The Admin Holodeck**
  - **The Challenge**: School administrators lack the tools to get a clear, real-time, data-driven view of school health and equity.
  - **Solution Idea**: A high-level dashboard with a conversational AI Copilot for transforming raw data into actionable insights.
  - **Implementation**: An AI Copilot for complex queries ("Generate a fairness report"), an Equity Dashboard for proactively identifying bias, and a Support Hub that flags at-risk students.
  - **Results & Impact**: Proactive, data-informed leadership, improved school-wide equity, and early intervention for students who need it most.
- 📡 **Communication** — Details on our agile workflow, tools (GitHub, Discord), and team rituals (daily stand-ups, pair programming sessions).
- 📚 **Tutorial: "Building an AI-Native OS"** — A deep dive into the technical methodologies used to build Sovereign School OS.



### Technical Tutorial Highlight — “Building an AI-Native OS”
This section details the methodologies and patterns used to build Sovereign School OS.
- **AI-Powered Workflows & Prompt Engineering**: Advanced strategies for persona, adaptive teaching, and structured JSON generation.
- **System Architecture & Data Flow**: A breakdown of our serverless architecture, `localStorage` database, and hybrid state model.
- **Component Deep Dive**: A look at the asynchronous, prefetching game loop in `AdventureGame.tsx`.
- **Iterative Refinement & Resilience**: Patterns for error handling, security, and performance in an AI-native application.
- **Deployment & Testing**: Strategies for deploying a static PWA and testing non-deterministic AI features reliably.

---

## 🛠️ Technology Stack

### Frontend
- React **19.1.1**
- TypeScript **~5.9.3**
- Vite **7.1.7**
- Tailwind CSS
- `@google/genai` (Gemini API)
- `jspdf`, `jszip`, `pdf.js` for in-browser document generation.

### AI Engine
- **Reasoning & Text**: `gemini-2.5-pro`, `gemini-2.5-flash`
- **Image Generation**: `imagen-4.0-generate-001`
- **Image Editing**: `gemini-2.5-flash-image`
- **Video Generation**: `veo-3.1-fast-generate-preview`
- **Audio & Speech**: `gemini-2.5-flash` (Transcription) & `gemini-2.5-flash-preview-tts` (Text-to-Speech)

### Development Tools
- ESLint, TypeScript Compiler
- Vite Hot Module Replacement (HMR)

---

## 📂 Codebase Structure

The project is organized with a clear separation of concerns, dividing the application into distinct layers for UI, business logic, and reusable utilities. This structure enhances maintainability and scalability.

-   `/` (Root)
    -   Contains the main entry points for the application (`index.html`, `index.tsx`), the root `App.tsx` component, and top-level configuration files like `metadata.json` and `types.ts`.

-   `/components/` — **The UI Layer**
    -   This is the heart of the user interface. It's further divided by portal to keep concerns separate.
    -   `/common/`: Contains highly reusable, presentation-focused components used across all portals (e.g., `Button.tsx`, `Input.tsx`, `Chatbot.tsx`).
    -   `/student/`, `/teacher/`, `/administration/`: Each directory holds all components specific to its respective user portal. This modular approach keeps portal-specific logic and UI encapsulated.
    -   `/icons/`: A library of self-contained SVG icon components for consistent visual language.

-   `/services/` — **The Business Logic & Data Layer**
    -   This directory acts as a "client-side backend" or ORM, abstracting all interactions with `localStorage` and external APIs. Components should never access `localStorage` directly; they should always go through a service.
    -   `geminiService.ts`: The sole interface for all Google Gemini API calls. It handles prompt construction, API requests, and response parsing.
    -   `studentDataService.ts`, `communicationService.ts`, etc.: These services manage the CRUD operations for specific data models (e.g., students, conversations), acting as the single source of truth for the application's state.

-   `/hooks/` — **Reusable React Logic**
    -   Contains custom React hooks that encapsulate complex stateful logic, making it reusable across different components (e.g., `useRecorder.ts` for microphone access).

-   `/utils/` — **Utility Functions**
    -   Houses pure, helper functions that are not tied to React state or specific business logic (e.g., `pdfParser.ts` for client-side document processing, `interactiveParser.ts` for parsing AI widget syntax).

 ### code structure and directories ( please go to readme5.md file to find detailed info)
[npm-pkg]  (12 files)
├── components  (14 files)
│   ├── administration  (13 files)
│   ├── common  (6 files)
│   ├── icons  (2 files)
│   ├── student  (31 files)
│   │   └── interactive  (1 files)
│   └── teacher  (23 files)
├── hooks  (2 files)
├── services  (15 files)
└── utils  (4 files)

---

## 📚 Tutorial: "Building an AI-Native OS" (Deep Dive)

### 1. AI-Powered Workflows & Prompt Engineering

The power of Sovereign School OS comes from sophisticated prompt engineering. We treat the LLM not just as a text generator, but as a structured data and logic engine.

#### **Professor Astra**: Persona & Interactive Widgets
This is the most complex prompt, combining persona, adaptive teaching, and function-calling-like behavior through text parsing.
- **Persona Definition**: The system prompt defines the AI's character based on the student's chosen "Hero" (`Character: ${hero.name}, Description: ${hero.description}`). It forces the AI to stay in character.
- **Interactive Widget Formatting**: We define a simple, parsable markup language (e.g., `[MULTIPLE_CHOICE:Question|Correct|Wrong]`, `[FILL_IN_BLANK:Sentence with {answer}]`) and instruct the AI to embed these "widgets" directly into its response to check for understanding.
- **Adaptive Difficulty**: Before sending a prompt, we calculate the student's performance level (`Struggling`, `Average`, `Advanced`). This injects a sub-prompt that guides the AI on the complexity and tone of its explanation.

#### **Lesson Planner**: Structured JSON Generation
This feature demonstrates how to reliably get complex, nested JSON objects from the API.
- **Explicit JSON Requirement**: The prompt instructs the AI that `The output must be a valid JSON object.`
- **`responseSchema`**: We enforce this rule by providing a detailed `responseSchema` in the API call's `config` object. This schema mirrors our `LessonPlan` TypeScript interface, forcing the Gemini API to return perfectly structured data and making the response as reliable as a traditional REST API.

#### **Adventure Architect**: Adaptive Narrative Generation
This is a multi-step, stateful prompting process that creates a dynamic learning experience.
1.  **Initial Node**: A prompt generates only the first stage of the adventure.
2.  **Adaptive Next Node**: After a student answers, the `generateAdventureNextNode` prompt includes `Student Performance Notes` ("The student previously answered stage 2 incorrectly... your new interaction should gently reteach that concept.") and `Story So Far` (a JSON string of previous stages). This turns the LLM into a real-time, adaptive game master.

#### **AI Coach**: Enabling Deeper Reasoning with `thinkingConfig`
For features that require more complex pedagogical reasoning, we use `gemini-2.5-pro` and enable `thinkingConfig`.
```typescript
config: {
    systemInstruction,
    thinkingConfig: { thinkingBudget: 32768 } // Max budget for 2.5 Pro
}
```
This allows the model to use more internal tokens for reasoning before generating a response, resulting in more thoughtful and in-depth answers suitable for professional development.

### 2. System Architecture & Data Flow

#### Core Architectural Principles
1.  **Zero Server-Side Logic**: The entire application runs in the user's browser.
2.  **`localStorage` as Database**: All application state is persisted directly in the browser's `localStorage`. The `/services` files act as an ORM-like layer.
3.  **Separation of Concerns**: `components` for rendering, `services` for business logic/data, and `geminiService.ts` as the single point of contact for the AI.

#### Data Flow Diagram
- **Local Data Flow**: `React UI` -> `studentDataService.ts` -> `localStorage`
- **AI Request Flow**: `React UI` -> `geminiService.ts` -> `Google Gemini API` -> `React UI` (Streamed Response)

#### State Management & Data Consistency
- **Hybrid State Model**: `React useState` is used for all ephemeral UI state (loading, modals, inputs). `localStorage` (via services) is the single source of truth for all persistent data.
- **Data Mutation Pattern**: To ensure consistency, components follow a strict pattern:
    1.  **Fetch**: Get data from a service in `useEffect`.
    2.  **Mutate**: Call a service function to update data in `localStorage`.
    3.  **Re-fetch/Signal**: The component either re-fetches its own data or calls an `onUpdate()` prop to signal to its parent that global state has changed, triggering a re-render with fresh data.

### 3. Component Deep Dive: An Iterative Refinement (`AdventureGame.tsx`)

The `AdventureGame.tsx` component orchestrates multiple asynchronous AI calls to create a stateful game loop.

- **State Management**: Uses `useState` to manage the game's lifecycle: `nodes` (story history), `nextNode` (prefetched stage), `sceneVisuals` (generated media URLs), `answers` (performance log), and various loading states.
- **Asynchronous Game Loop & Prefetching**: The component uses a "fetch-ahead" strategy to minimize latency:
    1.  **Initialization**: Fetches the first adventure node.
    2.  **Trigger Prefetch**: A `useEffect` hook, triggered by a change in the `nodes` array, immediately calls `generateAdventureNextNode` in the background.
    3.  **Store Prefetched Node**: The result is stored in the `nextNode` state but not yet displayed. Its visual is also fetched.
    4.  **User Progression**: When the user clicks "Next Stage," the component simply moves the already-fetched node from `nextNode` into the `nodes` array.
    5.  **Loop**: This change to `nodes` re-triggers the prefetch `useEffect`, and the cycle continues, always staying one step ahead.

### 4. Resilience, Privacy & Deployment

#### Privacy Model In-Depth
- **Data Boundary**: Student data (profiles, incidents, performance) **never leaves the browser**. This data is only used client-side to construct prompts.
- **Implications**: Data is tied to a specific device/browser. Clearing the cache will delete all data. No cross-device sync is possible in this architecture.

#### API Key Management
- **Standard Flow**: The `GoogleGenAI` instance is initialized with `process.env.API_KEY`, which is assumed to be configured in the execution environment.
- **Special Case for Veo**: The `geminiService` includes a `handleVeoApiKey` helper that uses the `window.aistudio` object to prompt the user to select a key if needed, as required by the Veo model.

#### Error Handling & Resilience
- **API and Network Errors**: All calls in `geminiService.ts` are wrapped in `try...catch` blocks. Failures throw errors that are caught by UI components, which then display user-friendly error messages instead of crashing.
- **Media Generation Failures**: The `AdventureGame` manages this with a `visualErrors` state. If an image or video fails to generate, an error message is rendered in its place, allowing the adventure to continue.
- **AI Response Parsing Errors**: `JSON.parse()` calls are within `try...catch` blocks. The `interactiveParser.ts` is designed to be resilient; if it fails to parse a widget, it gracefully degrades and treats the content as plain text.

#### Deployment
- As a fully client-side application, deployment is straightforward. The entire project consists of static files (`index.html`, transpiled JS, CSS) that can be hosted on any static hosting provider (e.g., Firebase Hosting, Netlify, Vercel).

### 5. Testing Strategy

- **Unit & Service Tests (`vitest`/`jest`)**:
    -   Target utility functions like `interactiveParser.ts` and data services like `studentDataService.ts`.
    -   `localStorage` should be mocked to test the service layer's data manipulation logic.
- **Component Tests (`React Testing Library`)**:
    -   **Crucially, mock the `geminiService` module** to prevent real API calls.
    -   Tests should simulate user actions (e.g., form submission), assert that the correct service function is called, and verify that the component's state and rendered output update correctly based on the mocked service response.
- **End-to-End Tests (`Cypress`/`Playwright`)**:
    -   Use network interception features to stub the Gemini API endpoint. When the application makes a `fetch` request to the AI, the E2E test intercepts it and returns a predefined, reliable response. This allows for testing complex, multi-step flows in a fast and repeatable manner.

---

## 🚦 Getting Started (with the App)

### Prerequisites
- Node.js **18+**
- npm or yarn
- A configured Google Gemini API key in your execution environment.

### Installation
```bash
git clone <repository-url>
cd <repo-name>
npm install
npm run dev
# open http://localhost:5173


#### 📄 License
this app is made independently from scratch by EL AKKAD SAMI currently studying AIID from TSINGHUA UNIVERISTY and took a lot of work to get finished (please do not steal all of it)

#### 🙏 Acknowledgments
TSINGHUA UNIVERISTY especially AI department  
Professor FANGKE and SANBU
NetDragon Company wich collaborated with me to make this project a reality 
AIID Hackathon 2025: Organizers and participants

