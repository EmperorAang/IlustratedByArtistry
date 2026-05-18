document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init();

    // --- Page-specific script for loading products ---
    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
        fetch('api/products.html')
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                return response.json();
            })
            .then(products => {
                if (!products || products.length === 0) {
                    productGrid.innerHTML = '<p class="text-center col-span-full">No products found.</p>';
                    return;
                }
                let productHTML = '';
                products.forEach(product => {
                    const isOutOfStock = product.stock_quantity === 0;
                    const isLowStock = product.stock_quantity > 0 && product.stock_quantity <= (product.low_stock_threshold || 5);
                    
                    productHTML += `
                        <div class="bg-light-card dark:bg-dark-card rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col ${isOutOfStock ? 'opacity-75' : ''}" data-aos="fade-up">
                            <div class="relative">
                                <img src="${product.image_url}" alt="${product.name}" class="w-full h-64 object-cover ${isOutOfStock ? 'grayscale' : ''}">
                                ${isOutOfStock ? '<div class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"><span class="bg-red-600 text-white font-bold py-2 px-6 rounded-full text-lg">OUT OF STOCK</span></div>' : ''}
                                ${!isOutOfStock && isLowStock ? '<div class="absolute top-2 right-2"><span class="bg-yellow-500 text-black font-semibold py-1 px-3 rounded-full text-xs">Low Stock</span></div>' : ''}
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <h2 class="text-2xl heading-font font-bold mb-2">${product.name}</h2>
                                <p class="text-gray-600 dark:text-gray-400 mb-4 flex-grow">${product.description}</p>
                                <div class="flex justify-between items-center mt-auto">
                                    <span class="text-2xl font-bold text-gold">R${product.price}</span>
                                    ${isOutOfStock 
                                        ? '<span class="text-red-600 dark:text-red-400 font-semibold">Unavailable</span>'
                                        : `<button data-product-id="${product.id}" data-product-name="${product.name}" data-product-price="${product.price}" data-product-image="${product.image_url}" data-product-stock="${product.stock_quantity}" class="add-to-cart-btn bg-gold text-black font-bold py-2 px-4 rounded-full hover:bg-opacity-90 transform hover:scale-105 transition-all duration-300">
                                            Add to Cart
                                        </button>`
                                    }
                                </div>
                            </div>
                        </div>
                    `;
                });
                productGrid.innerHTML = productHTML;
                feather.replace(); // Re-run Feather Icons to render new icons

                // --- Attach event listeners to new buttons ---
                const addToCartButtons = productGrid.querySelectorAll('.add-to-cart-btn');
                addToCartButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const product = {
                            id: parseInt(button.dataset.productId), // Ensure ID is an integer
                            name: button.dataset.productName,
                            price: parseFloat(button.dataset.productPrice),
                            image: button.dataset.productImage,
                            type: 'product' // Add type for cart distinction
                        };
                        if (window.cart && typeof window.cart.add === 'function') {
                            window.cart.add(product);
                        } else {
                            console.error('Cart functionality is not available.');
                            alert('Error: Could not add item to cart.');
                        }
                    });
                });
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                productGrid.innerHTML = '<p class="text-center col-span-full text-red-500">Could not load products. Please try again later.</p>';
            });
    }
});