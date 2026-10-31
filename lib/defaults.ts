export const defaults: any = {
  profile: {
    name: "Preeti Vaza",
    title: "Full-Stack Developer & AI/ML Enthusiast",
    tagline:
      "I build web applications and machine learning systems that solve practical problems.",
    about:
      "I'm a Computer Engineering student at Vishwakarma Government Engineering College, Ahmedabad, with hands-on experience in full-stack development using the MERN stack, Python, and Machine Learning. I enjoy transforming ideas and data into practical, scalable solutions - from building RESTful APIs and interactive React applications to developing ML models and LLM-powered applications.I'm passionate about exploring technologies, solving real-world problems, and continuously improving my technical skills. I'm currently seeking opportunities in Software Engineering, Full-Stack Development, or AI/ML Engineering where I can contribute to impactful projects and grow as a developer.",

    email: "preetivaza@gmail.com",
    phone: "+91 8200005913",
    location: "Ahmedabad, Gujarat",
    photo: "/preeti.png",
    resume: "/Preeti_Vaza_SE.pdf",
    github: "https://github.com/Preetivaza",
    linkedin: "https://www.linkedin.com/in/vazapreeti3015/",
    leetcode: "",
  },
  sections: [
    ["about", "About"],
    ["skills", "Skills"],
    ["experience", "Experience"],
    ["projects", "Projects"],
    ["education", "Education"],
    ["achievements", "Achievements"],
    ["certifications", "Certifications"],
    ["profiles", "Profiles"],
    ["resume", "Resume"],
    ["contact", "Contact"],
  ].map(([id, label]) => ({ id, label, visible: true })),
  projects: [
    {
      title: "ResearchMind",
      description:
        "Multi-agent AI research system. Specialized agents search the web, read and summarize content, and review findings, then produce a structured research report.",
      tech: ["Python", "LangChain", "LLM"],
      github: "https://github.com/Preetivaza/MultiAgentSearch",
      live: "",
      image: "",
    },
    {
      title: "Home Essential Rental System",
      description:
        "Full-stack rental app with product search, category filters, RESTful APIs for users, inventory and bookings, and JWT-based authentication and authorization.",
      tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      github: "https://github.com/Preetivaza/HomeessentialRentalSystem",
      live: "",
      image: "",
    },
    {
      title: "AgriSense - (Team Project)",
      description:
        "AI-powered crop monitoring system that analyzes agricultural datasets to predict crop yield and crop health. ML predictions are shown on an interactive MERN dashboard with data visualizations.",
      tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "MERN"],
      github: "https://github.com/RanaDarpan/AgriSense",
      live: "",
      image: "",
    },
  ],
  skills: [
    { category: "Languages", items: ["Python", "Java", "JavaScript"] },
    {
      category: "Web",
      items: [
        "React",
        "Node.js",
        "Express.js",
        "REST APIs",
        "JWT",
        "HTML",
        "CSS",
      ],
    },
    {
      category: "Machine Learning",
      items: [
        "Scikit-learn",
        "Regression",
        "Classification",
        "Clustering",
        "Feature Engineering",
        "Model Evaluation",
      ],
    },
    {
      category: "Data & GenAI",
      items: [
        "Pandas",
        "NumPy",
        "Matplotlib",
        "EDA",
        "LangChain",
        "LLM APIs",
        "Prompt Engineering",
      ],
    },
    {
      category: "Databases & Tools",
      items: ["MongoDB", "MySQL", "Git", "GitHub", "Jupyter", "VS Code"],
    },
    { category: "Core CS", items: ["DSA", "OOP", "DBMS", "Operating Systems"] },
  ],
  experience: [
    {
      role: "React Developer Intern",
      company: "InfoLabz",
      period: "2026",
      points: [
        "Built React.js applications using reusable components, hooks and state management.",
        "Developed UI projects while strengthening JavaScript, React and frontend skills.",
      ],
    },
    {
      role: "Machine Learning Intern",
      company: "IBM SkillsBuild",
      period: "",
      points: [
        "Built supervised machine learning models for classification and regression.",
        "Performed data preprocessing, feature engineering and model evaluation.",
      ],
    },
  ],
  education: [
    {
      degree: "B.E. in Computer Engineering",
      institute: "V.G.E.C.",
      period: "2024 – 2027",
      score: "CGPA 8.98",
    },
    {
      degree: "Diploma in Computer Engineering",
      institute: "A.V. Parekh Technical Institute",
      period: "2021 – 2024",
      score: "CGPA 9.60",
    },
  ],
  achievements: [
    {
      title: "Smart India Hackathon (Internal)",
      description:
        "Participated in the internal round at Vishwakarma Government Engineering College.",
      date: "Sep 2025",
      certificate: "",
    },
  ],
  certifications: [],
};
