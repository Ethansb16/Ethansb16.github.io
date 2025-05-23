// Main experience data 
const experiences = [
    {
        title: "IT Consultant",
        company: "SLO County Realty",
        period: "Feb 2025 - Present",
        description: "Provide technical support through help desk services, and extract valuable data from MLS systems to help agents make informed business decisions.",
        highlights: [
            "Register domains, set up email services, manage DNS settings, and ensure timely renewals",
            "Provide technical troubleshooting, resolve IT issues, offer training, and deliver remote/on-site support",
            "Extract insights from MLS systems, create automated reports, and develop dashboards to visualize sales metrics"
        ],
    },
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
            references: [  
        {
            name: "Nancy Clark",
            title: "Assistant Director -- Recreational Sports",
            contact: "Available upon request"
        },
        {
            name: "Keegan Draper",
            title: "Coordinator -- Recreational Sport",
            contact: "Available upon request"
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
                    references: [  
        {
            name: "Vincent Wai",
            title: "Student Manager -- Pro Shop",
            contact: "Available upon request"
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
                    references: [  
        {
            name: "Roberto Rojas",
            title: "Operational Manager -- LA Fitness",
            contact: "Available upon request"
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
            references: [  
        {
            name: "Frank Obiesie",
            title: "Head Coach -- Lakeridge Varsity Lacrosse",
            contact: "Available upon request"
        }
    ]
    }
]; 

// Separate notable achievements that can be placed anywhere
const notableAchievements = [
    {
        position: 1, // After first job entry
        title: "Leadership Development Program",
        date: "Summer 2024",
        description: "Completed intensive leadership training for student managers, focusing on team management and organizational development."
    },
    {
        position: 2, // After second job entry
        title: "Employee of the Month",
        date: "July 2023",
        description: "Recognized for exceptional customer service and team support."
    },
];

function createTimelineRow(exp, jobSide) {
    const row = document.createElement('div');
    row.className = 'timeline-row';
    
    // Create containers for both sides
    const leftContainer = document.createElement('div');
    leftContainer.className = 'timeline-container left';
    
    const rightContainer = document.createElement('div');
    rightContainer.className = 'timeline-container right';
    
    // Create the job content
    const jobContent = document.createElement('div');
    jobContent.className = 'content experience-entry';
    jobContent.innerHTML = `
        <div class="date">${exp.period}</div>
        <div class="title">${exp.title}</div>
        <div class="company">${exp.company}</div>
        <div class="description">${exp.description}</div>
        <ul class="highlights">
            ${exp.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
        </ul>
    `;
    
    // If there are references, create reference content
    if (exp.references && exp.references.length > 0) {
        const referencesContainer = document.createElement('div');
        referencesContainer.className = 'references-container';
        
        exp.references.forEach(ref => {
            const refContent = document.createElement('div');
            refContent.className = 'content reference-entry';
            refContent.innerHTML = `
                <div class="reference-tag">Reference</div>
                <div class="reference-name">${ref.name}</div>
                <div class="reference-title">${ref.title}</div>
                <div class="reference-contact">${ref.contact}</div>
            `;
            referencesContainer.appendChild(refContent);
        });
        
        // Place job and references on opposite sides
        if (jobSide === 'left') {
            leftContainer.appendChild(jobContent);
            rightContainer.appendChild(referencesContainer);
        } else {
            rightContainer.appendChild(jobContent);
            leftContainer.appendChild(referencesContainer);
        }
    } else {
        // If no references, just place the job content
        if (jobSide === 'left') {
            leftContainer.appendChild(jobContent);
        } else {
            rightContainer.appendChild(jobContent);
        }
    }
    
    row.appendChild(leftContainer);
    row.appendChild(rightContainer);
    return row;
}

// Helper function to create notable achievement entries
function createNotableEntry(notable, side) {
    const row = document.createElement('div');
    row.className = 'timeline-row';
    
    const leftContainer = document.createElement('div');
    leftContainer.className = 'timeline-container left';
    
    const rightContainer = document.createElement('div');
    rightContainer.className = 'timeline-container right';
    
    const content = document.createElement('div');
    content.className = 'content notable-entry';
    content.innerHTML = `
        <div class="notable-tag">Notable Achievement</div>
        <div class="notable-title">${notable.title}</div>
        <div class="notable-date">${notable.date}</div>
        <div class="notable-description">${notable.description}</div>
    `;
    
    if (side === 'left') {
        leftContainer.appendChild(content);
    } else {
        rightContainer.appendChild(content);
    }
    
    row.appendChild(leftContainer);
    row.appendChild(rightContainer);
    return row;
}

// Main function to create timeline entries
function createTimelineEntries() {
    const timeline = document.getElementById('timeline');
    let currentSide = 'left';
    let achievementIndex = 0;
    
    experiences.forEach((exp, index) => {
        // Create job entry with its reference (if any) as a single row
        const timelineRow = createTimelineRow(exp, currentSide);
        timeline.appendChild(timelineRow);
        
        // Add any notable achievements that should appear after this job
        while (achievementIndex < notableAchievements.length && 
               notableAchievements[achievementIndex].position === index + 1) {
            const achievement = notableAchievements[achievementIndex];
            const achievementContainer = createNotableEntry(achievement, 
                currentSide === 'left' ? 'right' : 'left');
            timeline.appendChild(achievementContainer);
            achievementIndex++;
        }
        
        // Switch sides for next entry
        currentSide = currentSide === 'left' ? 'right' : 'left';
    });
}

// Initialize timeline when DOM is loaded
document.addEventListener('DOMContentLoaded', createTimelineEntries);
