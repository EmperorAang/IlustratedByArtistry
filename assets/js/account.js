document.addEventListener('DOMContentLoaded', () => {
    let resendTimer;
    let resendCountdown = 60;
    let currentOtp = '';

    // Load user details
    loadUserDetails();

    // Request OTP button
    document.getElementById('request-otp-btn').addEventListener('click', requestOtp);

    // Verify OTP button
    document.getElementById('verify-otp-btn').addEventListener('click', verifyOtp);

    // Resend OTP button
    document.getElementById('resend-otp-btn').addEventListener('click', resendOtp);

    // Change password form
    document.getElementById('change-password-form').addEventListener('submit', changePassword);

    // OTP input - auto-focus and validation
    const otpInput = document.getElementById('otp-input');
    otpInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    function loadUserDetails() {
        fetch('api/get_user_details.html')
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    showMessage('error', data.error || 'Failed to load user details');
                } else {
                    document.getElementById('first-name').textContent = data.first_name || 'N/A';
                    document.getElementById('last-name').textContent = data.last_name || 'N/A';
                    document.getElementById('username').textContent = data.username || 'N/A';
                    document.getElementById('email').textContent = data.email || 'N/A';
                    document.getElementById('phone').textContent = data.phone || 'N/A';
                }
            })
            .catch(error => {
                console.error('Error loading user details:', error);
                showMessage('error', 'An error occurred while loading your details');
            });
    }

    function requestOtp() {
        const btn = document.getElementById('request-otp-btn');
        btn.disabled = true;
        btn.innerHTML = '<i data-feather="loader" class="mr-2 animate-spin"></i>Sending...';
        feather.replace();

        fetch('api/request-password-change-otp.html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showMessage('success', 'Verification code sent to your email!');
                openOtpModal();
                startResendTimer();
            } else {
                showMessage('error', data.error || 'Failed to send verification code');
            }
        })
        .catch(error => {
            console.error('Error requesting OTP:', error);
            showMessage('error', 'An error occurred. Please try again.');
        })
        .finally(() => {
            btn.disabled = false;
            btn.innerHTML = '<i data-feather="mail" class="mr-2"></i>Request Password Change';
            feather.replace();
        });
    }

    function verifyOtp() {
        const otp = document.getElementById('otp-input').value;
        
        if (otp.length !== 6) {
            showOtpMessage('error', 'Please enter a 6-digit code');
            return;
        }

        const btn = document.getElementById('verify-otp-btn');
        btn.disabled = true;
        btn.textContent = 'Verifying...';

        fetch('api/verify-password-change-otp.html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ otp: otp })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                currentOtp = otp;
                closeOtpModal();
                openChangePasswordModal();
            } else {
                showOtpMessage('error', data.error || 'Invalid verification code');
            }
        })
        .catch(error => {
            console.error('Error verifying OTP:', error);
            showOtpMessage('error', 'An error occurred. Please try again.');
        })
        .finally(() => {
            btn.disabled = false;
            btn.textContent = 'Verify & Continue';
        });
    }

    function resendOtp() {
        const btn = document.getElementById('resend-otp-btn');
        btn.disabled = true;

        fetch('api/request-password-change-otp.html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showOtpMessage('success', 'New code sent to your email!');
                resendCountdown = 60;
                startResendTimer();
            } else {
                showOtpMessage('error', data.error || 'Failed to resend code');
                btn.disabled = false;
            }
        })
        .catch(error => {
            console.error('Error resending OTP:', error);
            showOtpMessage('error', 'An error occurred. Please try again.');
            btn.disabled = false;
        });
    }

    function changePassword(e) {
        e.preventDefault();

        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            showPasswordMessage('error', 'Passwords do not match');
            return;
        }

        if (newPassword.length < 8) {
            showPasswordMessage('error', 'Password must be at least 8 characters');
            return;
        }

        const btn = e.target.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Changing Password...';

        fetch('api/change-password.html', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                otp: currentOtp,
                new_password: newPassword
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showPasswordMessage('success', 'Password changed successfully!');
                setTimeout(() => {
                    closeChangePasswordModal();
                    showMessage('success', 'Your password has been changed successfully!');
                    document.getElementById('change-password-form').reset();
                }, 2000);
            } else {
                showPasswordMessage('error', data.error || 'Failed to change password');
            }
        })
        .catch(error => {
            console.error('Error changing password:', error);
            showPasswordMessage('error', 'An error occurred. Please try again.');
        })
        .finally(() => {
            btn.disabled = false;
            btn.textContent = 'Change Password';
        });
    }

    function openOtpModal() {
        document.getElementById('otp-modal').classList.remove('hidden');
        document.getElementById('otp-input').value = '';
        document.getElementById('otp-input').focus();
        feather.replace();
    }

    function closeOtpModal() {
        document.getElementById('otp-modal').classList.add('hidden');
        clearInterval(resendTimer);
        resendCountdown = 60;
    }

    function openChangePasswordModal() {
        document.getElementById('change-password-modal').classList.remove('hidden');
        document.getElementById('new-password').focus();
        feather.replace();
    }

    function closeChangePasswordModal() {
        document.getElementById('change-password-modal').classList.add('hidden');
        document.getElementById('change-password-form').reset();
    }

    window.closeOtpModal = closeOtpModal;
    window.closeChangePasswordModal = closeChangePasswordModal;

    function startResendTimer() {
        const btn = document.getElementById('resend-otp-btn');
        const timerSpan = document.getElementById('resend-timer');
        
        btn.disabled = true;
        resendCountdown = 60;
        
        resendTimer = setInterval(() => {
            resendCountdown--;
            timerSpan.textContent = resendCountdown;
            
            if (resendCountdown <= 0) {
                clearInterval(resendTimer);
                btn.disabled = false;
                btn.innerHTML = 'Resend Code';
            }
        }, 1000);
    }

    function showMessage(type, message) {
        const container = document.getElementById('message-container');
        const bgColor = type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-400 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 border-red-400 text-red-700 dark:text-red-300';
        
        container.className = `mb-6 border-l-4 p-4 rounded ${bgColor}`;
        container.innerHTML = `
            <div class="flex">
                <div class="flex-shrink-0">
                    <i data-feather="${type === 'success' ? 'check-circle' : 'alert-circle'}" class="h-5 w-5"></i>
                </div>
                <div class="ml-3">
                    <p class="text-sm font-medium">${message}</p>
                </div>
            </div>
        `;
        container.classList.remove('hidden');
        feather.replace();

        setTimeout(() => {
            container.classList.add('hidden');
        }, 5000);
    }

    function showOtpMessage(type, message) {
        const container = document.getElementById('otp-message');
        const bgColor = type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-400 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 border-red-400 text-red-700 dark:text-red-300';
        
        container.className = `mb-4 border-l-4 p-3 rounded ${bgColor}`;
        container.innerHTML = `<p class="text-sm">${message}</p>`;
        container.classList.remove('hidden');
    }

    function showPasswordMessage(type, message) {
        const container = document.getElementById('password-message');
        const bgColor = type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-400 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 border-red-400 text-red-700 dark:text-red-300';
        
        container.className = `mb-4 border-l-4 p-3 rounded ${bgColor}`;
        container.innerHTML = `<p class="text-sm">${message}</p>`;
        container.classList.remove('hidden');
    }
});
