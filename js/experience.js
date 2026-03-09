// =============================================
//  EXPERIENCE DATA
//  NOTE: Update PG&E entries with your actual
//  titles, dates, and bullet points from LinkedIn
// =============================================

const experiences = [
    // ─── PG&E ───────────────────────────────────
    {
        title: "IT/Cybersecurity Analyst",          // ← Update with actual title from LinkedIn
        company: "Pacific Gas and Electric (PG&E)",
        period: "Sep 2025 - Present",               // ← Update with actual start date
        description: "Supporting cybersecurity and IT operations for critical energy infrastructure at one of the nation's largest utilities.",
        highlights: [
            "Monitor and analyze security events across enterprise IT/OT environments",
            "Support vulnerability assessment processes and security posture reporting",
            "Collaborate with cross-functional teams on network security initiatives",
            "Assist in documentation and implementation of security policies and procedures"
            // ← Replace with your actual responsibilities from LinkedIn
        ]
    },
    {
        title: "Cybersecurity Intern",              // ← Update if title differs
        company: "Pacific Gas and Electric (PG&E)",
        period: "Jun 2025 - Aug 2025",              // ← Update with actual dates
        description: "Completed a hands-on cybersecurity internship supporting IT security operations at a Fortune 500 energy company.",
        highlights: [
            "Assisted security operations team with threat monitoring and incident triage",
            "Performed network traffic analysis and security event correlation",
            "Contributed to security assessment documentation and risk reporting",
            "Gained exposure to industrial control system (ICS/SCADA) security practices"
            // ← Replace with your actual responsibilities from LinkedIn
        ]
    },

    // ─── Existing experience ─────────────────────
    {
        title: "IT Consultant",
        company: "SLO County Realty",
        period: "Feb 2025 - Present",
        description: "Provide technical support through help desk services, and extract valuable data from MLS systems to help agents make informed business decisions.",
        highlights: [
            "Register domains, set up email services, manage DNS settings, and ensure timely renewals",
            "Provide technical troubleshooting, resolve IT issues, offer training, and deliver remote/on-site support",
            "Extract insights from MLS systems, create automated reports, and develop dashboards to visualize sales metrics"
        ]
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
                title: "Assistant Director — Recreational Sports",
                contact: "Available upon request"
            },
            {
                name: "Keegan Draper",
                title: "Coordinator — Recreational Sports",
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
                title: "Student Manager — Pro Shop",
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
        ],
        references: [
            {
                name: "Roberto Rojas",
                title: "Operational Manager — LA Fitness",
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
                title: "Head Coach — Lakeridge Varsity Lacrosse",
                contact: "Available upon request"
            }
        ]
    }
];

// Notable achievements
const notableAchievements = [
    {
        position: 3, // After Pro Shop Manager entry
        title: "Leadership Development Program",
        date: "Summer 2024",
        description: "Completed intensive leadership training for student managers, focusing on team management and organizational development."
    },
    {
        position: 4, // After Pro Shop Attendant entry
        title: "Employee of the Month",
        date: "July 2023",
        description: "Recognized for exceptional customer service and team support."
    }
];

// ─── Timeline builders ───────────────────────

function createTimelineRow(exp, jobSide) {
    const row = document.createElement('div');
    row.className = 'timeline-row';

    const leftContainer  = document.createElement('div');
    leftContainer.className  = 'timeline-container left';

    const rightContainer = document.createElement('div');
    rightContainer.className = 'timeline-container right';

    // Job card
    const jobContent = document.createElement('div');
    jobContent.className = 'content experience-entry';
    jobContent.innerHTML = `
        <div class="date">${exp.period}</div>
        <div class="title">${exp.title}</div>
        <div class="company">${exp.company}</div>
        <div class="description">${exp.description}</div>
        <ul class="highlights">
            ${exp.highlights.map(h => `<li>${h}</li>`).join('')}
        </ul>
    `;

    // Dot
    const dot = document.createElement('div');
    dot.className = 'timeline-dot';

    if (exp.references && exp.references.length > 0) {
        const refWrap = document.createElement('div');
        refWrap.className = 'references-container';

        exp.references.forEach(ref => {
            const refCard = document.createElement('div');
            refCard.className = 'content reference-entry';
            refCard.innerHTML = `
                <div class="reference-tag">Reference</div>
                <div class="reference-name">${ref.name}</div>
                <div class="reference-title">${ref.title}</div>
                <div class="reference-contact">${ref.contact}</div>
            `;
            refWrap.appendChild(refCard);
        });

        if (jobSide === 'left') {
            leftContainer.appendChild(jobContent);
            leftContainer.appendChild(dot);
            rightContainer.appendChild(refWrap);
        } else {
            rightContainer.appendChild(jobContent);
            rightContainer.appendChild(dot);
            leftContainer.appendChild(refWrap);
        }
    } else {
        if (jobSide === 'left') {
            leftContainer.appendChild(jobContent);
            leftContainer.appendChild(dot);
        } else {
            rightContainer.appendChild(jobContent);
            rightContainer.appendChild(dot);
        }
    }

    row.appendChild(leftContainer);
    row.appendChild(rightContainer);
    return row;
}

function createNotableEntry(notable, side) {
    const row = document.createElement('div');
    row.className = 'timeline-row';

    const left  = document.createElement('div');
    left.className  = 'timeline-container left';

    const right = document.createElement('div');
    right.className = 'timeline-container right';

    const card = document.createElement('div');
    card.className = 'content notable-entry';
    card.innerHTML = `
        <div class="notable-tag">Notable Achievement</div>
        <div class="notable-title">${notable.title}</div>
        <div class="notable-date">${notable.date}</div>
        <div class="notable-description">${notable.description}</div>
    `;

    const dot = document.createElement('div');
    dot.className = 'timeline-dot';

    if (side === 'left') {
        left.appendChild(card);
        left.appendChild(dot);
    } else {
        right.appendChild(card);
        right.appendChild(dot);
    }

    row.appendChild(left);
    row.appendChild(right);
    return row;
}

function createTimelineEntries() {
    const timeline = document.getElementById('timeline');
    if (!timeline) return;

    let side = 'left';
    let achIdx = 0;

    experiences.forEach((exp, i) => {
        timeline.appendChild(createTimelineRow(exp, side));

        while (achIdx < notableAchievements.length &&
               notableAchievements[achIdx].position === i + 1) {
            const ach = notableAchievements[achIdx];
            timeline.appendChild(createNotableEntry(ach, side === 'left' ? 'right' : 'left'));
            achIdx++;
        }

        side = side === 'left' ? 'right' : 'left';
    });
}

document.addEventListener('DOMContentLoaded', createTimelineEntries);
