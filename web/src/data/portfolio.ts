// Content mirrors backend/portfolio_data.py — element ids here MUST match
// the `target_element` ids the LangGraph agent sends over the WebSocket.

// Icon keys resolve in ProjectTechStack.tsx — either a real brand icon URL
// or a generic concept glyph for things that aren't a single branded tool.
export const projects = [
  {
    id: "project-resume-optimizer",
    number: "01",
    title: "Multi-Agent Resume Optimizer",
    github: "https://github.com/Prekshabarjatya/resume-intelligence-ai",
    liveUrl: "https://resume-intelligence-platform-pmdw.onrender.com/",
    tags: ["LangGraph", "Tool Calling", "Pydantic", "Agentic AI"],
    description:
      "A LangGraph-orchestrated multi-agent pipeline that validates, extracts, and scores resumes against job descriptions (PDF/DOCX/text) using specialized agents with tool calling and Pydantic-structured LLM outputs, backed by a hybrid scoring engine combining deterministic ATS checks with grounded LLM judgment.",
    image:
      "/projects/resume-optimizer.jpg",
    techStack: {
      Languages: ["Python"],
      "AI/ML": ["LangGraph", "Agentic AI", "Tool Calling"],
      Backend: ["Pydantic"],
    },
  },
  {
    id: "project-research-paper-agents",
    number: "02",
    title: "Multi-Agent Research Paper Writer",
    tags: ["LangGraph", "Multi-Agent", "Citation Verification", "Human-in-the-loop"],
    description:
      "Built a LangGraph workflow of seven specialist agents (brief analyst, topic strategist, source scout, thesis writer, outliner, drafter, critic) that turns an assignment brief into a cited, literature-based research paper. Every citation is verified against Crossref in code, a human approves the topic and thesis before drafting, and runs are checkpointed in Postgres so they survive crashes and deploys. Its write-up examines how the \"lost in the middle\" long-context problem relates to its context decisions, such as ranking sources and trimming abstracts before prompting.",
    image: "/projects/research-paper-agents-progress.jpg",
    image2: "/projects/research-paper-agents-paper.jpg",
    github: "https://github.com/Prekshabarjatya/research-paper-agents",
    liveUrl: "https://research-paper-agents.vercel.app/",
    techStack: {
      Languages: ["Python"],
      Backend: ["FastAPI", "Docker"],
      "AI/ML": ["LangGraph", "Agentic AI", "Groq API"],
    },
  },
  {
    id: "project-document-qa",
    number: "03",
    title: "Document Q&A",
    github: "https://github.com/Prekshabarjatya/ai-research-assistant",
    liveUrl: "https://ai-research-assistant-nidu.onrender.com/#ask",
    tags: ["FastAPI", "LangChain", "RAG", "Vector Search"],
    description:
      "Engineered a Retrieval-Augmented Generation (RAG) document Q&A service using FastAPI and LangChain: upload or paste documents, chunk and vectorize them, retrieve the most relevant passages by cosine similarity, and answer with a Groq-hosted model that cites the passage it used.",
    image:
      "/projects/document-qa.jpg",
    techStack: {
      Languages: ["Python"],
      Backend: ["FastAPI"],
      "AI/ML": ["LangChain", "RAG", "Vector Search"],
    },
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
    items: ["Pandas", "NumPy", "Matplotlib", "Power BI", "Tableau"],
  },
] as const;

export const experience = [
  {
    role: "AI Engineer Intern",
    company: "Santerra Hygiene Pvt. Ltd.",
    date: "Jul 2026 - Sep 2026",
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
  { label: "CGPA", value: "8.0 / 10", sub: "2023 - 2027" },
  { label: "Internships", value: "2", sub: "AI & Data" },
  { label: "Focus", value: "Agentic AI", sub: "RAG, LLMs" },
] as const;

export const contact = {
  email: "prekshabarjatya2105@gmail.com",
  phone: "(+91) 9993098023",
  address: "New Palasiya, Indore, India, 452001",
  github: "https://github.com/Prekshabarjatya",
  linkedin: "https://www.linkedin.com/in/preksha-barjatya-pb2024/",
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
] as const;
