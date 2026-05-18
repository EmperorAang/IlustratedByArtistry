document.addEventListener('DOMContentLoaded', () => {
    let resendTimer;
    let resendCountdown = 60;
    let currentEmail = '';
    let currentOtp = '';

    // Form elements
    const emailForm = document.getElementById('email-form');
    const otpSection = document.getElementById('otp-section');
    const passwordForm = document.getElementById('password-form');
    const messageContainer = document.getElementById('message-container');
    const message = document.getElementById('message');

    // Buttons
    const sendCodeBtn = document.getElementById('send-code-btn');
    const verifyOtpBtn = document.getElementById('verify-otp-btn');
    const resendOtpBtn = document.getElementById('resend-otp-btn');
    const resetPasswordBtn = document.getElementById('reset-password-btn');

    // Inputs
    const emailInput = document.getElementById('email');
    const otpInput = document.getElementById('otp-input');
    const newPasswordInput = document.getElementById('new-password');
    const confirmPasswordInput = document.getElementById('confirm-password');

    // OTP input validation - numbers only
    otpInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });

    // Step 1: Send OTP to email
    emailForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        currentEmail = emailInput.value.trim();

        if (!currentEmail) {
            showMessage('error', 'Please enter your email address');
            return;
        }

        sendCodeBtn.disabled = true;
        sendCodeBtn.innerHTML = '<i data-feather="loader" class="w-5 h-5 mr-2 animate-spin"></i>Sending...';
        feather.replace();

        try {
            const response = await fetch('api/forgot-password-request.html', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: currentEmail })
            });

            const data = await response.json();

            if (data.success) {
                showMessage('success', 'Verification code sent to your email!');
                emailForm.classList.add('hidden');
                otpSection.classList.remove('hidden');
                startResendTimer();
            } else {
                showMessage('error', data.error || 'Failed to send verification code');
                sendCodeBtn.disabled = false;
                sendCodeBtn.innerHTML = '<i data-feather="send" class="w-5 h-5 mr-2"></i>Send Verification Code';
                feather.replace();
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('error', 'An error occurred. Please try again.');
            sendCodeBtn.disabled = false;
            sendCodeBtn.innerHTML = '<i data-feather="send" class="w-5 h-5 mr-2"></i>Send Verification Code';
            feather.replace();
        }
    });

    // Step 2: Verify OTP
    verifyOtpBtn.addEventListener('click', async () => {
        currentOtp = otpInput.value.trim();

        if (currentOtp.length !== 6) {
            showMessage('error', 'Please enter a valid 6-digit code');
            return;
        }

        verifyOtpBtn.disabled = true;
        verifyOtpBtn.textContent = 'Verifying...';

        try {
            const response = await fetch('api/forgot-password-verify.html', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: currentEmail, otp: currentOtp })
            });

            const data = await response.json();

            if (data.success) {
                showMessage('success', 'Code verified! Enter your new password');
                otpSection.classList.add('hidden');
                passwordForm.classList.remove('hidden');
                clearResendTimer();
            } else {
                showMessage('error', data.error || 'Invalid verification code');
                verifyOtpBtn.disabled = false;
                verifyOtpBtn.textContent = 'Verify Code';
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('error', 'An error occurred. Please try again.');
            verifyOtpBtn.disabled = false;
            verifyOtpBtn.textContent = 'Verify Code';
        }
    });

    // Resend OTP
    resendOtpBtn.addEventListener('click', async () => {
        resendOtpBtn.disabled = true;
        resendOtpBtn.textContent = 'Sending...';

        try {
            const response = await fetch('api/forgot-password-request.html', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: currentEmail })
            });

            const data = await response.json();

            if (data.success) {
                showMessage('success', 'New verification code sent!');
                otpInput.value = '';
                startResendTimer();
            } else {
                showMessage('error', data.error || 'Failed to resend code');
                resendOtpBtn.disabled = false;
                resendOtpBtn.textContent = 'Resend Code';
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('error', 'An error occurred. Please try again.');
            resendOtpBtn.disabled = false;
            resendOtpBtn.textContent = 'Resend Code';
        }
    });

    // Step 3: Reset password
    passwordForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const newPassword = newPasswordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        if (newPassword.length < 8) {
            showMessage('error', 'Password must be at least 8 characters');
            return;
        }

        if (newPassword !== confirmPassword) {
            showMessage('error', 'Passwords do not match');
            return;
        }

        resetPasswordBtn.disabled = true;
        resetPasswordBtn.innerHTML = '<i data-feather="loader" class="w-5 h-5 mr-2 animate-spin"></i>Resetting...';
        feather.replace();

        try {
            const response = await fetch('api/forgot-password-reset.html', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    email: currentEmail, 
                    otp: currentOtp, 
                    new_password: newPassword 
                })
            });

            const data = await response.json();

            if (data.success) {
                showMessage('success', 'Password reset successful! Redirecting to login...');
                setTimeout(() => {
                    window.location.href = 'login_page.html';
                }, 2000);
            } else {
                showMessage('error', data.error || 'Failed to reset password');
                resetPasswordBtn.disabled = false;
                resetPasswordBtn.innerHTML = '<i data-feather="check-circle" class="w-5 h-5 mr-2"></i>Reset Password';
                feather.replace();
            }
        } catch (error) {
            console.error('Error:', error);
            showMessage('error', 'An error occurred. Please try again.');
            resetPasswordBtn.disabled = false;
            resetPasswordBtn.innerHTML = '<i data-feather="check-circle" class="w-5 h-5 mr-2"></i>Reset Password';
            feather.replace();
        }
    });

    // Resend timer
    function startResendTimer() {
        resendCountdown = 60;
        resendOtpBtn.disabled = true;
        updateResendButton();
        
        resendTimer = setInterval(() => {
            resendCountdown--;
            updateResendButton();
            
            if (resendCountdown <= 0) {
                clearResendTimer();
            }
        }, 1000);
    }

    function updateResendButton() {
        if (resendCountdown > 0) {
            resendOtpBtn.textContent = `Resend Code (${resendCountdown}s)`;
        } else {
            resendOtpBtn.textContent = 'Resend Code';
            resendOtpBtn.disabled = false;
        }
    }

    function clearResendTimer() {
        if (resendTimer) {
            clearInterval(resendTimer);
            resendTimer = null;
        }
        resendOtpBtn.disabled = false;
        resendOtpBtn.textContent = 'Resend Code';
    }

    // Show message
    function showMessage(type, text) {
        messageContainer.classList.remove('hidden');
        message.textContent = text;
        
        if (type === 'success') {
            message.className = 'p-4 rounded-lg bg-green-100 text-green-800 border border-green-200';
        } else {
            message.className = 'p-4 rounded-lg bg-red-100 text-red-800 border border-red-200';
        }

        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageContainer.classList.add('hidden');
        }, 5000);
    }
});
