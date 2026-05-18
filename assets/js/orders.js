document.addEventListener('DOMContentLoaded', () => {
    // --- Page-Specific Script for Orders ---
    const ordersTableBody = document.getElementById('orders-table-body');
    if (!ordersTableBody) return;

    const API_URL = 'api/orders.html';

    const formatCurrency = (amount) => new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR' }).format(amount);
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('en-CA');

    const getStatusBadge = (status) => {
        const baseClasses = 'px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full';
        switch (status.toLowerCase()) {
            case 'pending': return `${baseClasses} bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300`;
            case 'processing': return `${baseClasses} bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300`;
            case 'shipped': return `${baseClasses} bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300`;
            case 'delivered': return `${baseClasses} bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`;
            case 'cancelled': return `${baseClasses} bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300`;
            default: return `${baseClasses} bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`;
        }
    };

    const createTableRow = (order) => {
        console.log('Creating row for order:', order); // Debug log
        const isPending = order.status && order.status.toLowerCase() === 'pending';
        
        // Create items list
        const itemsList = order.items && order.items.length > 0 
            ? order.items.map(item => item.name).join(', ')
            : 'No items';
        
        const cancelButton = isPending ? `
            <button onclick="showCancelConfirmation(${order.id})" class="ml-3 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition-colors">
                Cancel Order
            </button>
        ` : '';
        
        return `
            <tr id="order-row-${order.id}" class="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td class="px-6 py-4 whitespace-nowrap font-mono text-sm">#${order.id.toString().padStart(5, '0')}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">${formatDate(order.order_date)}</td>
                <td class="px-6 py-4 text-sm max-w-xs truncate" title="${itemsList}">${itemsList}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold">${formatCurrency(order.total_amount)}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="${getStatusBadge(order.status)}">${order.status}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onclick="viewOrderDetails(${order.id})" class="text-gold hover:opacity-80 font-semibold">
                        View Details
                    </button>
                    ${cancelButton}
                </td>
            </tr>
        `;
    };

    const loadOrders = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const orders = await response.json();
            if (orders.length > 0) {
                ordersTableBody.innerHTML = orders.map(createTableRow).join('');
            } else {
                ordersTableBody.innerHTML = '<tr><td colspan="6" class="text-center py-8">You have no orders yet.</td></tr>';
            }
            // Debug: log orders to see the data
            console.log('Orders loaded:', orders);
            feather.replace();
        } catch (error) {
            console.error('Error loading orders:', error);
            ordersTableBody.innerHTML = '<tr><td colspan="6" class="text-center py-8 text-red-500">Could not load orders. Please try again later.</td></tr>';
        }
    };

    // View order details in modal
    window.viewOrderDetails = async (orderId) => {
        try {
            const response = await fetch(API_URL);
            const orders = await response.json();
            const order = orders.find(o => o.id === orderId);
            
            if (!order) {
                alert('Order not found.');
                return;
            }
            
            const modal = document.getElementById('order-modal');
            const content = document.getElementById('order-details-content');
            
            // Build items display like product cards
            const itemsHTML = order.items && order.items.length > 0 
                ? order.items.map(item => `
                    <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-3 flex items-center">
                        <img src="${item.image_url || 'https://via.placeholder.com/100'}" alt="${item.name}" class="w-20 h-20 object-cover rounded mr-4">
                        <div class="flex-1">
                            <h4 class="font-semibold text-lg">${item.name}</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-400">Quantity: ${item.quantity}</p>
                            <p class="text-sm font-semibold text-gold">${formatCurrency(item.price)} each</p>
                        </div>
                        <div class="text-right">
                            <p class="font-bold">${formatCurrency(item.price * item.quantity)}</p>
                        </div>
                    </div>
                `).join('')
                : '<p class="text-gray-500">No items in this order.</p>';
            
            content.innerHTML = `
                <div class="space-y-4">
                    <div class="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p class="text-gray-600 dark:text-gray-400">Order ID</p>
                            <p class="font-semibold">#${order.id.toString().padStart(5, '0')}</p>
                        </div>
                        <div>
                            <p class="text-gray-600 dark:text-gray-400">Date</p>
                            <p class="font-semibold">${formatDate(order.order_date)}</p>
                        </div>
                        <div>
                            <p class="text-gray-600 dark:text-gray-400">Status</p>
                            <span class="${getStatusBadge(order.status)}">${order.status}</span>
                        </div>
                        <div>
                            <p class="text-gray-600 dark:text-gray-400">Total</p>
                            <p class="font-semibold text-lg">${formatCurrency(order.total_amount)}</p>
                        </div>
                    </div>
                    <div class="border-t dark:border-gray-700 pt-4">
                        <h4 class="font-semibold mb-3">Order Items</h4>
                        ${itemsHTML}
                    </div>
                    ${order.shipping_address ? `
                        <div class="border-t dark:border-gray-700 pt-4">
                            <h4 class="font-semibold mb-2">Shipping Address</h4>
                            <p class="text-sm text-gray-600 dark:text-gray-400">${order.shipping_address}</p>
                        </div>
                    ` : ''}
                </div>
            `;
            
            modal.classList.remove('hidden');
            feather.replace();
        } catch (error) {
            console.error('Error loading order details:', error);
            alert('Failed to load order details.');
        }
    };

    // Close modal
    window.closeOrderModal = () => {
        const modal = document.getElementById('order-modal');
        modal.classList.add('hidden');
    };

    // Show cancel confirmation modal
    window.showCancelConfirmation = (orderId) => {
        const modal = document.getElementById('cancel-confirmation-modal');
        const confirmBtn = document.getElementById('confirm-cancel-btn');
        
        // Remove any existing click handlers
        const newConfirmBtn = confirmBtn.cloneNode(true);
        confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
        
        // Add new click handler
        document.getElementById('confirm-cancel-btn').addEventListener('click', () => {
            cancelOrder(orderId);
        });
        
        modal.classList.remove('hidden');
    };

    // Close cancel confirmation modal
    window.closeCancelConfirmation = () => {
        const modal = document.getElementById('cancel-confirmation-modal');
        modal.classList.add('hidden');
    };

    // Make cancelOrder globally accessible
    window.cancelOrder = async (orderId) => {
        closeCancelConfirmation();
        
        try {
            const response = await fetch(API_URL, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: orderId,
                    status: 'cancelled'
                })
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                successMsg.textContent = 'Order cancelled successfully!';
                document.body.appendChild(successMsg);
                setTimeout(() => successMsg.remove(), 3000);
                
                loadOrders(); // Reload the orders table
            } else {
                // Show error message
                const errorMsg = document.createElement('div');
                errorMsg.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
                errorMsg.textContent = result.error || 'Failed to cancel order. Only pending orders can be cancelled.';
                document.body.appendChild(errorMsg);
                setTimeout(() => errorMsg.remove(), 4000);
            }
        } catch (error) {
            console.error('Error cancelling order:', error);
            const errorMsg = document.createElement('div');
            errorMsg.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
            errorMsg.textContent = 'An error occurred while cancelling the order. Please try again.';
            document.body.appendChild(errorMsg);
            setTimeout(() => errorMsg.remove(), 4000);
        }
    };

    loadOrders();
});
