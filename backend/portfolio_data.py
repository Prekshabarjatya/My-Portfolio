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
        "id": "project-research-paper-agents",
        "target_element": "#project-research-paper-agents",
        "title": "Multi-Agent Research Paper Writer",
        "tags": ["LangGraph", "Multi-Agent", "Citation Verification", "Human-in-the-loop"],
        "summary": (
            "A LangGraph workflow of seven specialist agents (brief analyst, topic "
            "strategist, source scout, thesis writer, outliner, drafter, critic) that "
            "turns an assignment brief into a cited, literature-based research paper."
        ),
        "architecture_notes": (
            "A fixed graph with deterministic routing, not an LLM supervisor. Every "
            "citation is verified against Crossref in code, a human approves the topic "
            "and thesis before drafting, a critic loop rewrites or finds more sources, "
            "and runs are checkpointed in Postgres so they survive crashes and deploys."
        ),
        "keywords": [
            "multi-agent", "agents", "agentic", "langgraph", "research", "paper",
            "citations", "human-in-the-loop", "orchestration", "architecture",
            "production", "real-world", "impact", "postgres", "reliability",
        ],
    },
    {
        "id": "project-document-qa",
        "target_element": "#project-document-qa",
        "title": "Document Q&A",
        "tags": ["FastAPI", "LangChain", "RAG", "Vector Search"],
        "summary": (
            "A Retrieval-Augmented Generation (RAG) document Q&A service built with "
            "FastAPI and LangChain: answers are grounded in retrieved passages and "
            "cite the passage they came from."
        ),
        "architecture_notes": (
            "End-to-end pipeline: document ingestion, chunking, vectorization, "
            "cosine-similarity retrieval, and response synthesis, served behind a "
            "FastAPI backend."
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

PERSONAL_KB = [
    {
        "id": "hobbies",
        "title": "Hobbies & Interests",
        "keywords": [
            "hobby", "hobbies", "interest", "interests", "outside of work",
            "free time", "personal life", "read", "reading", "book", "books",
            "music", "taylor swift", "language", "languages", "spare time",
            "what does she do for fun", "for fun",
        ],
        "content": (
            "Outside engineering, Preksha reads dark-academia-styled novels, "
            "listens to music (Taylor Swift on regular rotation), and has been "
            "learning new languages. She's also deliberately working on her "
            "communication and people skills, she enjoys hosting and putting "
            "herself in situations where she has to communicate, coordinate, and "
            "interact with people, treating it as an active skill she's building, "
            "not something already finished."
        ),
    },
    {
        "id": "strongest_skills",
        "title": "Strongest Skills",
        "keywords": [
            "strongest", "strength", "strengths", "best at", "good at",
            "best quality", "biggest strength", "superpower", "what makes her",
        ],
        "content": (
            "Her strongest quality is that she genuinely likes learning, when she "
            "hits something she doesn't understand, she goes deep into it instead of "
            "stopping at the surface: breaking complex problems down, understanding "
            "how the pieces connect, then actually building with what she learned. "
            "She's also actively developing communication, collaboration, and people "
            "skills, and treats feedback as a tool for improving rather than taking "
            "it personally. She wants to be someone who contributes technically while "
            "also being someone people can work with effectively."
        ),
    },
    {
        "id": "short_term_goals",
        "title": "Short-Term Goals (6-12 months)",
        "keywords": [
            "short term", "short-term", "6 months", "12 months", "near term",
            "next year", "immediate goal", "right now", "currently working on",
        ],
        "content": (
            "Her immediate goal is to get hands-on experience working in AI and "
            "strengthen her engineering skills through real projects and real-world "
            "problem solving, moving beyond learning concepts in isolation and "
            "spending more time actually building, experimenting, and debugging. "
            "Alongside AI, she's continuing to strengthen her software engineering "
            "foundations: backend development, APIs, system design, databases, and "
            "distributed systems, while deliberately improving communication, "
            "presentation, collaboration, and leadership skills."
        ),
    },
    {
        "id": "long_term_goals",
        "title": "Long-Term Goals (3-5 years)",
        "keywords": [
            "long term", "long-term", "5 years", "3-5 years", "future",
            "career goal", "where do you see", "career plan", "vision",
        ],
        "content": (
            "Long term, she wants to grow into a strong technical professional who "
            "can operate at both the engineering and management level, building deep "
            "technical expertise, working on meaningful AI-powered systems, and "
            "eventually combining technical understanding with people leadership, "
            "strategy, and decision-making. Her path into management runs through "
            "technical strength first: understanding the problems her team is solving "
            "before learning how to help people solve them better."
        ),
    },
    {
        "id": "why_ai",
        "title": "Why AI",
        "keywords": [
            "why ai", "choose ai", "chose ai", "choosing ai", "picked ai",
            "picking ai", "passion", "motivation", "motivated", "interested in ai",
            "why this field", "why engineering", "attracted to ai", "excites her",
            "excite her", "drawn to ai",
        ],
        "content": (
            "AI excites her because learning and building are happening "
            "simultaneously in this field. She doesn't want to learn AI as a "
            "collection of models or frameworks, she wants hands-on experience with "
            "how AI systems are actually built, integrated, evaluated, and made "
            "useful in real products. She's particularly drawn to the engineering "
            "side: agents, APIs, tools, context, memory, backend systems, and the "
            "infrastructure that makes intelligent applications actually work. Her "
            "goal is enough practical experience to understand not just what works, "
            "but why it works and where it breaks."
        ),
    },
    {
        "id": "values",
        "title": "Values",
        "keywords": [
            "value", "values", "what do you value", "culture fit", "work style",
            "work ethic", "philosophy",
        ],
        "content": (
            "She values curiosity, continuous improvement, clear communication, and "
            "being open to feedback. She doesn't expect to know everything, she "
            "cares more about learning quickly, asking better questions, and "
            "accepting when something can be improved. She believes technical growth "
            "and personal growth should happen together: being able to build "
            "something matters, but being able to communicate it, collaborate on it, "
            "take responsibility for it, and eventually lead people around it is what "
            "makes the skill valuable."
        ),
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


def find_best_personal_topics(query: str, limit: int = 2):
    q = query.lower()
    scored = [
        (sum(1 for kw in t["keywords"] if kw in q), t)
        for t in PERSONAL_KB
    ]
    scored.sort(key=lambda pair: pair[0], reverse=True)
    matched = [t for score, t in scored if score > 0][:limit]
    if matched:
        return matched
    # No keyword matched anything, fall back to broadly-safe general topics
    # (strongest_skills, values) instead of guessing a narrow, possibly
    # unrelated one, so the LLM never has to stretch unrelated facts.
    fallback = [t for t in PERSONAL_KB if t["id"] in ("strongest_skills", "values")]
    return fallback or [PERSONAL_KB[0]]
