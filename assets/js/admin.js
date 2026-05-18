feather.replace();

document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
    const htmlEl = document.documentElement;

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            htmlEl.classList.add('dark');
        } else {
            htmlEl.classList.remove('dark');
        }
        updateThemeIcons(theme === 'dark');
    };

    const updateThemeIcons = (isDark) => {
        document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
            const sunIcon = btn.querySelector('[data-feather="sun"]');
            const moonIcon = btn.querySelector('[data-feather="moon"]');
            if (sunIcon) sunIcon.style.display = isDark ? 'block' : 'none';
            if (moonIcon) moonIcon.style.display = isDark ? 'none' : 'block';
        });
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

    // Apply theme on initial load
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const closeSidebarBtn = document.getElementById('close-sidebar-btn');

    const openSidebar = () => {
        if (sidebar && sidebarOverlay) {
            sidebar.classList.remove('-translate-x-full');
            sidebarOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden'; // Prevent scrolling when sidebar is open
        }
    };

    const closeSidebar = () => {
        if (sidebar && sidebarOverlay) {
            sidebar.classList.add('-translate-x-full');
            sidebarOverlay.classList.add('hidden');
            document.body.style.overflow = ''; // Restore scrolling
        }
    };

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', openSidebar);
    }

    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', closeSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Highlight active sidebar link and close sidebar when clicking on mobile
    const currentPage = window.location.pathname.split('/').pop();
    const sidebarLinks = document.querySelectorAll('#sidebar nav a');

    sidebarLinks.forEach(link => {
        // Highlight active page
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('bg-gold', 'text-black');
            link.classList.remove('text-gray-600', 'dark:text-gray-300', 'hover:bg-gray-100', 'dark:hover:bg-gray-700');
            const icon = link.querySelector('i');
            if(icon) {
                icon.classList.add('text-black');
            }
        }
        
        // Close sidebar on mobile when clicking any link
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) { // lg breakpoint
                closeSidebar();
            }
        });
    });
});
