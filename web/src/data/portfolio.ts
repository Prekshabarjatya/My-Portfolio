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
      "A LangGraph-orchestrated multi-agent pipeline that validates, extracts, and scores resumes against job descriptions (PDF/DOCX/text) using specialized agents with tool calling and Pydantic-structured LLM outputs — backed by a hybrid scoring engine combining deterministic ATS checks with grounded LLM judgment.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    techStack: {
      Languages: ["Python"],
      "AI/ML": ["LangGraph", "Agentic AI", "Tool Calling"],
      Backend: ["Pydantic"],
    },
  },
  {
    id: "project-ecommerce-optimizer",
    number: "02",
    title: "AI E-Commerce Listing Optimizer",
    tags: ["Agentic AI", "RAG", "LLM", "Automation"],
    description:
      "Built a knowledge-base-grounded AI listing optimizer for e-commerce using RAG and multi-agent workflows — combining knowledge retrieval, attribute-aware content generation, keyword optimization, and critic-based quality scoring with deterministic fact-validation and a human review workflow.",
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    github: "https://github.com/Prekshabarjatya",
    liveUrl: "",
    techStack: {
      Languages: ["Python"],
      "AI/ML": ["Agentic AI", "RAG", "LLM", "Automation"],
    },
  },
  {
    id: "project-research-assistant",
    number: "03",
    title: "AI Research Assistant",
    tags: ["FastAPI", "LangChain", "RAG", "Vector Search"],
    description:
      "Engineered a Retrieval-Augmented Generation (RAG) application using FastAPI and LangChain for intelligent document querying — implementing ingestion, chunking, embeddings generation, vector retrieval, and response synthesis pipelines.",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
    github: "https://github.com/Prekshabarjatya",
    liveUrl: "",
    techStack: {
      Languages: ["Python"],
      Backend: ["FastAPI"],
      "AI/ML": ["LangChain", "RAG", "Vector Search"],
    },
  },
] as const;

// Core skills for an AI engineer, ordered from foundational to the most
// AI-engineer-defining category (AI/ML & Generative AI is the capstone).
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
    id: "skill-cloud-devops",
    title: "Cloud & DevOps",
    items: ["Git", "Docker", "Docker Compose", "Kubernetes", "AWS (ECR)", "AWS (ECS)"],
  },
  {
    id: "skill-data-bi",
    title: "Data & BI",
    items: ["Pandas", "NumPy", "Matplotlib", "Power BI", "Tableau"],
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
] as const;

export const experience = [
  {
    role: "AI Engineer Intern",
    company: "Santerra Hygiene Pvt. Ltd.",
    date: "Jul 2026 – Sep 2026",
    bullets: [
      "Build AI-powered automation workflows and practical AI applications using Python, prompt engineering, and model integration to streamline a startup's business operations.",
      "Support business data and finance-related processes, applying automation to improve efficiency and scalability of daily operational workflows.",
    ],
  },
  {
    role: "Data Analyst Intern",
    company: "Think AI Corporation",
    date: "Apr 2026 – Jul 2026",
    bullets: [
      "Migrated legacy reports to Power BI and Tableau, building interactive dashboards to visualize key business metrics and support decision-making.",
      "Performed data analysis/EDA using Python and SQL, and designed data pipelines to clean and transform multi-source data into BI-ready formats while gathering requirements with cross-functional teams.",
    ],
  },
] as const;

export const stats = [
  { label: "Degree", value: "B.Tech CSE", sub: "AI & ML" },
  { label: "CGPA", value: "8.0 / 10", sub: "2023 – 2027" },
  { label: "Internships", value: "2", sub: "AI & Data" },
  { label: "Focus", value: "Agentic AI", sub: "RAG · LLMs" },
] as const;

export const contact = {
  email: "prekshabarjatya2105@gmail.com",
  phone: "(+91) 9993098023",
  address: "New Palasiya, Indore, India, 452001",
  github: "https://github.com/Prekshabarjatya",
  linkedin: "https://www.linkedin.com/in/preksha-barjatya-pb2024/",
};

export const certification = {
  title: "Generative AI, RAG, Multimodal & Agentic AI",
  org: "CSE (AI & ML) Dept., Acropolis Institute of Technology and Research, with Navigate Labs",
  status: "Ongoing",
};
