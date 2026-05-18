// --- Theme Toggle Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
    const htmlEl = document.documentElement;

    // Function to update the theme based on localStorage
    const updateTheme = () => {
        const theme = localStorage.getItem('theme');
        if (theme === 'dark') {
            htmlEl.classList.add('dark');
        } else {
            htmlEl.classList.remove('dark');
        }
        // Update icons on all toggle buttons
        themeToggleButtons.forEach(button => {
            const sunIcon = button.querySelector('[data-feather="sun"]');
            const moonIcon = button.querySelector('[data-feather="moon"]');
            if (sunIcon && moonIcon) {
                if (htmlEl.classList.contains('dark')) {
                    sunIcon.style.display = 'block';
                    moonIcon.style.display = 'none';
                } else {
                    sunIcon.style.display = 'none';
                    moonIcon.style.display = 'block';
                }
            }
        });
    };

    // Function to handle the click event
    const toggleTheme = () => {
        if (htmlEl.classList.contains('dark')) {
            localStorage.setItem('theme', 'light');
        } else {
            localStorage.setItem('theme', 'dark');
        }
        updateTheme();
    };

    // Add event listeners to all theme toggle buttons
    themeToggleButtons.forEach(button => {
        button.addEventListener('click', toggleTheme);
    });

    // Set initial theme on page load
    updateTheme();
});
