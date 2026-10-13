# Premium Developer Portfolio — Vineetkush Pali

A world-class, premium, and futuristic developer portfolio website built using React, Vite, TypeScript, Tailwind CSS v4, Framer Motion, and GSAP. 

The application is completely responsive across mobile, tablet, and desktop viewports and integrates dynamic information directly from the GitHub API.

## 🚀 Key Features

- **Futuristic Dark Theme**: Sleek dark slate backdrop, glassmorphic layout elements (`backdrop-filter`), glowing neon borders, and gradient highlights.
- **Dynamic Project Fetching**: Integrates with the GitHub API to dynamically retrieve and sort public repositories for the user `vineetkush57-debug`.
- **Interactive Terminal Console**: An in-browser CLI terminal mockup that lets users interact with the site using commands (`help`, `about`, `skills`, `projects`, `education`, `resume`, `contact`, `github`, `linkedin`, `clear`).
- **AI Chatbot Assistant**: A local text-matching NLP chatbot widget answering queries about Vineet's background, college, and skills.
- **Command Palette (`Ctrl + K`)**: A keyboard-accessible command-palette for ultra-fast navigation, action triggers, and style toggles.
- **Micro-Animations & Physics**:
  - Custom pointer cursor trailing glow rings that dynamically scale on hover.
  - HTML5 Canvas particle animation background that responds to mouse pushes and movements.
  - Scroll-triggered reveal and fade-in animations via Framer Motion.
  - Interactive Project detail overlays.
  - Scroll Progress visualizer and quick back-to-top button.
- **High-Tech Boot Loading Screen**: High-fidelity logs printouts simulating system booting sequence on entrance.

---

## 📁 Folder Structure

```text
vineetkush-portfolio/
├── index.html                  # SEO & Google Fonts setup
├── package.json                # Project scripts & npm dependencies
├── tsconfig.json               # TypeScript Compiler setups
├── vite.config.ts              # Vite bundle configurations (with Tailwind v4 plugin)
├── src/
│   ├── main.tsx                # React DOM render entry
│   ├── App.tsx                 # Core App layout assembler
│   ├── index.css               # Tailwind directives & global styled utilities
│   ├── context/
│   │   └── ThemeContext.tsx    # Persistent Dark/Light theme state context
│   ├── data/
│   │   └── profileData.ts      # Profile factual bio databases & AI responses
│   ├── hooks/
│   │   └── useGithubData.ts    # Custom fetch hooks for GitHub profile & repositories
│   └── components/
│       ├── LoadingScreen.tsx   # Simulated system booting preloader
│       ├── AnimatedCursor.tsx  # Glowing spring-lag pointer cursor
│       ├── CommandPalette.tsx  # Quick navigation palette (Ctrl + K)
│       ├── Header.tsx          # Sticky glassmorphic header navigation
│       ├── Hero.tsx            # Spotlight section with canvas particle & typing animations
│       ├── About.tsx           # Quick summary and floating interest clouds
│       ├── Skills.tsx          # Interactive dashboard visual tools meters
│       ├── Projects.tsx        # Grid display for fetched git repos with filter modals
│       ├── GithubStats.tsx     # Followers display and contribution charts mockup
│       ├── Education.tsx       # B.Tech timeline track card
│       ├── Achievements.tsx    # growth points card grids
│       ├── TerminalSection.tsx # Fully interactive command terminal
│       ├── AiAssistant.tsx     # Expandable chatbot assistant
│       ├── Contact.tsx         # Connection points and validated form
│       └── Footer.tsx          # Copyright & Scroll back to top buttons
```




   ```
4. Execute deploy to push your static assets directly to your GitHub page:
   ```bash
   npm run deploy
   ```
