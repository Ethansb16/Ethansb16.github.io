// Populate Projects
const projects = [
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
const projectsGrid = document.querySelector('.projects-grid');

projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = project.title === "Security Projects Collection" 
        ? 'project-card security-collection'
        : 'project-card';
    
    if (project.title === "Security Projects Collection") {
        // Special layout for security projects
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tech-tags">
                ${project.technologies.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('')}
            </div>
            <a href="${project.link}" class="project-link" target="_blank">
                <i class="fab fa-github"></i> View Collection on GitHub
            </a>
            <div class="sub-projects">
                ${project.subProjects.map(subProject => `
                    <div class="sub-project">
                        <h4>${subProject.title}</h4>
                        <p>${subProject.description}</p>
                        <div class="tech-tags">
                            ${subProject.technologies.map(tech => 
                                `<span class="tech-tag">${tech}</span>`
                            ).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        // Regular project card layout
        projectCard.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tech-tags">
                ${project.technologies.map(tech => 
                    `<span class="tech-tag">${tech}</span>`
                ).join('')}
            </div>
            <a href="${project.link}" class="project-link" target="_blank">
                <i class="fab fa-github"></i> View on GitHub
            </a>
        `;
    }
    
    projectsGrid.appendChild(projectCard);
});
