// Experience Data
const experiences = [
    {
        title: "Network Security Intern",
        company: "Example Company",
        period: "June 2023 - Present",
        description: "Working on network security implementations and monitoring.",
        highlights: [
            "Implemented security protocols",
            "Monitored network traffic",
            "Developed security documentation"
        ]
    }
    // Add more experiences as needed
];

// Populate Experience
const experienceGrid = document.querySelector('.experience-grid');
experiences.forEach(exp => {
    const expEntry = document.createElement('div');
    expEntry.className = 'project-card';
    expEntry.innerHTML = `
        <div class="experience-header">
            <h3>${exp.title}</h3>
            <span class="experience-date">${exp.period}</span>
        </div>
        <h4>${exp.company}</h4>
        <p>${exp.description}</p>
        <ul class="experience-details">
            ${exp.highlights.map(highlight => 
                `<li>${highlight}</li>`
            ).join('')}
        </ul>
    `;
    experienceGrid.appendChild(expEntry);
});
