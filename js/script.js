// ============================================
//  DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', function () {

    // ============================================
    // 1. TOGGLE PASSWORD VISIBILITY
    // ============================================
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            if (!input) return;

            const icon = this.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('bi-eye-slash');
                icon.classList.add('bi-eye');
            } else {
                input.type = 'password';
                icon.classList.remove('bi-eye');
                icon.classList.add('bi-eye-slash');
            }
        });
    });

    // ============================================
    // 2. LOGIN VALIDATION
    // ============================================
    const loginForm = document.getElementById('loginForm');
    const loginAlert = document.getElementById('loginAlert');

    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            loginAlert.innerHTML = ''; // clear previous

            const email = document.getElementById('loginEmail');
            const password = document.getElementById('loginPassword');

            // Reset validation
            email.classList.remove('is-invalid');
            password.classList.remove('is-invalid');

            let valid = true;

            // Email
            if (!email.value || !email.value.includes('@') || !email.value.includes('.')) {
                email.classList.add('is-invalid');
                valid = false;
            }

            // Password length
            if (!password.value || password.value.length < 8) {
                password.classList.add('is-invalid');
                valid = false;
            }

            if (valid) {
                loginAlert.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show mb-0" role="alert">
                        <i class="bi bi-check-circle-fill me-2"></i> Login successful! (Demo)
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
                // Reset form (optional)
                // loginForm.reset();
            } else {
                loginAlert.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show mb-0" role="alert">
                        <i class="bi bi-exclamation-triangle-fill me-2"></i> Please fix the errors above.
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
            }
        });
    }

    // ============================================
    // 3. REGISTRATION VALIDATION
    // ============================================
    const registerForm = document.getElementById('registerForm');
    const registerAlert = document.getElementById('registerAlert');
    const regEmail = document.getElementById('regEmail');
    const regPassword = document.getElementById('regPassword');
    const regConfirm = document.getElementById('regConfirmPassword');
    const passwordMatchFeedback = document.getElementById('passwordMatchFeedback');
    const emailCheckFeedback = document.getElementById('emailCheckFeedback');

    // Dummy email database
    const existingEmails = ['admin@gmail.com', 'test@gmail.com', 'user@gmail.com'];

    if (registerForm) {

        // ---- 3a. Dummy AJAX email check ----
        if (regEmail) {
            regEmail.addEventListener('input', function () {
                const val = this.value.trim().toLowerCase();
                if (!val) {
                    emailCheckFeedback.textContent = '';
                    emailCheckFeedback.className = 'mt-1 small fw-semibold';
                    return;
                }
                if (existingEmails.includes(val)) {
                    emailCheckFeedback.textContent = '❌ Email already exists';
                    emailCheckFeedback.className = 'mt-1 small fw-semibold text-danger';
                } else {
                    emailCheckFeedback.textContent = '✅ Email available';
                    emailCheckFeedback.className = 'mt-1 small fw-semibold text-success';
                }
            });
        }

        // ---- 3b. Password match real-time ----
        function checkPasswordMatch() {
            const pwd = regPassword.value;
            const confirm = regConfirm.value;

            if (!pwd || !confirm) {
                passwordMatchFeedback.textContent = '';
                passwordMatchFeedback.className = 'mt-1 small fw-semibold';
                return;
            }

            if (pwd === confirm) {
                passwordMatchFeedback.textContent = '✅ Passwords match';
                passwordMatchFeedback.className = 'mt-1 small fw-semibold text-success';
            } else {
                passwordMatchFeedback.textContent = '❌ Passwords do not match';
                passwordMatchFeedback.className = 'mt-1 small fw-semibold text-danger';
            }
        }

        if (regPassword && regConfirm) {
            regPassword.addEventListener('input', checkPasswordMatch);
            regConfirm.addEventListener('input', checkPasswordMatch);
        }

        // ---- 3c. Registration form submit ----
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            registerAlert.innerHTML = '';

            const fullName = document.getElementById('regFullName');
            const email = regEmail;
            const password = regPassword;
            const confirm = regConfirm;

            // Reset invalid
            [fullName, email, password, confirm].forEach(el => el.classList.remove('is-invalid'));

            let valid = true;

            // Full name
            if (!fullName.value.trim()) {
                fullName.classList.add('is-invalid');
                valid = false;
            }

            // Email
            if (!email.value || !email.value.includes('@') || !email.value.includes('.')) {
                email.classList.add('is-invalid');
                valid = false;
            }

            // Password length
            if (!password.value || password.value.length < 8) {
                password.classList.add('is-invalid');
                valid = false;
            }

            // Confirm password match
            if (password.value !== confirm.value) {
                confirm.classList.add('is-invalid');
                valid = false;
                // also show feedback
                passwordMatchFeedback.textContent = '❌ Passwords do not match';
                passwordMatchFeedback.className = 'mt-1 small fw-semibold text-danger';
            }

            // Check if email exists (dummy check)
            const emailVal = email.value.trim().toLowerCase();
            if (emailVal && existingEmails.includes(emailVal)) {
                email.classList.add('is-invalid');
                emailCheckFeedback.textContent = '❌ Email already exists';
                emailCheckFeedback.className = 'mt-1 small fw-semibold text-danger';
                valid = false;
            }

            if (valid) {
                registerAlert.innerHTML = `
                    <div class="alert alert-success alert-dismissible fade show mb-0" role="alert">
                        <i class="bi bi-check-circle-fill me-2"></i> Registration Successful!
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
                // Optionally reset form
                // registerForm.reset();
                // clear feedbacks
                // emailCheckFeedback.textContent = '';
                // passwordMatchFeedback.textContent = '';
            } else {
                registerAlert.innerHTML = `
                    <div class="alert alert-danger alert-dismissible fade show mb-0" role="alert">
                        <i class="bi bi-exclamation-triangle-fill me-2"></i> Please correct all errors.
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                `;
            }
        });
    }

    // ============================================
    // 4. ADDITIONAL: auto-hide alerts after 5s (optional)
    // ============================================
    document.querySelectorAll('.alert').forEach(alert => {
        setTimeout(() => {
            const bsAlert = new bootstrap.Alert(alert);
            bsAlert.close();
        }, 5000);
    });

});