// Experience Data
const experiences = [
    {
        title: "Pro Shop Manager",
        company: "Cal Poly Associated Students, Inc",
        period: "June 2024 - Present",
        description: "Lead a team of 19 student employees in daily operations and service delivery.",
        highlights: [
            "Manage/lead a team of 19 student employees",
            "Oversee scheduling, onboarding, and staff development",
            "Implement workflow optimizations",
            "Maintain high service standards",
            "Foster productive and customer-focused environment"
        ]
    },
    {
        title: "Pro Shop Attendant",
        company: "Cal Poly Associated Students, Inc",
        period: "May 2023 - September 2024",
        description: "Assisted in daily operations and customer service delivery.",
        highlights: [
            "Managed sales transactions",
            "Maintained and restocked inventory",
            "Provided excellent customer service",
            "Trained and guided new team members"
        ]
    },
    {
        title: "Security Guard",
        company: "Allied Universal",
        period: "May 2023 - October 2023",
        description: "Ensured facility security and safety through monitoring and patrol activities.",
        highlights: [
            "Monitored security cameras and conducted regular patrols",
            "Controlled entry points and verified identification",
            "Maintained detailed logs of visitors and employees",
            "Responded to emergencies and security issues",
            "Documented incidents and daily activities"
        ]
    },
    {
        title: "Front Desk Attendant",
        company: "LA Fitness",
        period: "May 2022 - September 2022",
        description: "Managed front desk operations and member services at a fitness facility.",
        highlights: [
            "Opened facility and prepared for daily operations",
            "Verified memberships and processed payments",
            "Handled customer inquiries and scheduling",
            "Maintained clean and organized facilities",
            "Managed administrative tasks"
        ]
    },
    {
        title: "Crew Member",
        company: "Pieology Pizzeria",
        period: "November 2021 - April 2022",
        description: "Provided customer service and food preparation in a fast-paced restaurant environment.",
        highlights: [
            "Assisted with food preparation",
            "Assembled customer orders",
            "Maintained clean work environment",
            "Collaborated with team members",
            "Ensured positive dining experience"
        ]
    },
    {
        title: "Lacrosse Coach",
        company: "Self-employed",
        period: "June 2019 - March 2022",
        description: "Provided personalized lacrosse training and coaching services.",
        highlights: [
            "Developed custom training programs",
            "Focused on skill development and game strategy",
            "Analyzed player techniques",
            "Provided mentorship to athletes",
            "Designed conditioning and improvement plans"
        ]
    }
];

// Function to create timeline entries
function createTimelineEntries() {
    const timeline = document.getElementById('timeline');
    
    experiences.forEach((exp, index) => {
        // Create container
        const container = document.createElement('div');
        container.className = `timeline-container ${index % 2 === 0 ? 'left' : 'right'}`;
        
        // Create content
        const content = document.createElement('div');
        content.className = 'content';
        
        // Create date
        const date = document.createElement('div');
        date.className = 'date';
        date.textContent = exp.period;
        
        // Create title
        const title = document.createElement('div');
        title.className = 'title';
        title.textContent = exp.title;
        
        // Create company
        const company = document.createElement('div');
        company.className = 'company';
        company.textContent = exp.company;
        
        // Create description
        const description = document.createElement('div');
        description.className = 'description';
        description.textContent = exp.description;
        
        // Create highlights list
        const highlights = document.createElement('ul');
        highlights.className = 'experience-highlights';
        highlights.style.marginTop = '1rem';
        highlights.style.paddingLeft = '1.5rem';
        exp.highlights.forEach(highlight => {
            const li = document.createElement('li');
            li.textContent = highlight;
            li.style.marginBottom = '0.5rem';
            highlights.appendChild(li);
        });
        
        // Assemble the content
        content.appendChild(date);
        content.appendChild(title);
        content.appendChild(company);
        content.appendChild(description);
        content.appendChild(highlights);
        
        // Add content to container
        container.appendChild(content);
        
        // Add container to timeline
        timeline.appendChild(container);
    });
}

// Initialize timeline when DOM is loaded
document.addEventListener('DOMContentLoaded', createTimelineEntries);
