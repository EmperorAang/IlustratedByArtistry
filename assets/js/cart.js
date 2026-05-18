// --- Universal Cart Script ---
document.addEventListener('DOMContentLoaded', () => {
    const cartCountIcon = document.querySelector('.cart-count');
    let sessionStatus = { loggedIn: false, userId: null };

    // Check session status first
    fetch('api/session_status.html')
        .then(response => response.json())
        .then(data => {
            sessionStatus = data;
            initializeCart();
        })
        .catch(() => {
            // If session check fails, proceed as a logged-out user
            initializeCart();
        });

    async function getCart() {
        if (sessionStatus.loggedIn) {
            try {
                const response = await fetch('api/cart.html');
                const data = await response.json();
                return data.success ? (data.cart || []) : [];
            } catch (e) {
                console.error("Error fetching cart from server", e);
                return getLocalCart(); // Fallback to local
            }
        } else {
            return getLocalCart();
        }
    }

    function getLocalCart() {
        const cartData = localStorage.getItem('cart');
        if (!cartData) return [];
        try {
            const cart = JSON.parse(cartData);
            return cart.map(item => ({
                ...item,
                id: parseInt(item.id, 10),
                price: parseFloat(item.price),
                quantity: parseInt(item.quantity, 10)
            })).filter(item => !isNaN(item.id) && !isNaN(item.price) && !isNaN(item.quantity));
        } catch (e) {
            console.error("Error parsing cart data from localStorage", e);
            return [];
        }
    }

    async function saveCart(cart) {
        if (sessionStatus.loggedIn) {
            try {
                await fetch('api/cart.html', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cart: cart })
                });
            } catch (e) {
                console.error("Error saving cart to server", e);
                // Optional: handle offline mode
            }
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
        await updateCartCount();
    }

    async function updateCartCount() {
        const cart = await getCart();
        const count = cart.reduce((sum, item) => sum + item.quantity, 0);
        const cartCountIcons = document.querySelectorAll('.cart-count');
        cartCountIcons.forEach(icon => {
            icon.textContent = count;
            icon.classList.toggle('hidden', count === 0);
        });
    }

    async function addToCart(product) {
        let cart = await getCart();
        const productId = parseInt(String(product.id).replace('product_', ''), 10);
        
        if (isNaN(productId)) {
            console.error('Invalid product ID:', product.id);
            return;
        }
        
        const existingProductIndex = cart.findIndex(item => item.id === productId);

        if (existingProductIndex > -1) {
            cart[existingProductIndex].quantity++;
        } else {
            cart.push({
                id: productId,
                name: product.name,
                price: parseFloat(product.price),
                image: product.image,
                type: 'product',
                quantity: 1
            });
        }
        await saveCart(cart);
        alert(`${product.name} has been added to your cart.`);
    }

    async function initializeCart() {
        if (sessionStatus.loggedIn) {
            const localCart = getLocalCart();
            if (localCart.length > 0) {
                // This is a logged-in user with a guest cart.
                // We need to merge it with their server-side cart.
                console.log('Logged in user has a local cart. Merging with server cart.');
                let serverCart = await getCart(); // Fetches the current server cart

                // Create a map for quick lookups of server cart items
                const serverCartMap = new Map(serverCart.map(item => [item.id + '-' + item.type, item]));

                localCart.forEach(localItem => {
                    const key = localItem.id + '-' + localItem.type;
                    if (serverCartMap.has(key)) {
                        // Item exists on server, update quantity
                        serverCartMap.get(key).quantity += localItem.quantity;
                    } else {
                        // Item does not exist on server, add it to the map
                        serverCartMap.set(key, localItem);
                    }
                });

                // Convert map back to array
                const mergedCart = Array.from(serverCartMap.values());
                
                await saveCart(mergedCart); // Save the newly merged cart to the server
                
                // IMPORTANT: Clear the local cart ONLY after a successful merge and save.
                localStorage.removeItem('cart'); 
                console.log('Local cart merged and cleared.');
            }
        }
        await updateCartCount();
        
        // Dispatch a custom event to notify that the cart is ready
        document.dispatchEvent(new CustomEvent('cartInitialized'));
    }

    async function logout() {
        // Clear the local storage cart representation
        localStorage.removeItem('cart');
        // Redirect to the logout script
        window.location.href = 'api/logout.html';
    }

    window.cart = {
        get: getCart,
        save: saveCart,
        add: addToCart,
        updateCount: updateCartCount,
        isLoggedIn: () => sessionStatus.loggedIn,
        logout: logout
    };
});
