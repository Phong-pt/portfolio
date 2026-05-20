document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.getElementById('theme-toggle');
    const body = document.body;
    const saved = localStorage.getItem('theme') || 'dark';

    function applyTheme(t) {
        body.classList.remove('dark-theme', 'light-theme');
        body.classList.add(t === 'light' ? 'light-theme' : 'dark-theme');
        toggle.innerHTML = t === 'light'
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';
    }

    applyTheme(saved);

    toggle.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-theme');
        const next = isDark ? 'light' : 'dark';
        toggle.style.transform = 'rotate(360deg)';
        setTimeout(() => toggle.style.transform = '', 400);
        applyTheme(next);
        localStorage.setItem('theme', next);
    });

    // Intersection Observer — reveal tiles on scroll
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.exp-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        el.style.transition = 'opacity 0.5s, transform 0.5s';
        obs.observe(el);
    });
});
