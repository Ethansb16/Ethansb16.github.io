// Automation projects data & renderer

const automations = [
    {
        id: 'trading-bot',
        icon: 'fa-chart-line',
        label: 'Algo Trading',
        title: 'Automated Futures Trading Bot',
        description: 'A fully automated trading system that monitors TradingView strategy alerts 24/7 and executes futures trades via NinjaTrader — with zero manual intervention required.',
        details: [
            'TradingView strategy fires a webhook on signal',
            'Webhook is received by an ngrok tunnel forwarding to localhost',
            'Python bot validates and parses the incoming payload',
            'Trade logic executes directly against NinjaTrader\'s servers',
            'Runs continuously in VSCode — no scheduled downtime'
        ],
        technologies: ['Python', 'NinjaTrader', 'TradingView', 'Webhooks', 'ngrok', 'REST API', 'Algo Trading'],
        pipeline: [
            { icon: 'fa-chart-bar', label: 'TradingView' },
            { icon: 'fa-bolt', label: 'Webhook Alert' },
            { icon: 'fa-network-wired', label: 'ngrok Tunnel' },
            { icon: 'fa-python', label: 'Python Bot' },
            { icon: 'fa-exchange-alt', label: 'NinjaTrader' }
        ]
    },
    {
        id: 'email-automation',
        icon: 'fa-envelope-open-text',
        label: 'Workflow Automation',
        title: 'Innusoft Fusion Email Automation',
        description: 'Automated the Pro Shop\'s equipment return process by scripting Innusoft Fusion to automatically email participants who had outstanding rental equipment — eliminating a daily manual task for staff.',
        details: [
            'Identified repetitive daily staff task: manually emailing overdue equipment holders',
            'Built automation within Innusoft Fusion\'s email system to trigger on outstanding equipment records',
            'Automated emails sent to participants with clear return instructions',
            'Reduced daily manual follow-up work by ~10 minutes per day for staff',
            'Improved equipment return rates and operational consistency'
        ],
        technologies: ['Innusoft Fusion', 'Email Automation', 'Workflow Design', 'Process Optimization'],
        stat: { value: '10 min/day', label: 'Saved per shift' }
    }
];

function buildPipeline(steps) {
    return `
        <div class="automation-pipeline">
            ${steps.map((step, i) => `
                <div class="pipeline-step">
                    <div class="pipeline-icon"><i class="fas ${step.icon}"></i></div>
                    <div class="pipeline-label">${step.label}</div>
                </div>
                ${i < steps.length - 1 ? '<div class="pipeline-arrow"><i class="fas fa-arrow-right"></i></div>' : ''}
            `).join('')}
        </div>
    `;
}

function buildAutomationCard(auto) {
    const pipelineHTML = auto.pipeline ? buildPipeline(auto.pipeline) : '';
    const statHTML = auto.stat ? `
        <div class="automation-stat">
            <div class="automation-stat-value">${auto.stat.value}</div>
            <div class="automation-stat-label">${auto.stat.label}</div>
        </div>
    ` : '';

    return `
        <div class="automation-card" id="${auto.id}">
            <div class="automation-card-header">
                <div class="automation-icon-wrap">
                    <i class="fas ${auto.icon}"></i>
                </div>
                <div>
                    <span class="automation-label">${auto.label}</span>
                    <h3 class="automation-title">${auto.title}</h3>
                </div>
            </div>

            <p class="automation-description">${auto.description}</p>

            ${pipelineHTML}

            <ul class="automation-details">
                ${auto.details.map(d => `<li><i class="fas fa-terminal"></i><span>${d}</span></li>`).join('')}
            </ul>

            ${statHTML}

            <div class="tech-tags">
                ${auto.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('automation-container');
    if (!container) return;
    container.innerHTML = automations.map(buildAutomationCard).join('');
});
