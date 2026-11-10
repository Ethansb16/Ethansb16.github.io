// Projects data (content only — rendered by js/animations.js)
const projects = [
    {
        title: "Offline RAG-Connected LLM",
        featured: true,
        description: "Created an offline, RAG-connected LLM to fetch sensitive documents and leverage AI tools without the need for the cloud — allowing us to ask an IBM model questions about our documentation.",
        technologies: ["RAG", "LLM", "IBM Model", "Offline"],
        pipeline: [
            { icon: "fas fa-circle-question", label: "Question" },
            { icon: "fas fa-folder-open", label: "Sensitive documents" },
            { icon: "fas fa-microchip", label: "IBM model" },
            { icon: "fas fa-comment-dots", label: "Answer" }
        ]
    },
    {
        title: "TCP Server Construction",
        description: "Built a multithreaded TCP server to handle HTTP requests and execute cgi-bin operations. Implemented robust error handling and optimized for performance on a local server.",
        technologies: ["C", "TCP/IP", "Threading", "HTTP", "CGI"],
        link: "https://github.com/Ethansb16/TCP-Server-C"
    },
    {
        title: "Database Engineering",
        description: "Designed and implemented a database using MySQL connected to a Python application. Created a custom interactive terminal menu for searching, adding, and deleting from the database.",
        technologies: ["Python", "MySQL", "CLI", "Database Design"],
        link: "https://github.com/Ethansb16/MySQL-Python-Database-Integration"
    },
    {
        title: "Web Application Development",
        description: "Developed a fully functional web application that connects users to plus-ones for events via invite/apply. Built with Next.js and Prisma, featuring full-stack development with dynamic components and custom API calls.",
        technologies: ["TypeScript", "Next.js", "Prisma", "Tailwind CSS", "API Development"],
        link: "https://github.com/CSC307Fall2024/Plus"
    },
    {
        title: "Security Projects Collection",
        description: "A comprehensive collection of security-focused implementations and tools demonstrating practical cybersecurity concepts.",
        technologies: ["Python", "Cryptography", "Network Security", "PyCryptodome"],
        link: "https://github.com/Ethansb16/SecurityPlayground",
        subProjects: [
            {
                title: "EBC and CBC Ciphers",
                description: "Implemented custom CBC and ECB encryption modes with proper IV handling, PKCS7 padding, and block segmentation",
                technologies: ["Cryptography", "Python"]
            },
            {
                title: "Alpha Generator",
                description: "Tool for analyzing and performing alpha generator attacks on Diffie-Hellman key exchange",
                technologies: ["Cryptography", "Security Analysis"]
            },
            {
                title: "ARP Spoofer",
                description: "Tool demonstrating ARP spoofing attacks with network packet manipulation capabilities",
                technologies: ["Network Security", "Packet Analysis"]
            },
            {
                title: "BCrypt Password Cracker",
                description: "Tool for analyzing BCrypt password hashing security and demonstrating cryptographic vulnerabilities",
                technologies: ["Password Security", "Cryptography"]
            },
            {
                title: "Diffie-Hellman Implementation",
                description: "Secure key exchange implementation with MITM attack demonstration using PyCryptodome",
                technologies: ["Cryptography", "Key Exchange", "PyCryptodome"]
            },
            {
                title: "RSA Implementation",
                description: "Custom implementation of RSA encryption algorithm demonstrating public-key cryptography principles",
                technologies: ["Cryptography", "Public Key Infrastructure"]
            }
        ]
    }
];
