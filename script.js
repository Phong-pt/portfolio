document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeText = document.getElementById('theme-text');

    // Check for saved theme preference (shared with blog via localStorage)
    const savedTheme = localStorage.getItem('theme') || 'silver-dark';

    function applyTheme(theme) {
        if (theme === 'silver-light') {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            themeText.textContent = 'silver-light';
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            themeText.textContent = 'silver-dark';
            themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    }

    applyTheme(savedTheme);

    // Toggle theme with smooth icon transition
    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-theme');
        const newTheme = isDark ? 'silver-light' : 'silver-dark';

        // Add a subtle rotation animation
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 400);

        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Intersection Observer for reveal-on-scroll animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(item);
    });
});
