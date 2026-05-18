document.addEventListener('DOMContentLoaded', function () {
    feather.replace();

    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const togglePassword = document.getElementById('toggle-password');

    // --- Password Visibility Toggle ---
    if (togglePassword) {
        togglePassword.addEventListener('click', function () {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            const icon = this.querySelector('i');
            icon.setAttribute('data-feather', type === 'password' ? 'eye' : 'eye-off');
            feather.replace();
        });
    }

    // --- Real-time validation feedback ---
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            if (emailInput.validity.valid) {
                emailError.textContent = '';
                emailError.classList.add('hidden');
            }
        });
    }

    // --- Form Submission Logic ---
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const form = e.target;
            const username = form.email.value;
            const password = form.password.value;
            const messageDiv = document.getElementById('message');

            try {
                const response = await fetch('api/login.html', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const result = await response.json();

                if (response.ok) {
                    messageDiv.innerHTML = `<p class="text-green-500">${result.success}</p>`;
                    // Redirect based on role
                    if (result.role === 'admin') {
                        window.location.href = 'admin-dashboard.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                } else {
                    messageDiv.innerHTML = `<p class="text-red-500">${result.error}</p>`;
                }
            } catch (error) {
                console.error('Login error:', error);
                messageDiv.innerHTML = `<p class="text-red-500">An unexpected error occurred. Please try again.</p>`;
            }
        });
    }
});
