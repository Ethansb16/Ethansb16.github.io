// Experience Data with associated references and notable experiences
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
        ],
        reference: {
            name: "John Smith",
            title: "Pro Shop Director",
            contact: "Available upon request"
        },
        notableExperiences: [
            {
                title: "Leadership Development Program",
                date: "Summer 2024",
                description: "Completed intensive leadership training for student managers, focusing on team management and organizational development."
            }
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
        ],
        notableExperiences: [
            {
                title: "Employee of the Month",
                date: "July 2023",
                description: "Recognized for exceptional customer service and team support."
            }
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
        ],
        reference: {
            name: "Jane Doe",
            title: "Security Operations Manager",
            contact: "Available upon request"
        }
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
        ],
        notableExperiences: [
            {
                title: "Service Excellence Recognition",
                date: "August 2022",
                description: "Received recognition for outstanding member service and operational efficiency."
            }
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
        ],
        notableExperiences: [
            {
                title: "Youth Development Award",
                date: "Spring 2021",
                description: "Recognized by local sports community for excellence in youth athlete development."
            }
        ]
    }
];

// Helper function to create main experience entries
function createExperienceEntry(exp, side) {
    const container = document.createElement('div');
    container.className = `timeline-container ${side}`;
    
    const content = document.createElement('div');
    content.className = 'content experience-entry';
    
    content.innerHTML = `
        <div class="date">${exp.period}</div>
        <div class="title">${exp.title}</div>
        <div class="company">${exp.company}</div>
        <div class="description">${exp.description}</div>
        <ul class="highlights">
            ${exp.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
        </ul>
    `;
    
    container.appendChild(content);
    return container;
}

// Helper function to create reference entries
function createReferenceEntry(ref, side) {
    const container = document.createElement('div');
    container.className = `timeline-container ${side}`;
    
    const content = document.createElement('div');
    content.className = 'content reference-entry';
    
    content.innerHTML = `
        <div class="reference-tag">Reference</div>
        <div class="reference-name">${ref.name}</div>
        <div class="reference-title">${ref.title}</div>
        <div class="reference-contact">${ref.contact}</div>
    `;
    
    container.appendChild(content);
    return container;
}

// Helper function to create notable experience entries
function createNotableEntry(notable, side) {
    const container = document.createElement('div');
    container.className = `timeline-container ${side}`;
    
    const content = document.createElement('div');
    content.className = 'content notable-entry';
    
    content.innerHTML = `
        <div class="notable-tag">Notable Achievement</div>
        <div class="notable-title">${notable.title}</div>
        <div class="notable-date">${notable.date}</div>
        <div class="notable-description">${notable.description}</div>
    `;
    
    container.appendChild(content);
    return container;
}

// Main function to create timeline entries
function createTimelineEntries() {
    const timeline = document.getElementById('timeline');
    let currentSide = 'left'; // Track current side for main entries
    
    experiences.forEach((exp) => {
        // Create main experience entry
        const expContainer = createExperienceEntry(exp, currentSide);
        timeline.appendChild(expContainer);
        
        // Create reference or notable experience on the opposite side if available
        const oppositeSide = currentSide === 'left' ? 'right' : 'left';
        
        if (exp.reference) {
            const refContainer = createReferenceEntry(exp.reference, oppositeSide);
            timeline.appendChild(refContainer);
        }
        
        if (exp.notableExperiences) {
            exp.notableExperiences.forEach(notable => {
                const notableContainer = createNotableEntry(notable, oppositeSide);
                timeline.appendChild(notableContainer);
            });
        }
        
        // Switch sides for next main entry
        currentSide = oppositeSide;
    });
}

// Initialize timeline when DOM is loaded
document.addEventListener('DOMContentLoaded', createTimelineEntries);
