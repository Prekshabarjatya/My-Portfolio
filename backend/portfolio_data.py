"""Preksha Barjatya's real portfolio content, used by the tour-guide agent.

Every DOM id referenced here (target_element) must exist in the Next.js
frontend (web/) so the WebSocket bridge can actually scroll to / highlight it.
"""

PROJECTS = [
    {
        "id": "project-resume-optimizer",
        "target_element": "#project-resume-optimizer",
        "title": "Multi-Agent Resume Optimizer",
        "tags": ["LangGraph", "Tool Calling", "Pydantic", "Agentic AI"],
        "summary": (
            "A LangGraph-orchestrated multi-agent pipeline that validates, extracts, "
            "and scores resumes against job descriptions (PDF/DOCX/text) using "
            "specialized agents with tool calling and Pydantic-structured LLM outputs."
        ),
        "architecture_notes": (
            "Hybrid scoring engine combining deterministic skill/keyword/ATS checks "
            "with grounded LLM judgment (skill synonymy, fit assessment, gap analysis), "
            "reducing hallucination risk via source-evidence grounding and "
            "prompt-injection-safe document handling."
        ),
        "keywords": [
            "architecture", "production", "system design", "agents", "multi-agent",
            "orchestration", "real-world", "impact", "application", "resume",
        ],
    },
    {
        "id": "project-ecommerce-optimizer",
        "target_element": "#project-ecommerce-optimizer",
        "title": "AI E-Commerce Listing Optimizer",
        "tags": ["Agentic AI", "RAG", "LLM", "Automation"],
        "summary": (
            "A knowledge-base-grounded AI listing optimizer for e-commerce using RAG "
            "and multi-agent workflows, combining knowledge retrieval, attribute-aware "
            "content generation, keyword optimization, and critic-based quality scoring."
        ),
        "architecture_notes": (
            "Deterministic fact-validation layer plus a human review workflow keeps "
            "generated content grounded in a curated brand knowledge base and prevents "
            "unsupported claims from shipping."
        ),
        "keywords": [
            "rag", "retrieval", "grounding", "e-commerce", "automation", "content",
            "production", "real-world", "impact",
        ],
    },
    {
        "id": "project-research-assistant",
        "target_element": "#project-research-assistant",
        "title": "AI Research Assistant",
        "tags": ["FastAPI", "LangChain", "RAG", "Vector Search"],
        "summary": (
            "A Retrieval-Augmented Generation (RAG) application built with FastAPI and "
            "LangChain for intelligent document querying."
        ),
        "architecture_notes": (
            "End-to-end pipeline: document ingestion, chunking, embeddings generation, "
            "vector retrieval, and response synthesis, served behind a FastAPI backend."
        ),
        "keywords": [
            "fastapi", "backend", "api", "rag", "architecture", "system design",
            "production", "infrastructure",
        ],
    },
]

SKILL_CATEGORIES = [
    {
        "id": "skill-backend",
        "target_element": "#skill-backend",
        "title": "Backend Engineering",
        "items": ["FastAPI", "REST APIs", "API Design", "Pydantic"],
        "keywords": ["backend", "api", "fastapi", "server", "infrastructure", "tools"],
    },
    {
        "id": "skill-ai-ml",
        "target_element": "#skill-ai-ml",
        "title": "AI/ML & Generative AI",
        "items": [
            "LangChain", "LangGraph", "RAG", "Document Embeddings",
            "Vector Search", "Prompt Engineering", "Generative AI", "Groq API",
        ],
        "keywords": ["ai", "ml", "llm", "rag", "langchain", "langgraph", "agent", "stack"],
    },
    {
        "id": "skill-cloud-devops",
        "target_element": "#skill-cloud-devops",
        "title": "Cloud & DevOps",
        "items": ["Git", "Docker", "Docker Compose", "Kubernetes", "AWS (ECR)", "AWS (ECS)"],
        "keywords": [
            "infrastructure", "devops", "cloud", "aws", "docker", "kubernetes",
            "deployment", "tools", "stack",
        ],
    },
    {
        "id": "skill-data-bi",
        "target_element": "#skill-data-bi",
        "title": "Data & BI",
        "items": ["Pandas", "NumPy", "Matplotlib", "Power BI", "Tableau"],
        "keywords": ["data", "analytics", "bi", "dashboards", "pandas", "tools"],
    },
]

CANDIDATE_SUMMARY = (
    "Preksha Barjatya is a B.Tech CSE (AI & ML) student at Acropolis Institute of "
    "Technology and Research, Indore (2023-2027, CGPA 8.0), currently interning as an "
    "AI Engineer at Santerra Hygiene Pvt. Ltd. building agentic automation workflows, "
    "after previously working as a Data Analyst Intern at Think AI Corporation. She "
    "builds RAG applications, FastAPI backends, and LangGraph-orchestrated multi-agent "
    "systems."
)


def find_best_project(query: str):
    q = query.lower()
    scored = [
        (sum(1 for kw in p["keywords"] if kw in q), p)
        for p in PROJECTS
    ]
    scored.sort(key=lambda pair: pair[0], reverse=True)
    return scored[0][1] if scored[0][0] > 0 else PROJECTS[0]


def find_best_skill_category(query: str):
    q = query.lower()
    scored = [
        (sum(1 for kw in c["keywords"] if kw in q), c)
        for c in SKILL_CATEGORIES
    ]
    scored.sort(key=lambda pair: pair[0], reverse=True)
    return scored[0][1] if scored[0][0] > 0 else SKILL_CATEGORIES[1]
