export interface EducationItem {
  degree: string;
  major: string;
  institution: string;
  location: string;
  duration: string;
  details: string[];
}

export interface SkillCategory {
  category: string;
  skills: { name: string; level: number; iconName: string }[];
}

export interface AchievementItem {
  title: string;
  description: string;
  date: string;
  iconName: string;
}

export interface FeaturedProjectItem {
  name: string;
  description: string;
  tech: string;
  skills: string;
  duration: string;
  details: string[];
}

export interface ProfileData {
  name: string;
  role: string;
  subtitle: string;
  about: string;
  careerGoal: string;
  socials: {
    github: string;
    linkedin: string;
    email: string;
    location: string;
    customAvatar: string;
    phone: string;
    youtube?: string;
    medium?: string;
    driveFolder?: string;
  };
  education: EducationItem[];
  skills: SkillCategory[];
  featuredProjects: FeaturedProjectItem[];
  achievements: AchievementItem[];
  aiResponses: { [key: string]: string };
}

export const profileData: ProfileData = {
  name: "Vineetkush Pali",
  role: "AI & ML Student & Python Developer",
  subtitle: "Building the Intelligent Future",
  about: "I am a Computer Science Engineering (Artificial Intelligence & Machine Learning) student at Rungta College of Engineering and Technology, Bhilai. I am deeply passionate about software development, artificial intelligence, and machine learning, constantly building real-world projects and refining my problem-solving skills through Data Structures and Algorithms (DSA).",
  careerGoal: "I am passionate about software development, Artificial Intelligence, Machine Learning, Data Structures & Algorithms, and Full Stack Web Development. I continuously learn new technologies and build projects to improve my skills. My goal is to secure a Software Engineering internship and become a professional Full Stack & AI Engineer.",
  socials: {
    github: "https://github.com/vineetkush57-debug",
    linkedin: "https://www.linkedin.com/in/vineetkush-pali-6209b9338",
    email: "vineetkush57@gmail.com",
    location: "Bhilai, Chhattisgarh, India",
    customAvatar: "", // Change this to "/my-photo.jpg" to use a custom photo placed in your public/ folder!
    phone: "+91-7987156388",
    youtube: "https://www.youtube.com/@vineetkushpali",
    medium: "https://medium.com/@vineetkushpali",
    driveFolder: "https://drive.google.com/drive/folders/1Xu7OT_oFuUg6pvma6sv0svmmOydjCwgD?usp=drive_link"
  },
  education: [
    {
      degree: "Bachelor of Technology (B.Tech)",
      major: "Computer Science and Engineering (AI/ML)",
      institution: "Rungta College of Engineering and Technology",
      location: "Bhilai, India",
      duration: "2024 - 2028",
      details: [
        "Academic Performance: Current SPI of 8.",
        "Focusing on Core Computer Science subjects, Algorithms, and Machine Learning architectures.",
        "Active member of the tech community, building python tools and web applications."
      ]
    },
    {
      degree: "Higher Secondary (Class XII)",
      major: "PCM (Physics, Chemistry, Mathematics) Stream",
      institution: "Govt School of Excellence",
      location: "Chhindwara, India",
      duration: "Completed 2024",
      details: [
        "Secured 86% in MP Board Examinations.",
        "Focused on foundational science studies."
      ]
    },
    {
      degree: "High School (Class X)",
      major: "General Curriculum",
      institution: "Advance Public School",
      location: "Chhindwara, India",
      duration: "Completed 2022",
      details: [
        "Secured 88% in board examinations."
      ]
    }
  ],
  skills: [
    {
      category: "Programming Languages",
      skills: [
        { name: "Python", level: 90, iconName: "python" },
        { name: "SQL", level: 65, iconName: "sql" },
        { name: "HTML5", level: 75, iconName: "html" },
        { name: "JavaScript", level: 85, iconName: "javascript" }
      ]
    },
    {
      category: "Technologies & Frameworks",
      skills: [
        { name: "Git & GitHub", level: 65, iconName: "github" },
        { name: "Streamlit", level: 60, iconName: "streamlit" },
        { name: "Gradio", level: 50, iconName: "gradio" },
        { name: "Hugging Face", level: 55, iconName: "huggingface" }
      ]
    },
    {
      category: "AI / ML Specialties",
      skills: [
        { name: "NPU Optimization", level: 60, iconName: "npu" },
        { name: "RAG (Retrieval-Augmented Generation)", level: 65, iconName: "rag" },
        { name: "Local LLM Orchestration", level: 60, iconName: "llm" },
        { name: "Prompt Engineering", level: 65, iconName: "prompt" }
      ]
    },
    {
      category: "ML Models & Learnings",
      skills: [
        { name: "Linear Regression", level: 65, iconName: "ml" },
        { name: "Logistic Regression", level: 60, iconName: "ml" },
        { name: "K-Nearest Neighbors (KNN)", level: 60, iconName: "ml" },
        { name: "Decision Trees", level: 60, iconName: "ml" },
        { name: "Confusion Matrix Analysis", level: 65, iconName: "ml" }
      ]
    }
  ],
  featuredProjects: [
    {
      name: "RAG Chatbot",
      tech: "Python, LangChain, sklearn, FastAPI, CSS",
      duration: "2026",
      skills: "Python, FastAPI, LangChain, Scikit-learn, REST APIs, CSS",
      description: "Built a RAG chatbot to provide accurate, context-aware responses.",
      details: [
        "Used LangChain and embeddings for efficient document chunking and retrieval.",
        "Styled using custom CSS and integrated with FastAPI for high-performance REST endpoints."
      ]
    },
    {
      name: "Message Spam Classifier",
      tech: "Python, Pandas, Streamlit, NLP, Scikit-learn",
      duration: "2026",
      skills: "Python, NLP, Embeddings, Streamlit, Pandas, Scikit-learn",
      description: "Built a Machine Learning model to classify spam messages using NLP techniques.",
      details: [
        "Implemented Multi-Head Attention from scratch to enhance feature extraction.",
        "Integrated interactive web UI using Streamlit framework for real-time inference."
      ]
    },
    {
      name: "Cortex-Lite AI",
      tech: "Python, Google Gemini API, LangChain, Streamlit",
      duration: "2026",
      skills: "Python, LangChain, Scikit-learn, NLP, Embeddings, Gemini API",
      description: "Built lightweight context-aware AI assistant for fast query processing.",
      details: [
        "Used LangChain memory and prompt engineering to improve responses.",
        "Connected with Google Gemini API to leverage state-of-the-art LLM capabilities."
      ]
    },
    {
      name: "Retail Daily Revenue Analysis",
      tech: "Python, Pandas, NumPy, Matplotlib, Streamlit",
      duration: "2025",
      skills: "Pandas, NumPy, Data Analysis, EDA, Matplotlib, Streamlit",
      description: "Performed Exploratory Data Analysis (EDA) on retail data to identify growth patterns.",
      details: [
        "Used Pandas and NumPy for large-scale data cleaning and processing.",
        "Designed Matplotlib visualization charts representing revenue trends."
      ]
    },
    {
      name: "AI Chatbot",
      tech: "Python, NLP, LLM APIs",
      duration: "2026",
      skills: "Python, FastAPI, NLP, LLM, RAG bot",
      description: "Developed intelligent conversational agents for automated problem solving.",
      details: [
        "Built a project using RAG bot architectures and FastAPI integration.",
        "Implemented automated LLM routing algorithms for prompt resolution."
      ]
    }
  ],
  achievements: [
    {
      title: "Microsoft AI Classroom & ML",
      description: "Successfully completed certifications in Microsoft AI Classroom training programs, covering artificial intelligence fundamentals and machine learning algorithms.",
      date: "Completed",
      iconName: "learning"
    },
    {
      title: "Google Badges (20+) & Arcade",
      description: "Earned 20+ skill badges in Google Cloud Platform and machine learning frameworks alongside the Google Arcade Badge.",
      date: "Active",
      iconName: "github"
    },
    {
      title: "Coding Spoon — AI/ML Certification",
      description: "Underwent intensive machine learning training, mastering foundational models and deep learning architectures.",
      date: "Completed",
      iconName: "dsa"
    },
    {
      title: "Infosys — MS Office Certification",
      description: "Completed professional spreadsheet and workspace automation training certified by Infosys.",
      date: "Completed",
      iconName: "college"
    }
  ],
  aiResponses: {
    greeting: "Hi there! I am Vineet's AI Assistant. Ask me anything about his projects, skills, education, certifications, or contacts!",
    fallback: "I couldn't find a precise match for that question. You can try asking about my 'skills', 'projects', 'education', 'college', 'certifications', 'resume', or 'contact'!",
    skills: "Vineet's skills include Python, SQL, HTML5, JavaScript, Git & GitHub, Streamlit, Gradio, Hugging Face, NPU Optimization, RAG, Local LLM Orchestration, Prompt Engineering, and ML algorithms.",
    projects: "Vineet's featured projects are: RAG Chatbot, Message Spam Classifier, Cortex-Lite AI, Retail Daily Revenue Analysis, and AI Chatbot. He also dynamically fetches other repositories from his GitHub profile (vineetkush57-debug).",
    education: "Vineet is pursuing a B.Tech in Computer Science and Engineering (Artificial Intelligence & Machine Learning) at Rungta College of Engineering and Technology, Bhilai (current SPI: 8, expected 2028). He completed Class XII from Govt School of Excellence, Chhindwara with 86%, and Class X from Advance Public School, Chhindwara with 88%.",
    college: "Vineet studies at Rungta College of Engineering and Technology, Bhilai, pursuing a B.Tech in CSE (AI/ML).",
    contact: "You can reach Vineet via email at vineetkush57@gmail.com, via phone at +91-7987156388, or check out his LinkedIn, GitHub, YouTube (@vineetkushpali), and Medium.",
    resume: "You can download Vineet's resume by clicking the 'Download Resume' button in the Hero section or the Resume section of the website.",
    role: "Vineet is an aspiring Software Engineer, Python Developer, and AI & ML student focused on building intelligent web systems.",
    career: "Vineet's career goal is to secure a Software Engineering internship, master Full Stack & AI Engineering, and build real-world applications that solve actual problems."
  }
};
