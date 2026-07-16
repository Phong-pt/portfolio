document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggle = document.getElementById('theme-toggle');
    const themeColor = document.querySelector('meta[name="theme-color"]');
    const year = document.getElementById('year');

    const getSavedTheme = () => {
        try {
            return localStorage.getItem('theme');
        } catch {
            return null;
        }
    };

    const saveTheme = (theme) => {
        try {
            localStorage.setItem('theme', theme);
        } catch {
            // The page remains usable when storage is unavailable.
        }
    };

    const applyTheme = (theme) => {
        const isLight = theme === 'light';
        body.classList.remove('dark-theme', 'light-theme');
        body.classList.add(isLight ? 'light-theme' : 'dark-theme');

        const nextTheme = isLight ? 'dark' : 'light';
        toggle.innerHTML = isLight
            ? '<i class="fa-solid fa-moon" aria-hidden="true"></i>'
            : '<i class="fa-solid fa-sun" aria-hidden="true"></i>';
        toggle.setAttribute('aria-label', `Switch to ${nextTheme} theme`);
        toggle.setAttribute('title', `Switch to ${nextTheme} theme`);
        themeColor?.setAttribute('content', isLight ? '#f7faff' : '#0a0a0b');
    };

    const savedTheme = getSavedTheme();
    applyTheme(savedTheme === 'dark' ? 'dark' : 'light');

    toggle.addEventListener('click', () => {
        const nextTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
        applyTheme(nextTheme);
        saveTheme(nextTheme);
    });

    if (year) {
        year.textContent = new Date().getFullYear();
    }
});
