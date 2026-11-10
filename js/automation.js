// Automation data (content only — rendered by js/animations.js)

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
            { icon: 'fas fa-chart-bar', label: 'TradingView' },
            { icon: 'fas fa-bolt', label: 'Webhook Alert' },
            { icon: 'fas fa-network-wired', label: 'ngrok Tunnel' },
            { icon: 'fab fa-python', label: 'Python Bot' },
            { icon: 'fas fa-exchange-alt', label: 'NinjaTrader' }
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
