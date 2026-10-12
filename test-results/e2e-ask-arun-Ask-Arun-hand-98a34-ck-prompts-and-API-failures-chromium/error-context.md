# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e/ask-arun.spec.ts >> Ask Arun handles Enter, quick prompts, and API failures
- Location: tests/e2e/ask-arun.spec.ts:53:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('.ask-arun-msg-row--assistant').last()
Expected pattern: /Linux Access Control Simulation/i
Received string:  ""

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - link "Skip to main content" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - navigation "Main navigation" [ref=e4]:
      - link "Go to top" [ref=e5] [cursor=pointer]:
        - /url: "#home"
        - text: arun@portfolio
        - generic [ref=e6]: "|"
      - generic [ref=e7]:
        - link "Home" [ref=e8] [cursor=pointer]:
          - /url: "#home"
        - link "About" [ref=e9] [cursor=pointer]:
          - /url: "#about"
        - link "Skills" [ref=e10] [cursor=pointer]:
          - /url: "#skills"
        - link "Projects" [ref=e11] [cursor=pointer]:
          - /url: "#projects"
        - link "Certifications" [ref=e12] [cursor=pointer]:
          - /url: "#certifications"
        - link "Resume" [ref=e13] [cursor=pointer]:
          - /url: "#resume"
        - link "Contact" [ref=e14] [cursor=pointer]:
          - /url: "#contact"
        - button "Theme" [ref=e16]
  - main [ref=e20]:
    - generic [ref=e22]:
      - generic [ref=e23]:
        - generic [ref=e24]:
          - paragraph [ref=e25]: Hello, I'm
          - heading "Arun Kumar" [level=1] [ref=e26]
          - heading "Cybersecurity Enthusiast & Developer" [level=2] [ref=e27]
          - generic [ref=e28]: Cybersec|
          - paragraph [ref=e29]: BCA student building practical cybersecurity skills through Linux labs, networking experiments, secure development, and hands-on technical projects. Focused on becoming internship-ready through execution rather than theory alone.
          - generic [ref=e30]:
            - link "Download Resume" [ref=e31] [cursor=pointer]:
              - /url: /resume.pdf
            - link "View Projects" [ref=e35] [cursor=pointer]:
              - /url: "#projects"
            - link "Contact Me" [ref=e36] [cursor=pointer]:
              - /url: "#contact"
          - generic [ref=e40]:
            - link "GitHub" [ref=e41] [cursor=pointer]:
              - /url: https://github.com/arun-codex
            - link "LinkedIn" [ref=e45] [cursor=pointer]:
              - /url: https://www.linkedin.com/in/arun-codex/
            - link "Email" [ref=e50] [cursor=pointer]:
              - /url: mailto:arun.cyberx@gmail.com
        - img "Profile photo of Arun Kumar" [ref=e57]
      - generic [ref=e59]: scroll
    - generic [ref=e65]:
      - generic [ref=e66]:
        - generic [ref=e67]: // About
        - heading "About Arun Kumar" [level=2] [ref=e68]
      - generic [ref=e70]:
        - generic [ref=e71]:
          - paragraph [ref=e72]: BCA student building practical cybersecurity skills through Linux labs, networking experiments, secure development, and hands-on technical projects. Focused on becoming internship-ready through execution rather than theory alone.
          - generic [ref=e73]:
            - generic [ref=e80]:
              - heading "Career Goal" [level=3] [ref=e81]
              - paragraph [ref=e82]: Become a skilled Cybersecurity Specialist capable of mitigating modern digital threats through hands-on technical execution.
            - generic [ref=e87]:
              - heading "Education" [level=3] [ref=e88]
              - paragraph [ref=e89]: Bachelor of Computer Applications (BCA) — currently building a strong foundation in programming, networking, and security fundamentals.
            - generic [ref=e94]:
              - heading "Focus Areas" [level=3] [ref=e95]
              - paragraph [ref=e96]: Linux system administration, network security, Python for security automation, vulnerability assessment, and secure web development.
        - generic [ref=e97]:
          - generic [ref=e99]:
            - generic [ref=e100]:
              - generic [ref=e101]: 0+
              - generic [ref=e102]: Projects Completed
            - generic [ref=e103]:
              - generic [ref=e104]: 0+
              - generic [ref=e105]: Certifications
            - generic [ref=e106]:
              - generic [ref=e107]: 0+
              - generic [ref=e108]: GitHub Repositories
          - paragraph [ref=e110]: "const mission = { approach: \"execution over theory\", status: \"actively learning\", seeking: \"internship opportunities\"};"
    - generic [ref=e112]:
      - generic [ref=e113]:
        - generic [ref=e114]: // Skills
        - heading "Technical Skills & Toolkit" [level=2] [ref=e115]
      - generic [ref=e117]:
        - button "Programming" [pressed] [ref=e118]
        - button "Web Development" [ref=e119]
        - button "Cybersecurity" [ref=e120]
        - button "Tools" [ref=e121]
      - generic [ref=e122]:
        - link "C" [ref=e123] [cursor=pointer]:
          - /url: https://github.com/arun-codex/c-learning-project
        - link "JavaScript" [ref=e131] [cursor=pointer]:
          - /url: https://developer.mozilla.org/en-US/docs/Web/JavaScript
        - link "Python" [ref=e137] [cursor=pointer]:
          - /url: https://github.com/arun-codex/Complate-Python-beginner-to-intermediate-
    - generic [ref=e146]:
      - generic [ref=e147]:
        - generic [ref=e148]: // Projects
        - heading "Featured Projects" [level=2] [ref=e149]
      - generic [ref=e152]:
        - button "All" [pressed] [ref=e153]
        - button "Security" [ref=e154]
        - button "Web" [ref=e155]
        - button "Programming" [ref=e156]
        - button "AI" [ref=e157]
      - generic [ref=e158]:
        - article [ref=e159]:
          - generic [ref=e160]:
            - img "Screenshot of Linux Access Control Simulation" [ref=e161]
            - link "View Linux Access Control Simulation on GitHub" [ref=e163] [cursor=pointer]:
              - /url: https://github.com/mrarunkumar18
          - generic [ref=e167]:
            - heading "Linux Access Control Simulation" [level=3] [ref=e168]
            - paragraph [ref=e169]: Simulated Linux permission systems using chmod, user roles, and file access management. Explored real-world access control scenarios in a controlled lab environment.
            - generic [ref=e170]:
              - generic [ref=e171]: Linux
              - generic [ref=e172]: Bash
              - generic [ref=e173]: Security
        - article [ref=e174]:
          - generic [ref=e175]:
            - img "Screenshot of Personal Portfolio Website" [ref=e176]
            - generic [ref=e177]:
              - link "View Personal Portfolio Website on GitHub" [ref=e178] [cursor=pointer]:
                - /url: https://github.com/mrarunkumar18/portfolio
              - link "View live demo of Personal Portfolio Website" [ref=e182] [cursor=pointer]:
                - /url: https://arunx.xyz
          - generic [ref=e187]:
            - heading "Personal Portfolio Website" [level=3] [ref=e188]
            - paragraph [ref=e189]: Built and deployed a responsive portfolio website using HTML, CSS, and JavaScript. Designed for recruiter visibility and professional branding.
            - generic [ref=e190]:
              - generic [ref=e191]: HTML
              - generic [ref=e192]: CSS
              - generic [ref=e193]: JavaScript
        - article [ref=e194]:
          - generic [ref=e195]:
            - img "Screenshot of System Programming Practice Toolkit" [ref=e196]
            - link "View System Programming Practice Toolkit on GitHub" [ref=e198] [cursor=pointer]:
              - /url: https://github.com/mrarunkumar18
          - generic [ref=e202]:
            - heading "System Programming Practice Toolkit" [level=3] [ref=e203]
            - paragraph [ref=e204]: Built multiple C programs covering arrays, loops, calculators, and file handling. Focused on strengthening low-level programming fundamentals.
            - generic [ref=e205]:
              - generic [ref=e206]: C
              - generic [ref=e207]: Data Structures
              - generic [ref=e208]: Algorithms
        - article [ref=e209]:
          - generic [ref=e210]:
            - img "Screenshot of AI Workflow Exploration" [ref=e211]
            - link "View AI Workflow Exploration on GitHub" [ref=e213] [cursor=pointer]:
              - /url: https://github.com/mrarunkumar18
          - generic [ref=e217]:
            - heading "AI Workflow Exploration" [level=3] [ref=e218]
            - paragraph [ref=e219]: Experimented with prompt engineering, productivity systems, and AI-powered workflows. Explored practical applications of AI tools for development acceleration.
            - generic [ref=e220]:
              - generic [ref=e221]: AI
              - generic [ref=e222]: Prompt Engineering
              - generic [ref=e223]: Productivity
        - article [ref=e224]:
          - generic [ref=e225]:
            - img "Screenshot of Weather — UI Dashboard" [ref=e226]
            - generic [ref=e227]:
              - link "View Weather — UI Dashboard on GitHub" [ref=e228] [cursor=pointer]:
                - /url: https://github.com/arun-codex/Weather
              - link "View live demo of Weather — UI Dashboard" [ref=e232] [cursor=pointer]:
                - /url: https://weather-omega-pink.vercel.app/
          - generic [ref=e237]:
            - heading "Weather — UI Dashboard" [level=3] [ref=e238]
            - paragraph [ref=e239]: A modern weather dashboard built with React and deployed on Vercel. Features saved cities, 7-day forecasts, and responsive UI with smooth animations.
            - generic [ref=e240]:
              - generic [ref=e241]: React
              - generic [ref=e242]: Next.js
              - generic [ref=e243]: Tailwind
              - generic [ref=e244]: API
    - generic [ref=e246]:
      - generic [ref=e247]:
        - generic [ref=e248]: // Certifications
        - heading "Credentials & Learning" [level=2] [ref=e249]
      - generic [ref=e258]:
        - heading "Introduction to Generative AI" [level=3] [ref=e259]
        - paragraph [ref=e260]: Google · Feb 2026
        - link "Verify Credential" [ref=e261] [cursor=pointer]:
          - /url: https://www.skills.google/public_profiles/28c98619-745d-4f60-ac6e-900f1f52afff/badges/21915333
    - generic [ref=e267]:
      - generic [ref=e268]:
        - generic [ref=e269]: // Resume
        - heading "Professional Summary" [level=2] [ref=e270]
      - generic [ref=e272]:
        - generic [ref=e280]:
          - heading "Education" [level=3] [ref=e281]
          - paragraph [ref=e282]: Bachelor of Computer Applications (BCA) — Building strong fundamentals in CS, networking, and security.
        - generic [ref=e291]:
          - heading "Technical Focus" [level=3] [ref=e292]
          - paragraph [ref=e293]: C programming, web development (HTML/CSS/JS), Linux administration, and database management.
        - generic [ref=e300]:
          - heading "Security Learning" [level=3] [ref=e301]
          - paragraph [ref=e302]: Networking fundamentals, Linux permissions, system hardening, and vulnerability awareness.
        - generic [ref=e310]:
          - heading "Seeking" [level=3] [ref=e311]
          - paragraph [ref=e312]: Internship opportunities in cybersecurity, IT security, or web development to gain real-world experience.
      - link "Download Full Resume (PDF)" [ref=e314] [cursor=pointer]:
        - /url: /resume.pdf
    - generic [ref=e319]:
      - generic [ref=e320]:
        - generic [ref=e321]: // Contact
        - heading "Get In Touch" [level=2] [ref=e322]
      - generic [ref=e324]:
        - generic [ref=e325]:
          - paragraph [ref=e326]: I'm actively looking for internship opportunities in cybersecurity, IT security, and web development. Let's connect.
          - generic [ref=e327]:
            - link "arun.cyberx@gmail.com" [ref=e333] [cursor=pointer]:
              - /url: mailto:arun.cyberx@gmail.com
            - link "github.com/arun-codex" [ref=e339] [cursor=pointer]:
              - /url: https://github.com/arun-codex
            - link "linkedin.com/in/arun-codex" [ref=e346] [cursor=pointer]:
              - /url: https://www.linkedin.com/in/arun-codex/
            - generic [ref=e347]: India
          - button "More About Me" [ref=e354]
        - generic [ref=e359]:
          - generic [ref=e360]:
            - generic [ref=e361]: Name
            - textbox "Name" [ref=e362]:
              - /placeholder: Your name
          - generic [ref=e363]:
            - generic [ref=e364]: Email
            - textbox "Email" [ref=e365]:
              - /placeholder: you@example.com
          - generic [ref=e366]:
            - generic [ref=e367]: Message
            - textbox "Message" [ref=e368]:
              - /placeholder: Your message...
          - button "Send Message" [ref=e369]
  - contentinfo [ref=e373]:
    - generic [ref=e375]:
      - generic [ref=e376]:
        - generic [ref=e377]: arun@portfolio
        - paragraph [ref=e378]: Built with Next.js + TypeScript
      - generic [ref=e379]:
        - link "GitHub" [ref=e380] [cursor=pointer]:
          - /url: https://github.com/arun-codex
        - link "LinkedIn" [ref=e384] [cursor=pointer]:
          - /url: https://www.linkedin.com/in/arun-codex/
        - link "Email" [ref=e389] [cursor=pointer]:
          - /url: mailto:arun.cyberx@gmail.com
      - paragraph [ref=e393]: © 2026 Arun Kumar. Made with
  - generic "Ask Arun AI assistant" [ref=e396]:
    - button "Close Ask Arun AI assistant" [expanded] [ref=e397] [cursor=pointer]
  - button "Open Next.js Dev Tools" [ref=e406] [cursor=pointer]
  - alert [ref=e410]
  - dialog [ref=e411]:
    - generic [ref=e412]:
      - generic [ref=e416]:
        - heading "Ask Arun" [level=2] [ref=e417]
        - paragraph [ref=e418]: AI portfolio assistant
      - generic [ref=e419]:
        - button "Start a new chat" [ref=e420] [cursor=pointer]
        - button "Close Ask Arun AI assistant" [ref=e423] [cursor=pointer]
    - log "Conversation" [ref=e426]:
      - generic [ref=e431]:
        - paragraph [ref=e432]: Hi! I'm Arun's portfolio assistant.
        - paragraph [ref=e433]: Ask me about Arun's projects, cybersecurity journey, technical skills, resume, GitHub, or experience.
      - list "Quick question suggestions" [ref=e434]:
        - listitem [ref=e435] [cursor=pointer]: What cybersecurity projects has Arun built?
        - listitem [ref=e436] [cursor=pointer]: What are Arun's strongest technical skills?
        - listitem [ref=e437] [cursor=pointer]: Why would Arun be a good cybersecurity intern?
        - listitem [ref=e438] [cursor=pointer]: Show me Arun's most relevant projects.
    - generic [ref=e440]:
      - textbox "Type your message" [active] [ref=e441]:
        - /placeholder: Ask something about Arun...
      - button "Send message" [disabled] [ref=e442]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | import { openAskArun, trackPageIssues, waitForAppReady } from "../helpers/browser";
  3  | 
  4  | async function mockAskArunApi(page: Parameters<typeof test>[0] extends never ? never : import("@playwright/test").Page) {
  5  |   await page.route("**/api/conversations", async (route) => {
  6  |     await route.fulfill({
  7  |       status: 200,
  8  |       contentType: "application/json",
  9  |       body: JSON.stringify({ messages: [], conversationId: null }),
  10 |     });
  11 |   });
  12 | 
  13 |   await page.route("**/api/chat", async (route) => {
  14 |     const body = route.request().postDataJSON() as { message?: string };
  15 |     const message = String(body.message ?? "").toLowerCase();
  16 |     const answer = message.includes("who is arun")
  17 |       ? "Arun Kumar is a BCA student and Cybersecurity Enthusiast based in India."
  18 |       : message.includes("what cybersecurity projects")
  19 |       ? "Arun has built Linux Access Control Simulation, Personal Portfolio Website, System Programming Practice Toolkit, AI Workflow Exploration, and Weather — UI Dashboard."
  20 |       : "Ask Arun can help with projects, skills, certifications, resume, GitHub, and contact details.";
  21 | 
  22 |     await route.fulfill({
  23 |       status: 200,
  24 |       contentType: "application/json",
  25 |       body: JSON.stringify({ answer, conversationId: null }),
  26 |     });
  27 |   });
  28 | }
  29 | 
  30 | test("Ask Arun sends messages and clears history", async ({ page }) => {
  31 |   const issues = trackPageIssues(page);
  32 | 
  33 |   await mockAskArunApi(page);
  34 |   await page.goto("/");
  35 |   await waitForAppReady(page);
  36 |   await openAskArun(page);
  37 | 
  38 |   const input = page.getByLabel("Type your message");
  39 |   await input.fill("Who is Arun?");
  40 |   await page.locator(".ask-arun-send-btn").click();
  41 | 
  42 |   await expect(page.getByText(/Who is Arun\?/i)).toBeVisible();
  43 |   await expect(page.locator(".ask-arun-msg-row--assistant").last()).toContainText(/Cybersecurity Enthusiast/i, { timeout: 15000 });
  44 |   expect(await page.evaluate(() => sessionStorage.getItem("ask-arun-history"))).toContain("Who is Arun?");
  45 | 
  46 |   await page.getByRole("button", { name: /start a new chat/i }).click();
  47 |   await expect(page.getByText(/Hi! I'm Arun's portfolio assistant/i)).toBeVisible();
  48 |   expect(await page.evaluate(() => sessionStorage.getItem("ask-arun-history"))).toBeNull();
  49 | 
  50 |   await issues.expectClean();
  51 | });
  52 | 
  53 | test("Ask Arun handles Enter, quick prompts, and API failures", async ({ page }) => {
  54 |   const issues = trackPageIssues(page, {
  55 |     ignoreConsoleErrorPatterns: [/Failed to load resource: the server responded with a status of 500/i],
  56 |   });
  57 | 
  58 |   await mockAskArunApi(page);
  59 |   await page.goto("/");
  60 |   await waitForAppReady(page);
  61 |   await openAskArun(page);
  62 | 
  63 |   await page.getByText(/what cybersecurity projects has arun built/i).click();
  64 |   await expect(page.getByText(/What cybersecurity projects has Arun built\?/i)).toBeVisible();
> 65 |   await expect(page.locator(".ask-arun-msg-row--assistant").last()).toContainText(/Linux Access Control Simulation/i, { timeout: 15000 });
     |                                                                     ^ Error: expect(locator).toContainText(expected) failed
  66 | 
  67 |   await page.getByRole("dialog", { name: /ask arun/i }).getByRole("button", { name: /close ask arun ai assistant/i }).click();
  68 |   await openAskArun(page);
  69 | 
  70 |   await page.unroute("**/api/chat");
  71 |   await page.route("**/api/chat", async (route) => {
  72 |     await route.fulfill({
  73 |       status: 500,
  74 |       contentType: "application/json",
  75 |       body: JSON.stringify({ error: "Server failure" }),
  76 |     });
  77 |   });
  78 | 
  79 |   const input = page.getByLabel("Type your message");
  80 |   await input.fill("Who is Arun?");
  81 |   await page.keyboard.press("Enter");
  82 | 
  83 |   await expect(page.getByText(/having trouble right now/i)).toBeVisible({ timeout: 15000 });
  84 |   await expect(page.getByText(/Server failure/i)).toHaveCount(0);
  85 | 
  86 |   await issues.expectClean();
  87 | });
```