// Skills data
const skills = [
    { name: "Python",       level: 80 },
    { name: "Java",         level: 65 },
    { name: "SQL",          level: 80 },
    { name: "C",            level: 65 },
    { name: "React",        level: 60 },
    { name: "TypeScript",   level: 60 },
    { name: "Prisma",       level: 85 },
    { name: "RISC-V",       level: 70 },
    { name: "Racket",       level: 80 },
    { name: "Linux",        level: 70 },
    { name: "SIEM",         level: 50 }
];

// Render skill bars — width animated via IntersectionObserver in animations.js
const skillsGrid = document.querySelector('.skills-grid');
if (skillsGrid) {
    skills.forEach(skill => {
        const bar = document.createElement('div');
        bar.className = 'skill-bar';
        bar.innerHTML = `
            <div>
                <span>${skill.name}</span>
                <span>${skill.level}%</span>
            </div>
            <div class="skill-progress">
                <div class="skill-fill" data-width="${skill.level}"></div>
            </div>
        `;
        skillsGrid.appendChild(bar);
    });
}
