document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartSummary = document.getElementById('cart-summary');
    const emptyCartMessage = document.getElementById('empty-cart');
    const subtotalEl = document.getElementById('cart-subtotal');
    const taxesEl = document.getElementById('cart-taxes');
    const totalEl = document.getElementById('cart-total');
    const checkoutButton = document.getElementById('checkout-button');

    async function renderCart() {
        if (!window.cart) {
            console.error("Cart module not loaded");
            return;
        }
        console.log('Fetching cart data...');
        const cartData = await window.cart.get();
        console.log('Cart data received:', cartData);

        const cart = cartData.cart || [];
        const total = cartData.total || 0;

        cartItemsContainer.innerHTML = '';

        if (cart.length === 0) {
            console.log('Cart is empty');
            emptyCartMessage.classList.remove('hidden');
            cartSummary.classList.add('hidden');
            if(checkoutButton) checkoutButton.classList.add('hidden');
        } else {
            emptyCartMessage.classList.add('hidden');
            cartSummary.classList.remove('hidden');
            if(checkoutButton) checkoutButton.classList.remove('hidden');

            cart.forEach(item => {
                console.log('Rendering item:', item);
                const itemElement = document.createElement('div');
                itemElement.className = 'flex flex-col sm:flex-row items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-4';
                
                const itemImage = item.image || item.image_url || 'https://via.placeholder.com/150';
                console.log('Item image path:', itemImage);
                
                itemElement.innerHTML = `
                    <img src="${itemImage}" alt="${item.name}" class="w-24 h-24 object-cover rounded-lg">
                    <div class="flex-grow mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left">
                        <h4 class="text-xl heading-font text-gold">${item.name}</h4>
                        <span class="text-lg font-bold text-gold">R${parseFloat(item.price).toFixed(2)}</span>
                    </div>
                    <div class="flex items-center gap-2 mt-4 sm:mt-0">
                        <button class="quantity-change bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 w-8 h-8 rounded flex items-center justify-center font-bold" data-product-id="${item.id}" data-change="-1">−</button>
                        <input type="number" value="${item.quantity}" min="1" class="w-16 bg-gray-100 dark:bg-gray-800 text-center rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-gold focus:border-gold quantity-input" data-product-id="${item.id}">
                        <button class="quantity-change bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 w-8 h-8 rounded flex items-center justify-center font-bold" data-product-id="${item.id}" data-change="1">+</button>
                        <button class="remove-item ml-2 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded flex items-center justify-center" data-product-id="${item.id}" title="Remove item">×</button>
                    </div>
                `;
                cartItemsContainer.appendChild(itemElement);
            });

            // Use the total from the API
            subtotalEl.textContent = `R${total.toFixed(2)}`;
            totalEl.textContent = `R${total.toFixed(2)}`; // Assuming no taxes for now
            
            feather.replace();
        }
    }

    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', async (e) => {
            const target = e.target.closest('.quantity-change, .remove-item');
            if (!target) return;

            const productId = parseInt(target.dataset.productId, 10);
            if (isNaN(productId)) return;

            if (target.classList.contains('quantity-change')) {
                const change = parseInt(target.dataset.change, 10);
                const cartData = await window.cart.get();
                const item = cartData.cart.find(i => i.id === productId);
                if (item) {
                    const newQuantity = item.quantity + change;
                    await window.cart.updateItem(productId, newQuantity);
                }
            } else if (target.classList.contains('remove-item')) {
                await window.cart.updateItem(productId, 0); // Set quantity to 0 to remove
            }
            
            renderCart();
        });

        cartItemsContainer.addEventListener('change', async (e) => {
            if (e.target.classList.contains('quantity-input')) {
                const productId = parseInt(e.target.dataset.productId, 10);
                const newQuantity = parseInt(e.target.value, 10);
                
                if (isNaN(productId)) return;

                if (newQuantity >= 0) {
                    await window.cart.updateItem(productId, newQuantity);
                }
                renderCart();
            }
        });
    }

    // Listen for the custom event
    document.addEventListener('cartInitialized', renderCart);

    if (checkoutButton) {
        checkoutButton.addEventListener('click', (e) => {
            if (!window.cart.isLoggedIn()) {
                e.preventDefault();
                alert('You must be logged in to proceed to checkout.');
                // Redirect to login page, preserving the cart in localStorage
                window.location.href = 'login_page.html';
            }
        });
    }
});
