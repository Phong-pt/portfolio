document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const toggle = document.getElementById('theme-toggle');
    const themeColor = document.querySelector('meta[name="theme-color"]');
    const year = document.getElementById('year');

    const getCookie = (name) => {
        const prefix = `${name}=`;
        return document.cookie.split(';').map((item) => item.trim()).reduce((value, item) => {
            if (value || !item.startsWith(prefix)) return value;
            return decodeURIComponent(item.slice(prefix.length));
        }, '');
    };

    const getSavedTheme = () => {
        const sharedTheme = getCookie('phongpt-theme');
        if (sharedTheme === 'light' || sharedTheme === 'dark') return sharedTheme;

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

        let cookie = `phongpt-theme=${encodeURIComponent(theme)}; path=/; max-age=31536000; SameSite=Lax`;
        const host = window.location.hostname;
        if (host === 'phongpt.com' || host.endsWith('.phongpt.com')) {
            cookie += '; domain=.phongpt.com';
        }
        if (window.location.protocol === 'https:') {
            cookie += '; Secure';
        }
        document.cookie = cookie;
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
