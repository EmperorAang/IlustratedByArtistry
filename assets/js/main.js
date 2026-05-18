document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather icons first
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // AOS Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu button clicked');
            mobileMenu.classList.toggle('hidden');
        });
    } else {
        console.log('Mobile menu elements not found:', { mobileMenuButton, mobileMenu });
    }

    // Theme toggle functionality
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    const htmlEl = document.documentElement;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            htmlEl.classList.add('dark');
        } else {
            htmlEl.classList.remove('dark');
        }
        // Update all theme toggle icons
        updateThemeIcons(theme === 'dark');
    };

    const updateThemeIcons = (isDark) => {
        themeToggleBtns.forEach(btn => {
            const sunIcon = btn.querySelector('[data-feather="sun"]');
            const moonIcon = btn.querySelector('[data-feather="moon"]');
            if (sunIcon) {
                sunIcon.style.display = isDark ? 'block' : 'none';
                sunIcon.classList.toggle('hidden', !isDark);
                sunIcon.classList.toggle('dark:block', isDark);
            }
            if (moonIcon) {
                moonIcon.style.display = isDark ? 'none' : 'block';
                moonIcon.classList.toggle('hidden', isDark);
                moonIcon.classList.toggle('block', !isDark);
            }
        });
        // Re-initialize feather icons
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    };

    const toggleTheme = () => {
        const isDark = htmlEl.classList.toggle('dark');
        const newTheme = isDark ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        updateThemeIcons(isDark);
    };

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });

    // Apply saved theme on load
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
});