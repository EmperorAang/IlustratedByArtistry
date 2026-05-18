document.addEventListener('DOMContentLoaded', function () {
    const phoneInput = document.querySelector("#phone-number");
    if (!phoneInput) return; 

    const phoneInputInstance = window.intlTelInput(phoneInput, {
        initialCountry: "auto",
        geoIpLookup: function(callback) {
            fetch("https://ipapi.co/json")
                .then(function(res) { return res.json(); })
                .then(function(data) { callback(data.country_code); })
                .catch(function() { callback("us"); });
        },
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });

    const form = document.getElementById('registration-form');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const username = document.getElementById('username');
    const email = document.getElementById('email-address');
    const phone = document.getElementById('phone-number');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password');

    const firstNameError = document.getElementById('first-name-error');
    const lastNameError = document.getElementById('last-name-error');
    const usernameError = document.getElementById('username-error');
    const emailError = document.getElementById('email-error');
    const phoneError = document.getElementById('phone-error');
    const passwordError = document.getElementById('password-error');
    const confirmPasswordError = document.getElementById('confirm-password-error');

    // Password strength criteria elements
    const lengthCheck = document.getElementById('length-check');
    const uppercaseCheck = document.getElementById('uppercase-check');
    const numberCheck = document.getElementById('number-check');
    const specialCheck = document.getElementById('special-check');

    const togglePasswordVisibility = (inputId, toggleButtonId) => {
        const input = document.getElementById(inputId);
        const toggleButton = document.getElementById(toggleButtonId);
        if (!input || !toggleButton) return;
        const icon = toggleButton.querySelector('i');

        toggleButton.addEventListener('click', () => {
            if (input.type === 'password') {
                input.type = 'text';
                icon.setAttribute('data-feather', 'eye-off');
            } else {
                input.type = 'password';
                icon.setAttribute('data-feather', 'eye');
            }
            feather.replace();
        });
    };

    togglePasswordVisibility('password', 'toggle-password');
    togglePasswordVisibility('confirm-password', 'toggle-confirm-password');

    const updateCriteriaCheck = (element, isValid) => {
        if (!element) return;
        const icon = element.querySelector('svg');
        if (icon) {
            icon.remove();
        }

        const newIcon = document.createElement('i');
        newIcon.dataset.feather = isValid ? 'check' : 'x';
        newIcon.classList.add('w-4', 'h-4', 'mr-2');

        const text = element;
        
        if (isValid) {
            text.classList.remove('text-gray-500', 'dark:text-gray-400', 'text-red-500');
            text.classList.add('text-green-500');
            newIcon.classList.add('text-green-500');
        } else {
            text.classList.remove('text-green-500');
            text.classList.add('text-gray-500', 'dark:text-gray-400');
            newIcon.classList.add('text-red-500');
        }
        
        element.prepend(newIcon);
        feather.replace();
    };

    const validatePasswordStrength = () => {
        const value = password.value;
        const hasLength = value.length >= 8;
        const hasUppercase = /[A-Z]/.test(value);
        const hasNumber = /[0-9]/.test(value);
        const hasSpecial = /[@$!%*?&]/.test(value);

        updateCriteriaCheck(lengthCheck, hasLength);
        updateCriteriaCheck(uppercaseCheck, hasUppercase);
        updateCriteriaCheck(numberCheck, hasNumber);
        updateCriteriaCheck(specialCheck, hasSpecial);

        return hasLength && hasUppercase && hasNumber && hasSpecial;
    };

    const validateRequired = (input, errorField, fieldName) => {
        if (!input || !errorField) return false;
        if (input.value.trim() === '') {
            errorField.textContent = `${fieldName} is required.`;
            errorField.classList.remove('hidden');
            input.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
            input.classList.remove('focus:border-gold', 'focus:ring-gold');
            return false;
        }
        errorField.classList.add('hidden');
        input.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
        input.classList.add('focus:border-gold', 'focus:ring-gold');
        return true;
    };
    
    const validateEmail = () => {
        if (!validateRequired(email, emailError, 'Email')) return false;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        if (!emailRegex.test(email.value)) {
            emailError.textContent = 'Please enter a valid email address (e.g., name@example.com).';
            emailError.classList.remove('hidden');
            email.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
            email.classList.remove('focus:border-gold', 'focus:ring-gold');
            return false;
        }
        emailError.classList.add('hidden');
        email.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
        email.classList.add('focus:border-gold', 'focus:ring-gold');
        return true;
    };

    const validatePhone = () => {
        if (!validateRequired(phone, phoneError, 'Phone Number')) return false;
        
        if (!phoneInputInstance.isValidNumber()) {
            phoneError.textContent = 'Please enter a valid phone number.';
            phoneError.classList.remove('hidden');
            phone.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
            phone.classList.remove('focus:border-gold', 'focus:ring-gold');
            return false;
        }

        phoneError.classList.add('hidden');
        phone.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
        phone.classList.add('focus:border-gold', 'focus:ring-gold');
        return true;
    };

    const validatePassword = () => {
        if (!validateRequired(password, passwordError, 'Password')) return false;
        if (!validatePasswordStrength()) {
            passwordError.textContent = 'Please meet all password criteria.';
            passwordError.classList.remove('hidden');
            password.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
            password.classList.remove('focus:border-gold', 'focus:ring-gold');
            return false;
        }
        passwordError.classList.add('hidden');
        password.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
        password.classList.add('focus:border-gold', 'focus:ring-gold');
        return true;
    };

    const validateConfirmPassword = () => {
        if (!validateRequired(confirmPassword, confirmPasswordError, 'Confirm Password')) return false;
        if (password.value !== confirmPassword.value) {
            confirmPasswordError.textContent = 'Passwords do not match.';
            confirmPasswordError.classList.remove('hidden');
            confirmPassword.classList.add('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
            confirmPassword.classList.remove('focus:border-gold', 'focus:ring-gold');
            return false;
        }
        confirmPasswordError.classList.add('hidden');
        confirmPassword.classList.remove('border-red-500', 'focus:border-red-500', 'focus:ring-red-500');
        confirmPassword.classList.add('focus:border-gold', 'focus:ring-gold');
        return true;
    };

    // Real-time validation listeners
    if (firstName) firstName.addEventListener('input', () => validateRequired(firstName, firstNameError, 'Name'));
    if (lastName) lastName.addEventListener('input', () => validateRequired(lastName, lastNameError, 'Surname'));
    if (username) username.addEventListener('input', () => validateRequired(username, usernameError, 'Username'));
    if (email) email.addEventListener('input', validateEmail);
    if (phone) phone.addEventListener('input', validatePhone);
    if (password) password.addEventListener('input', validatePassword);
    if (confirmPassword) confirmPassword.addEventListener('input', validateConfirmPassword);

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const isFirstNameValid = validateRequired(firstName, firstNameError, 'Name');
            const isLastNameValid = validateRequired(lastName, lastNameError, 'Surname');
            const isUsernameValid = validateRequired(username, usernameError, 'Username');
            const isEmailValid = validateEmail();
            const isPhoneValid = validatePhone();
            const isPasswordValid = validatePassword();
            const isConfirmPasswordValid = validateConfirmPassword();

            if (isFirstNameValid && isLastNameValid && isUsernameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid) {
                const fullPhoneNumber = phoneInputInstance.getNumber();
                const data = {
                    first_name: firstName.value,
                    last_name: lastName.value,
                    username: username.value,
                    email: email.value,
                    phone: fullPhoneNumber,
                    password: password.value
                };
                
                submitRegistration(data);

            } else {
                console.log('Form has validation errors.');
            }
        });
    }

    async function submitRegistration(data) {
        const messageDiv = document.getElementById('message');
        try {
            const response = await fetch('api/register.html', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                // Redirect to the new verification page
                window.location.href = `verify.html?email=${encodeURIComponent(data.email)}`;
            } else {
                messageDiv.innerHTML = `<p class="text-red-500">${result.error}</p>`;
            }
        } catch (error) {
            console.error('Registration error:', error);
            messageDiv.innerHTML = `<p class="text-red-500">An unexpected error occurred. Please try again.</p>`;
        }
    }
});
