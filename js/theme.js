// Theme toggle — dark is the default (no attribute = dark)
(function () {
    const toggle   = document.querySelector('.theme-toggle');
    const icon     = toggle ? toggle.querySelector('i') : null;
    const saved    = localStorage.getItem('theme') || 'dark';

    // Apply saved preference on load
    if (saved === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (icon) { icon.classList.replace('fa-sun', 'fa-moon'); }
    }
    // dark is default — no attribute needed

    if (!toggle) return;

    toggle.addEventListener('click', () => {
        const current  = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'light' ? 'dark' : 'light';

        if (newTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }

        localStorage.setItem('theme', newTheme);

        if (icon) {
            icon.classList.toggle('fa-sun');
            icon.classList.toggle('fa-moon');
        }
    });
})();
