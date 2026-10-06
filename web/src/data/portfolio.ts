// Content mirrors backend/portfolio_data.py — element ids here MUST match
// the `target_element` ids the LangGraph agent sends over the WebSocket.

// Icon keys resolve in ProjectTechStack.tsx — either a real brand icon URL
// or a generic concept glyph for things that aren't a single branded tool.
export const projects = [
  {
    id: "project-resume-analyzer",
    number: "01",
    title: "Resume-to-JD Gap Analyzer",
    github: "https://github.com/Prekshabarjatya/resume-intelligence-ai",
    liveUrl: "https://resume-intelligence-platform-pmdw.onrender.com/",
    tags: ["LangGraph", "Tool Calling", "Pydantic", "Gap Analysis"],
    description:
      "A multi-agent pipeline that extracts structured profiles from resumes and job descriptions, matches skills and experience, and generates explainable gap analysis with actionable recommendations. Validates both documents, performs semantic matching, identifies missing qualifications. Instrumented to track: analysis runtime, token usage, skill matches, gaps found. Deploy live to gather metrics on real resumes.",
    image:
      "/projects/resume-optimizer.jpg",
    techStack: {
      Languages: ["Python"],
      "AI/ML": ["LangGraph", "Tool Calling", "Semantic Matching"],
      Backend: ["Pydantic", "FastAPI"],
    },
  },
  {
    id: "project-research-paper-agents",
    number: "02",
    title: "Research & Document Intelligence Platform",
    tags: ["LangGraph", "Multi-Agent", "RAG", "FastAPI", "PostgreSQL"],
    description:
      "A unified platform with two capabilities: a seven-agent LangGraph workflow that turns an assignment brief into a cited research paper (every citation verified against Crossref in code, human approves topic and thesis, runs checkpointed in Postgres for crash recovery), and a FastAPI-powered RAG service for document Q&A with pgvector storage and LLM answers grounded in retrieved passages with source citations. Research workflow: [X] min avg runtime, [X] tokens/run, [X] citations verified. Q&A evaluation: ragas score [X] on [X] questions, Dockerized.",
    image: "/projects/document-qa.jpg",
    video: "/projects/research-paper-agents-demo.mp4",
    videoPoster: "/projects/research-paper-agents-demo-poster.jpg",
    github: "https://github.com/Prekshabarjatya/research-paper-agents",
    liveUrl: "https://research-paper-agents.vercel.app/",
    extraLinks: [
      { label: "Q&A Live", href: "https://ai-research-assistant-nidu.onrender.com/#ask", kind: "live" },
      { label: "Q&A GitHub", href: "https://github.com/Prekshabarjatya/ai-research-assistant", kind: "github" },
    ],
    techStack: {
      Languages: ["Python"],
      Backend: ["FastAPI", "PostgreSQL", "Docker"],
      "AI/ML": ["LangGraph", "RAG", "pgvector", "LangChain"],
    },
  },
] as const;

// Hackathon and open-source builds: shipped in public, with a write-up.
export const openSource = [
  {
    id: "oss-dharohar",
    title: "Dharohar",
    titleNative: "धरोहर",
    event: "Hacktoberfest 2026 · DEV Open-Source AI Challenge, Week 1: Touch Grass",
    tagline: "An AI audio guide that tells you the story of the places you walk into, while your phone stays in your pocket.",
    description:
      "Tap “Walk where I am” and it finds the heritage around you, writes a short grounded script for every stop with open-weight Gemma, voices it with ElevenLabs, then turns the screen black. GPS geofences play each story as you arrive, every stop is cached for dead zones, and it speaks English plus nine Indian languages.",
    highlights: [
      "Mastra agent: SerpApi facts → Gemma script → ElevenLabs voice, held to 13 evals",
      "Caught Gemma inventing a balcony that doesn't exist; fixed by grounding every script in search results",
      "Open-weight model swapped in one line when a provider retired the deployed version",
    ],
    tags: ["Gemma", "Mastra", "ElevenLabs", "SerpApi", "Render", "Open source"],
    image: "/projects/dharohar-banner.jpg",
    links: [
      { label: "Live App", href: "https://dharohar-agent.onrender.com", kind: "live" },
      { label: "GitHub", href: "https://github.com/Prekshabarjatya/dharohar-agent", kind: "github" },
      { label: "Write-up on DEV", href: "https://dev.to/preksha_barjatya/dharohar-an-open-source-ai-audio-guide-that-makes-you-put-your-phone-in-your-pocket-1451", kind: "article" },
    ],
  },
] as const;

// Core skills for an AI engineer: programming fundamentals first, then
// AI/ML & Generative AI right after backend (the role-defining category),
// followed by the supporting infra/data categories.
export const skillCategories = [
  {
    id: "skill-programming",
    title: "Programming",
    items: ["Python", "JavaScript", "SQL"],
  },
  {
    id: "skill-python-concepts",
    title: "Python Concepts",
    items: [
      "OOP",
      "Functions",
      "Modules & Packages",
      "File Handling",
      "Exception Handling",
      "Decorators",
      "Generators",
      "Context Managers",
      "Type Hinting",
    ],
  },
  {
    id: "skill-backend",
    title: "Backend Engineering",
    items: ["FastAPI", "REST APIs", "API Design", "Pydantic"],
  },
  {
    id: "skill-ai-ml",
    title: "AI/ML & Generative AI",
    items: [
      "LangChain",
      "LangGraph",
      "RAG",
      "Document Embeddings",
      "Vector Search",
      "Prompt Engineering",
      "Generative AI",
      "Groq API",
    ],
    core: true,
  },
  {
    id: "skill-cloud-devops",
    title: "Cloud & DevOps",
    items: ["Git", "Docker", "Docker Compose", "Kubernetes", "AWS (ECR)", "AWS (ECS)"],
  },
  {
    id: "skill-data-bi",
    title: "Data & BI",
    items: [
      "Pandas",
      "NumPy",
      "Matplotlib",
      "EDA",
      "Feature Engineering",
      "Data Pipelines",
      "Power BI",
      "Tableau",
    ],
  },
] as const;

export const experience = [
  {
    role: "AI Engineer Intern",
    company: "Santerra Hygiene Pvt. Ltd.",
    date: "Jul 2026 - Present",
    bullets: [
      "Build AI-powered automation workflows and practical AI applications using Python, prompt engineering, and model integration to streamline a startup's business operations.",
      "Support business data and finance-related processes, applying automation to improve efficiency and scalability of daily operational workflows.",
    ],
  },
  {
    role: "Data Analyst Intern",
    company: "Think AI Corporation",
    date: "Apr 2026 - Jul 2026",
    bullets: [
      "Migrated legacy reports to Power BI and Tableau, building interactive dashboards to visualize key business metrics and support decision-making.",
      "Performed data analysis/EDA using Python and SQL, and designed data pipelines to clean and transform multi-source data into BI-ready formats while gathering requirements with cross-functional teams.",
    ],
  },
] as const;

export const stats = [
  { label: "Degree", value: "B.Tech CSE", sub: "AI & ML" },
  { label: "CGPA", value: "7.94 / 10", sub: "2023 - 2027" },
  { label: "Internships", value: "2", sub: "AI & Data" },
  { label: "Focus", value: "Agentic AI", sub: "RAG, LLMs" },
] as const;

export const contact = {
  email: "prekshabarjatya2105@gmail.com",
  phone: "(+91) 9993098023",
  address: "New Palasiya, Indore, India, 452001",
  github: "https://github.com/Prekshabarjatya",
  linkedin: "https://www.linkedin.com/in/preksha-barjatya-pb2024/",
  // Canonical address of this site; the vercel.app URL is only an alias.
  website: "https://www.prekshaa.tech",
};

export const certifications = [
  {
    title: "Agentic AI Certified Foundations Associate",
    org: "Oracle",
    status: "Certified",
    issued: "Sep 2026",
    expires: "Sep 2028",
    credentialId: "103539377AAI26OFA",
  },
  {
    title: "Generative AI, RAG, Multimodal & Agentic AI",
    org: "CSE (AI & ML) Dept., Acropolis Institute of Technology and Research, with Navigate Labs",
    status: "Certified",
  },
  {
    title: "Programming with Python Professional Certificate",
    org: "OpenEDG Python Institute",
    status: "Certified",
  },
] as const;
