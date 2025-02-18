// Theme Toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Toggle icon
    themeIcon.classList.toggle('fa-moon');
    themeIcon.classList.toggle('fa-sun');
});

# js/data.js
// Projects Data
const projects = [
    {
        title: "TCP Server Construction",
        description: "Built a multithreaded TCP server to handle HTTP requests and execute cgi-bin operations",
        features: [
            "Multithreaded request handling",
            "HTTP protocol implementation",
            "CGI-bin execution support"
        ],
        technologies: ["C", "TCP/IP", "Threading"],
        link: "https://github.com/Ethansb16/TCP-Server-C"
    },
    // Add more projects...
];

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
    },
    // Add more experiences...
];
