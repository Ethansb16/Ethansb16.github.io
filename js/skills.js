// Skills Data
const skills = [
    { name: "Python", level: 90 },
    { name: "Java", level: 85 },
    { name: "SQL", level: 80 },
    { name: "React", level: 75 },
    { name: "TypeScript", level: 70 }
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
