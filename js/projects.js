// Populate Projects
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
