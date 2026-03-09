// Skills — category-based display
const skillCategories = [
    {
        icon: 'fa-code',
        label: 'Languages',
        skills: ['Python', 'Java', 'C', 'SQL', 'TypeScript', 'Racket', 'RISC-V Assembly']
    },
    {
        icon: 'fa-layer-group',
        label: 'Frameworks & Tools',
        skills: ['React', 'Next.js', 'Prisma', 'MySQL', 'Node.js', 'Git']
    },
    {
        icon: 'fa-shield-halved',
        label: 'Cybersecurity',
        skills: ['SIEM', 'SCADA / ICS', 'Network Security', 'Cryptography', 'Wireless Security', 'Incident Response', 'Vulnerability Assessment']
    },
    {
        icon: 'fa-server',
        label: 'Systems & Infrastructure',
        skills: ['Linux', 'TCP / IP', 'DNS', 'Networking', 'Critical Infrastructure']
    }
];

const container = document.querySelector('.skill-categories');
if (container) {
    skillCategories.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'skill-category';
        card.innerHTML = `
            <div class="skill-category-header">
                <i class="fas ${cat.icon}"></i>
                <span>${cat.label}</span>
            </div>
            <div class="skill-pills">
                ${cat.skills.map(s => `<span class="skill-pill">${s}</span>`).join('')}
            </div>
        `;
        container.appendChild(card);
    });
}
