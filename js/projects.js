// Projects Data
const projects = [
    {
        title: "TCP Server Construction",
        description: "Built a multithreaded TCP server to handle HTTP requests and execute cgi-bin operations",
        technologies: ["C", "TCP/IP", "Threading"],
        link: "https://github.com/Ethansb16/TCP-Server-C"
    },
    {
        title: "Web Application Development",
        description: "Full-stack event planning application with Next.js and Prisma",
        technologies: ["TypeScript", "Next.js", "Prisma"],
        link: "https://github.com/CSC307Fall2024/Plus"
    },
    {
        title: "Database Engineering",
        description: "MySQL database with Python integration and custom terminal interface",
        technologies: ["Python", "MySQL", "CLI"],
        link: "https://github.com/Ethansb16/MySQL-Python-Database-Integration"
    }
];

// Populate Projects
const projectsGrid = document.querySelector('.projects-grid');
projects.forEach(project => {
    const projectCard = document.createElement('div');
    projectCard.className = 'project-card';
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
    projectsGrid.appendChild(projectCard);
});
