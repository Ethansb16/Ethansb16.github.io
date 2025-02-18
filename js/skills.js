// Skills Data
const skills = [
    { name: "Python", level: 75 },
    { name: "Java", level: 65 },
    { name: "SQL", level: 80 },
    { name: "C", level: 55 },
    { name: "React", level: 60 },
    { name: "TypeScript", level: 60 },
    { name: "Prisma", level: 85 },
    { name: "RISC-V", level: 70 },
    { name: "Racket", level: 80 },
    { name: "Linux", level: 70 },
    { name: "SIEM", level: 50 }
];

// Populate Skills
const skillsGrid = document.querySelector('.skills-grid');
skills.forEach(skill => {
    const skillBar = document.createElement('div');
    skillBar.className = 'skill-bar';
    skillBar.innerHTML = `
        <div style="display: flex; justify-content: space-between">
            <span>${skill.name}</span>
            <span>${skill.level}%</span>
        </div>
        <div class="skill-progress">
            <div class="skill-fill" style="width: ${skill.level}%"></div>
        </div>
    `;
    skillsGrid.appendChild(skillBar);
});
