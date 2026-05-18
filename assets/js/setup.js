// Shared setup and utilities for Illuminated By Artistry

// Authentication and session management
const AuthManager = {
    // Check if user is logged in
    isLoggedIn() {
        return !!localStorage.getItem('user_id');
    },
    
    // Check if user is admin
    isAdmin() {
        return localStorage.getItem('user_role') === 'admin';
    },
    
    // Get current user data
    getCurrentUser() {
        try {
            const userData = localStorage.getItem('user_data');
            return userData ? JSON.parse(userData) : null;
        } catch(e) {
            console.error('Error parsing user data:', e);
            return null;
        }
    },
    
    // Login user (demo/client-side)
    login(email, password) {
        // Demo admin credentials
        if (email === 'admin@artistry.com' && password === 'admin123') {
            const userData = {
                id: '1',
                email: email,
                name: 'Admin',
                role: 'admin'
            };
            localStorage.setItem('user_id', userData.id);
            localStorage.setItem('user_role', userData.role);
            localStorage.setItem('user_data', JSON.stringify(userData));
            return true;
        }
        
        // Regular user login (demo)
        const userData = {
            id: Date.now().toString(),
            email: email,
            name: email.split('@')[0],
            role: 'user'
        };
        localStorage.setItem('user_id', userData.id);
        localStorage.setItem('user_role', userData.role);
        localStorage.setItem('user_data', JSON.stringify(userData));
        return true;
    },
    
    // Logout user
    logout() {
        localStorage.removeItem('user_id');
        localStorage.removeItem('user_role');
        localStorage.removeItem('user_data');
    },
    
    // Redirect to login if not authenticated
    requireLogin(redirectTo = '../user/login_page.html') {
        if (!this.isLoggedIn()) {
            window.location.href = redirectTo;
            return false;
        }
        return true;
    },
    
    // Redirect to admin if not admin
    requireAdmin(redirectTo = '../user/index.html') {
        if (!this.isAdmin()) {
            window.location.href = redirectTo;
            return false;
        }
        return true;
    }
};

// Data loading utilities
const DataManager = {
    // Fetch JSON data
    async fetchData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch(error) {
            console.error('Error fetching data:', error);
            return null;
        }
    },
    
    // Load artists
    async loadArtists() {
        return await this.fetchData('../data/site-data/artists.json');
    },
    
    // Load products
    async loadProducts() {
        return await this.fetchData('../data/site-data/products.json');
    },
    
    // Load services
    async loadServices() {
        return await this.fetchData('../data/site-data/services.json');
    }
};

// Session storage utilities
const SessionStorage = {
    // Add item to cart
    addToCart(item) {
        let cart = this.getCart();
        const existingItem = cart.find(i => i.id === item.id);
        
        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 1) + (item.quantity || 1);
        } else {
            item.quantity = item.quantity || 1;
            cart.push(item);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        return cart;
    },
    
    // Get cart
    getCart() {
        try {
            const cart = localStorage.getItem('cart');
            return cart ? JSON.parse(cart) : [];
        } catch(e) {
            return [];
        }
    },
    
    // Remove from cart
    removeFromCart(itemId) {
        let cart = this.getCart();
        cart = cart.filter(i => i.id !== itemId);
        localStorage.setItem('cart', JSON.stringify(cart));
        return cart;
    },
    
    // Clear cart
    clearCart() {
        localStorage.removeItem('cart');
    },
    
    // Update cart quantity
    updateQuantity(itemId, quantity) {
        let cart = this.getCart();
        const item = cart.find(i => i.id === itemId);
        
        if (item) {
            if (quantity <= 0) {
                return this.removeFromCart(itemId);
            }
            item.quantity = quantity;
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        return cart;
    },
    
    // Get cart total
    getCartTotal() {
        const cart = this.getCart();
        return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
    }
};

// DOM utilities
const DOMUtils = {
    // Toggle theme
    toggleTheme() {
        const html = document.documentElement;
        if (html.classList.contains('dark')) {
            html.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        } else {
            html.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        }
    },
    
    // Load saved theme
    loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    },
    
    // Setup theme toggle button
    setupThemeToggle(buttonId = 'theme-toggle') {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('click', () => this.toggleTheme());
        }
    }
};

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', () => {
    DOMUtils.loadTheme();
});
