# Illuminated By Artistry - Project Documentation

This document provides a comprehensive overview of the Illuminated By Artistry e-commerce website, including setup instructions, API reference, and details about the database schema.

## 1. Project Overview

Illuminated By Artistry is a full-featured e-commerce platform designed for selling artistic products. It includes a customer-facing storefront, a shopping cart, a secure checkout process with iKhokha payment integration, and an admin dashboard for managing products, orders, and gallery content.

### Key Features:
- **Customer-Facing Storefront:** Browse products, view gallery, and learn about the artist.
- **User Authentication:** Secure user registration and login with OTP-based two-factor authentication.
- **Shopping Cart:** Add/remove products, and view cart summary.
- **Payment Integration:** Secure payments handled by the iKhokha payment gateway.
- **Order Management:** Customers can view their order history.
- **Admin Dashboard:** A separate interface for administrators to manage products, orders, and the image gallery.
- **Dynamic Theme:** Light and dark mode support.

## 2. Setup and Installation

Follow these steps to set up the project on a local development machine.

### Prerequisites
- [XAMPP](https://www.apachefriends.org/index.html) (or any other local server environment with PHP and MySQL)
- [Composer](https://getcomposer.org/) for PHP package management.

### Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    ```
    Place the project files in your XAMPP `htdocs` directory (e.g., `C:/xampp/htdocs/IBA`).

2.  **Install Dependencies:**
    Navigate to the project root in your terminal and run Composer to install PHPMailer.
    ```bash
    composer install
    ```

3.  **Database Setup:**
    a. Open the XAMPP Control Panel and start the Apache and MySQL services.
    b. Go to `http://localhost/phpmyadmin` in your browser.
    c. Create a new database named `illuminated_by_artistry`.
    d. Run the following SQL setup scripts by navigating to them in your browser. These will create the necessary tables:
        - `http://localhost/IBA/api/create_users_table.html`
        - `http://localhost/IBA/api/create_products_table.html`
        - `http://localhost/IBA/api/create_orders_table.html`
        - `http://localhost/IBA/api/create_gallery_table.html`
    e. (Optional) Seed the database with sample data:
        - `http://localhost/IBA/api/seed_products.html`
        - `http://localhost/IBA/api/seed_gallery.html`
        - `http://localhost/IBA/api/seed_services.html`

4.  **Configuration:**
    a. **Database:** The database connection is configured in each of the API files (e.g., `api/config.html`). By default, it's set up for a standard XAMPP installation (user: `root`, no password).
    b. **Payment Gateway:** Open `api/config.html` and enter your iKhokha Application ID and Secret Key.
    c. **Email (SMTP):** Open `api/mail_config.html` and enter your SMTP server details for sending OTP emails.

5.  **Running the Application:**
    Open your browser and navigate to `http://localhost/IBA/HomePage.html`.

## 3. Database Schema

The database `illuminated_by_artistry` consists of the following tables:

-   **`users`**: Stores user account information.
    -   `id` (INT, PK, AI)
    -   `username` (VARCHAR)
    -   `email` (VARCHAR, UNIQUE)
    -   `password` (VARCHAR) - Hashed
    -   `created_at` (TIMESTAMP)

-   **`products`**: Stores product information.
    -   `id` (INT, PK, AI)
    -   `name` (VARCHAR)
    -   `description` (TEXT)
    -   `price` (DECIMAL)
    -   `image_url` (VARCHAR)
    -   `stock_quantity` (INT)
    -   `created_at` (TIMESTAMP)
    -   `updated_at` (TIMESTAMP)

-   **`orders`**: Stores customer order information.
    -   `id` (INT, PK, AI)
    -   `customer_name` (VARCHAR)
    -   `customer_email` (VARCHAR)
    -   `total_amount` (DECIMAL)
    -   `shipping_address` (TEXT)
    -   `billing_address` (TEXT)
    -   `status` (VARCHAR, e.g., 'Pending', 'Paid', 'Shipped')
    -   `order_date` (TIMESTAMP)
    -   `merchant_order_id` (VARCHAR) - For iKhokha integration.
    -   `transaction_id` (VARCHAR) - From iKhokha callback.

-   **`order_items`**: Links products to orders.
    -   `id` (INT, PK, AI)
    -   `order_id` (INT, FK to `orders.id`)
    -   `product_id` (INT, FK to `products.id`)
    -   `quantity` (INT)
    -   `price_per_unit` (DECIMAL)

-   **`gallery`**: Stores information for gallery images.
    -   `id` (INT, PK, AI)
    -   `title` (VARCHAR)
    -   `description` (TEXT)
    -   `image_url` (VARCHAR)
    -   `created_at` (TIMESTAMP)

## 4. Backend API Reference

All API endpoints are located in the `api/` directory.

### Authentication
-   **`POST /api/register.html`**: Registers a new user.
-   **`POST /api/login.html`**: Handles user login. Verifies credentials, generates an OTP, and sends it via email.
-   **`POST /api/verify-otp.html`**: Verifies the OTP submitted by the user.
-   **`GET /api/logout.html`**: Logs the user out by destroying the session.
-   **`GET /api/session_status.html`**: Checks if a user is currently logged in.

### Products
-   **`GET /api/products.html`**: Retrieves a list of all products.
-   **`POST /api/products.html`**: (Admin) Adds a new product.
-   **`PUT /api/products.html`**: (Admin) Updates an existing product.
-   **`DELETE /api/products.html`**: (Admin) Deletes a product.

### Orders
-   **`GET /api/orders.html`**: Retrieves all orders (for admin) or a specific user's orders.
-   **`POST /api/orders.html`**: Creates a new order before payment.
-   **`PUT /api/orders.html`**: (Admin) Updates the status of an order.

### Gallery
-   **`GET /api/gallery.html`**: Retrieves all gallery images.
-   **`POST /api/gallery.html`**: (Admin) Adds a new image to the gallery.
-   **`DELETE /api/gallery.html`**: (Admin) Deletes an image from the gallery.

### Payment
-   **`POST /api/initiate-payment.html`**: Takes the total amount and redirects the user to the iKhokha payment page.
-   **`POST /api/payment-callback.html`**: The webhook endpoint for iKhokha to send payment status updates. It updates the order status in the database.

## 5. Frontend Logic

The frontend logic is primarily handled by JavaScript, either in separate files or embedded in the HTML pages.

-   **`js/cart.js`**: Manages the shopping cart functionality using `localStorage`. It handles adding, removing, and updating items in the cart.
-   **Checkout (`checkout.html`)**: The script in this file calculates the total, populates the order summary, and prepares the data to be sent to the `initiate-payment.html` script.
-   **Authentication (`login.html`, `registration.html`)**: These pages contain scripts to handle form submissions, interact with the authentication APIs, and manage user feedback.
-   **Theme Toggle**: A universal script is present on all pages to handle switching between light and dark modes, saving the user's preference in `localStorage`.
-   **Admin Panels**: The admin pages (`admin-products.html`, `admin-orders.html`, etc.) contain JavaScript to fetch data from the API, render it in tables, and handle create/update/delete operations.
