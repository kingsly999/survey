import { 
  User, Mail, Briefcase, GraduationCap, Brain, Target, 
  BookOpen, Wrench, Sparkles, TrendingUp, School 
} from 'lucide-react';

// Base questions (Q1-Q2)
const baseQuestions = {
  1: {
    id: 1,
    text: "What is your name?",
    type: "text",
    icon: User,
    required: true
  },
  2: {
    id: 2,
    text: "What best describes you?",
    type: "single",
    icon: Briefcase,
    options: [
      "Student",
      "Working Professional"
    ],
    required: true,
    branching: true
  }
};

// Working Professional Questions (Q3-Q10)
const workingProfessionalQuestions = {
  3: {
    id: 3,
    text: "Which best describes your current role?",
    type: "single",
    icon: Briefcase,
    options: [
      "Technical Role (Developer, Engineer, Data/AI Analyst, Tech Associate)",
      "Business/Operations Role (Manager, Team Lead, Consultant, Business Analyst)",
      "Leadership Role (Senior Manager, Director, VP, C-level)",
      "Other (please specify)"
    ],
    required: true,
    hasOtherOption: true
  },
  4: {
    id: 4,
    text: "How many years of professional experience do you have?",
    type: "single",
    icon: Target,
    options: [
      "Entry-level (0–2 years)",
      "Mid-level (3–7 years)",
      "Senior-level (8+ years)",
      "Executive / C-level"
    ],
    required: true
  },
  5: {
    id: 5,
    text: "Which technologies are you interested in?",
    type: "multiple",
    icon: Sparkles,
    options: [
      "Artificial Intelligence (AI)",
      "Quantum Computing (QC)",
      "Emerging Technologies (ET)"
    ],
    required: true
  },
  6: {
    id: 6,
    text: "How would you rate your proficiency?",
    type: "combined_proficiency",
    icon: Brain,
    options: [
      "Beginner",
      "Intermediate",
      "Advanced",
      "Expert"
    ],
    required: true
  },
  7: {
    id: 7,
    text: "What motivates your interest in these technologies?",
    type: "single",
    icon: Target,
    options: [
      "To advance in my current field",
      "To explore new career opportunities",
      "To develop my own projects or startup",
      "To enhance my academic or research skills",
      "Out of personal curiosity"
    ],
    required: true
  },
  8: {
    id: 8,
    text: "Which tools have you used so far? (Select all that apply)",
    type: "multiple",
    icon: Wrench,
    options: [
      // AI Tools
      "ChatGPT",
      "Claude AI",
      "Google Gemini",
      "DALL·E / MidJourney",
      "Canva AI",
      "GitHub Copilot",
      "HuggingFace Transformers",
      "TensorFlow",
      "PyTorch",
      "OpenAI API",
      // QC Tools
      "IBM Quantum Lab / Qiskit",
      "Google Cirq",
      "Microsoft Q#",
      "PennyLane",
      "D-Wave Ocean SDK",
      "Rigetti Forest SDK",
      "Quantum Inspire",
      "Quirk",
      "IonQ API",
      "TensorFlow Quantum",
      // ET Tools
      "Canva",
      "Tinkercad",
      "MIT App Inventor",
      "CoSpaces Edu",
      "SketchUp Free",
      "Minecraft Education",
      "Hopscotch",
      "MakeCode",
      "Figma",
      "Glitch"
    ],
    required: false
  },
  9: {
    id: 9,
    text: "Are you interested in structured learning programs?",
    type: "single",
    icon: BookOpen,
    options: [
      "Yes, short certifications",
      "Yes, full specialization programs",
      "Maybe later",
      "No"
    ],
    required: true
  },
  10: {
    id: 10,
    text: "Do you want to join other free newsletters by YoupowerQ?",
    type: "multiple",
    icon: Mail,
    options: [], // Dynamic based on source - auto-selected
    required: false,
    isNewsletter: true
  }
};

// Student (Undergraduate/Postgraduate) Questions (Q3-Q10)
const studentQuestions = {
  3: {
    id: 3,
    text: "What is your current level of education?",
    type: "single",
    icon: GraduationCap,
    options: [
      "School Student",
      "Undergraduate",
      "Postgraduate",
      "Diploma / Certification",
      "Other"
    ],
    required: true,
    branching: true,
    hasOtherOption: true
  },
  4: {
    id: 4,
    text: "What is your primary field of study or interest?",
    type: "single",
    icon: BookOpen,
    options: [
      "Computer Science / Technology",
      "Science / Math (Chemistry, Biology, etc.)",
      "Business / Management / Economics",
      "Arts / Humanities (Languages, History, Social Studies)",
      "Other"
    ],
    required: true,
    hasOtherOption: true
  },
  5: {
    id: 5,
    text: "Which technologies are you interested in?",
    type: "multiple",
    icon: Sparkles,
    options: [
      "Artificial Intelligence (AI)",
      "Quantum Computing (QC)",
      "Emerging Technologies (ET)"
    ],
    required: true
  },
  6: {
    id: 6,
    text: "How would you rate your proficiency?",
    type: "combined_proficiency",
    icon: Brain,
    options: [
      "Beginner",
      "Intermediate",
      "Advanced",
      "Expert"
    ],
    required: true
  },
  7: {
    id: 7,
    text: "What motivates your interest in these technologies?",
    type: "single",
    icon: Target,
    options: [
      "To prepare for future career opportunities",
      "To apply in projects or research",
      "To explore entrepreneurship",
      "Out of personal curiosity"
    ],
    required: true
  },
  8: {
    id: 8,
    text: "Which tools have you used so far? (Select all that apply)",
    type: "multiple",
    icon: Wrench,
    options: [
      // AI Tools
      "ChatGPT",
      "Claude AI",
      "Google Gemini",
      "DALL·E / MidJourney",
      "Canva AI",
      "GitHub Copilot",
      "HuggingFace Transformers",
      "TensorFlow",
      "PyTorch",
      "OpenAI API",
      // QC Tools
      "IBM Quantum Lab / Qiskit",
      "Google Cirq",
      "Microsoft Q#",
      "PennyLane",
      "D-Wave Ocean SDK",
      "Rigetti Forest SDK",
      "Quantum Inspire",
      "Quirk",
      "IonQ API",
      "TensorFlow Quantum",
      // ET Tools
      "Canva",
      "Tinkercad",
      "MIT App Inventor",
      "CoSpaces Edu",
      "SketchUp Free",
      "Minecraft Education",
      "Hopscotch",
      "MakeCode",
      "Figma",
      "Glitch"
    ],
    required: false
  },
  9: {
    id: 9,
    text: "Would you prefer learning through structured courses?",
    type: "single",
    icon: BookOpen,
    options: [
      "Yes, beginner-friendly courses",
      "Yes, advanced technical courses",
      "Maybe later",
      "No"
    ],
    required: true
  },
  10: {
    id: 10,
    text: "Do you want to join free newsletters by YoupowerQ?",
    type: "multiple",
    icon: Mail,
    options: [], // Dynamic based on source - auto-selected
    required: false,
    isNewsletter: true
  }
};

// School Student Questions (Q4-Q11)
const schoolStudentQuestions = {
  4: {
    id: 4,
    text: "What is your current school grade?",
    type: "single",
    icon: School,
    options: [
      "Middle School",
      "High School"
    ],
    required: true
  },
  5: {
    id: 5,
    text: "What is your main field of study or interest?",
    type: "single",
    icon: BookOpen,
    options: [
      "Science / Math",
      "Computer Science / Technology",
      "Business / Management",
      "Other"
    ],
    required: true,
    hasOtherOption: true
  },
  6: {
    id: 6,
    text: "Which technologies are you interested in?",
    type: "multiple",
    icon: Sparkles,
    options: [
      "Artificial Intelligence (AI)",
      "Quantum Computing (QC)",
      "Emerging Technologies (ET)"
    ],
    required: true
  },
  7: {
    id: 7,
    text: "How would you rate your proficiency?",
    type: "combined_proficiency",
    icon: Brain,
    options: [
      "Beginner",
      "Intermediate",
      "Advanced"
    ],
    required: true
  },
  8: {
    id: 8,
    text: "What motivates your interest in these technologies?",
    type: "single",
    icon: Target,
    options: [
      "To explore and learn new concepts",
      "To build small projects",
      "To strengthen academic skills or school projects",
      "Out of personal curiosity"
    ],
    required: true
  },
   9: {
    id: 9,
    text: "Which tools have you used so far? (Select all that apply)",
    type: "multiple",
    icon: Wrench,
    options: [
      // AI Tools
      "ChatGPT",
      "Claude AI",
      "Google Gemini",
      "DALL·E / MidJourney",
      "Canva AI",
      "GitHub Copilot",
      "HuggingFace Transformers",
      "TensorFlow",
      "PyTorch",
      "OpenAI API",
      // QC Tools
      "IBM Quantum Lab / Qiskit",
      "Google Cirq",
      "Microsoft Q#",
      "PennyLane",
      "D-Wave Ocean SDK",
      "Rigetti Forest SDK",
      "Quantum Inspire",
      "Quirk",
      "IonQ API",
      "TensorFlow Quantum",
      // ET Tools
      "Canva",
      "Tinkercad",
      "MIT App Inventor",
      "CoSpaces Edu",
      "SketchUp Free",
      "Minecraft Education",
      "Hopscotch",
      "MakeCode",
      "Figma",
      "Glitch"
    ],
    required: false
  },
  10: {
    id: 10,
    text: "Would you prefer learning through courses?",
    type: "single",
    icon: BookOpen,
    options: [
      "Yes, beginner-friendly courses",
      "Yes, interactive project-based courses",
      "Maybe later",
      "No"
    ],
    required: true
  },
  11: {
    id: 11,
    text: "Do you want to join free newsletters by YoupowerQ?",
    type: "multiple",
    icon: Mail,
    options: [], // Dynamic based on source - auto-selected
    required: false,
    isNewsletter: true
  }
};

export const getQuestionSet = (userType, educationLevel) => {
  if (userType === "Working Professional") {
    return { ...baseQuestions, ...workingProfessionalQuestions };
  } else if (userType === "Student") {
    if (educationLevel === "School Student") {
      return { ...baseQuestions, ...studentQuestions, ...schoolStudentQuestions };
    } else {
      return { ...baseQuestions, ...studentQuestions };
    }
  }
  
  return baseQuestions;
};

export const getTotalQuestions = (userType, educationLevel) => {
  if (userType === "Working Professional") {
    return 10;
  } else if (userType === "Student") {
    if (educationLevel === "School Student") {
      return 11;
    } else {
      return 10;
    }
  }
  
  return 2;
};