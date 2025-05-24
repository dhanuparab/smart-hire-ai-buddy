
interface InterviewQuestion {
  id: number;
  question: string;
  expectedPoints: string[];
  timeLimit: number;
}

export const interviewQuestionBank: Record<string, InterviewQuestion[]> = {
  "Frontend Developer": [
    {
      id: 1,
      question: "Can you explain the difference between let, const, and var in JavaScript?",
      expectedPoints: ["Block scoping", "Hoisting", "Reassignment rules", "Temporal dead zone"],
      timeLimit: 180
    },
    {
      id: 2,
      question: "How would you optimize the performance of a React application?",
      expectedPoints: ["Code splitting", "Memoization", "Virtual DOM", "Bundle optimization"],
      timeLimit: 240
    },
    {
      id: 3,
      question: "Describe your approach to responsive web design and CSS frameworks.",
      expectedPoints: ["Mobile-first", "Flexbox/Grid", "Media queries", "Framework knowledge"],
      timeLimit: 180
    },
    {
      id: 4,
      question: "How do you handle state management in large React applications?",
      expectedPoints: ["Redux/Context", "Component state", "State normalization", "Side effects"],
      timeLimit: 240
    },
    {
      id: 5,
      question: "What are your strategies for debugging JavaScript applications?",
      expectedPoints: ["Browser tools", "Console methods", "Error handling", "Testing"],
      timeLimit: 180
    }
  ],
  "Backend Developer": [
    {
      id: 1,
      question: "Explain the principles of RESTful API design and best practices.",
      expectedPoints: ["HTTP methods", "Status codes", "Resource naming", "Statelessness"],
      timeLimit: 240
    },
    {
      id: 2,
      question: "How do you handle database optimization and query performance?",
      expectedPoints: ["Indexing", "Query optimization", "Connection pooling", "Caching"],
      timeLimit: 240
    },
    {
      id: 3,
      question: "Describe your approach to handling authentication and authorization.",
      expectedPoints: ["JWT tokens", "OAuth", "Role-based access", "Security best practices"],
      timeLimit: 240
    },
    {
      id: 4,
      question: "How would you design a scalable microservices architecture?",
      expectedPoints: ["Service decomposition", "Communication patterns", "Data consistency", "Monitoring"],
      timeLimit: 300
    },
    {
      id: 5,
      question: "What strategies do you use for error handling and logging?",
      expectedPoints: ["Error types", "Logging levels", "Monitoring", "Alerting"],
      timeLimit: 180
    }
  ],
  "Data Scientist": [
    {
      id: 1,
      question: "Walk me through your process for handling missing data in a dataset.",
      expectedPoints: ["Data exploration", "Imputation methods", "Impact analysis", "Documentation"],
      timeLimit: 240
    },
    {
      id: 2,
      question: "How do you choose between different machine learning algorithms?",
      expectedPoints: ["Problem type", "Data characteristics", "Performance metrics", "Validation"],
      timeLimit: 300
    },
    {
      id: 3,
      question: "Explain how you would validate and interpret a predictive model.",
      expectedPoints: ["Cross-validation", "Metrics selection", "Feature importance", "Bias detection"],
      timeLimit: 240
    },
    {
      id: 4,
      question: "Describe your approach to feature engineering and selection.",
      expectedPoints: ["Domain knowledge", "Statistical methods", "Dimensionality reduction", "Validation"],
      timeLimit: 240
    },
    {
      id: 5,
      question: "How do you communicate technical findings to non-technical stakeholders?",
      expectedPoints: ["Visualization", "Storytelling", "Business impact", "Actionable insights"],
      timeLimit: 240
    }
  ],
  "Product Manager": [
    {
      id: 1,
      question: "How do you prioritize features when resources are limited?",
      expectedPoints: ["Framework usage", "Stakeholder alignment", "Impact assessment", "Trade-offs"],
      timeLimit: 240
    },
    {
      id: 2,
      question: "Describe your process for gathering and analyzing user requirements.",
      expectedPoints: ["User research", "Stakeholder interviews", "Data analysis", "Validation"],
      timeLimit: 240
    },
    {
      id: 3,
      question: "How do you measure product success and iterate based on feedback?",
      expectedPoints: ["KPI definition", "Analytics", "User feedback", "Iteration cycles"],
      timeLimit: 240
    },
    {
      id: 4,
      question: "Tell me about a time you had to make a difficult product decision.",
      expectedPoints: ["Context setting", "Decision process", "Stakeholder management", "Outcome"],
      timeLimit: 300
    },
    {
      id: 5,
      question: "How do you work with engineering teams to deliver products on time?",
      expectedPoints: ["Agile methodology", "Communication", "Scope management", "Risk mitigation"],
      timeLimit: 240
    }
  ],
  "UX Designer": [
    {
      id: 1,
      question: "Walk me through your design process from research to final design.",
      expectedPoints: ["User research", "Ideation", "Prototyping", "Testing", "Iteration"],
      timeLimit: 300
    },
    {
      id: 2,
      question: "How do you conduct user research and what methods do you prefer?",
      expectedPoints: ["Research methods", "User interviews", "Usability testing", "Data synthesis"],
      timeLimit: 240
    },
    {
      id: 3,
      question: "Describe how you handle feedback and criticism of your designs.",
      expectedPoints: ["Feedback processing", "Iteration", "Stakeholder communication", "Design rationale"],
      timeLimit: 180
    },
    {
      id: 4,
      question: "How do you ensure accessibility in your design work?",
      expectedPoints: ["WCAG guidelines", "Inclusive design", "Testing methods", "Universal design"],
      timeLimit: 240
    },
    {
      id: 5,
      question: "Tell me about a challenging design problem you solved recently.",
      expectedPoints: ["Problem definition", "Research insights", "Solution approach", "Impact measurement"],
      timeLimit: 300
    }
  ]
};
