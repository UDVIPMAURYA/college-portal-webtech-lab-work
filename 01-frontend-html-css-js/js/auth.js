const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ===== SIGNUP =====
document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");

    if (!signupForm) {
        return;
    }

    const nameInput = document.getElementById("signupName");
    const emailInput = document.getElementById("signupEmail");
    const passwordInput = document.getElementById("signupPassword");

    function validateSignupName() {
        const errorEl = document.getElementById("signupName-error");
        if (nameInput.value.trim() === "") {
            errorEl.textContent = "Full name is required.";
            return false;
        }
        errorEl.textContent = "";
        return true;
    }

    function validateSignupEmail() {
        const errorEl = document.getElementById("signupEmail-error");
        const value = emailInput.value.trim();
        if (value === "") {
            errorEl.textContent = "Email is required.";
            return false;
        }
        if (!emailPattern.test(value)) {
            errorEl.textContent = "Enter a valid email address.";
            return false;
        }
        errorEl.textContent = "";
        return true;
    }

    function validateSignupPassword() {
        const errorEl = document.getElementById("signupPassword-error");
        const value = passwordInput.value;
        if (value === "") {
            errorEl.textContent = "Password is required.";
            return false;
        }
        if (value.length < 6) {
            errorEl.textContent = "Password must be at least 6 characters.";
            return false;
        }
        errorEl.textContent = "";
        return true;
    }

    nameInput.addEventListener("blur", validateSignupName);
    emailInput.addEventListener("blur", validateSignupEmail);
    passwordInput.addEventListener("blur", validateSignupPassword);

    nameInput.addEventListener("input", function () {
        if (nameInput.value.trim() !== "") document.getElementById("signupName-error").textContent = "";
    });
    emailInput.addEventListener("input", function () {
        if (emailPattern.test(emailInput.value.trim())) document.getElementById("signupEmail-error").textContent = "";
    });
    passwordInput.addEventListener("input", function () {
        if (passwordInput.value.length >= 6) document.getElementById("signupPassword-error").textContent = "";
    });

    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const isNameValid = validateSignupName();
        const isEmailValid = validateSignupEmail();
        const isPasswordValid = validateSignupPassword();
        const messageBox = document.getElementById("signup-message");

        if (!isNameValid || !isEmailValid || !isPasswordValid) {
            messageBox.textContent = "Please fix the errors above.";
            messageBox.className = "form-message error";
            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const alreadyExists = users.some(function (user) {
            return user.email === email;
        });

        if (alreadyExists) {
            document.getElementById("signupEmail-error").textContent = "An account with this email already exists.";
            messageBox.textContent = "Please fix the errors above.";
            messageBox.className = "form-message error";
            return;
        }

        users.push({ name: name, email: email, password: password });
        localStorage.setItem("users", JSON.stringify(users));

        messageBox.textContent = "Account created successfully! Redirecting to login...";
        messageBox.className = "form-message success";

        setTimeout(function () {
            window.location.href = "login.html";
        }, 1500);
    });
});

// ===== LOGIN =====
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    if (!loginForm) {
        return;
    }

    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");

    function validateLoginEmail() {
        const errorEl = document.getElementById("loginEmail-error");
        const value = emailInput.value.trim();
        if (value === "") {
            errorEl.textContent = "Email is required.";
            return false;
        }
        if (!emailPattern.test(value)) {
            errorEl.textContent = "Enter a valid email address.";
            return false;
        }
        errorEl.textContent = "";
        return true;
    }

    function validateLoginPassword() {
        const errorEl = document.getElementById("loginPassword-error");
        if (passwordInput.value === "") {
            errorEl.textContent = "Password is required.";
            return false;
        }
        errorEl.textContent = "";
        return true;
    }

    emailInput.addEventListener("blur", validateLoginEmail);
    passwordInput.addEventListener("blur", validateLoginPassword);

    emailInput.addEventListener("input", function () {
        if (emailPattern.test(emailInput.value.trim())) document.getElementById("loginEmail-error").textContent = "";
    });
    passwordInput.addEventListener("input", function () {
        if (passwordInput.value !== "") document.getElementById("loginPassword-error").textContent = "";
    });

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const isEmailValid = validateLoginEmail();
        const isPasswordValid = validateLoginPassword();
        const messageBox = document.getElementById("login-message");

        if (!isEmailValid || !isPasswordValid) {
            messageBox.textContent = "Please fix the errors above.";
            messageBox.className = "form-message error";
            return;
        }

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const matchedUser = users.find(function (user) {
            return user.email === email && user.password === password;
        });

        if (!matchedUser) {
            messageBox.textContent = "Invalid email or password.";
            messageBox.className = "form-message error";
            return;
        }

        localStorage.setItem("loggedInUser", JSON.stringify({
            name: matchedUser.name,
            email: matchedUser.email
        }));

        messageBox.textContent = "Login successful! Redirecting...";
        messageBox.className = "form-message success";

        setTimeout(function () {
            window.location.href = "index.html";
        }, 1000);
    });
});

// ===== FORGOT PASSWORD (unchanged from before) =====
document.addEventListener("DOMContentLoaded", function () {
    const verifyEmailBtn = document.getElementById("verify-email-btn");

    if (verifyEmailBtn) {
        const stepEmail = document.getElementById("step-email");
        const stepNewPassword = document.getElementById("step-new-password");
        const emailMessage = document.getElementById("email-message");
        let verifiedEmail = null;

        verifyEmailBtn.addEventListener("click", function () {
            const email = document.getElementById("resetEmail").value.trim();
            const users = JSON.parse(localStorage.getItem("users")) || [];

            const foundUser = users.find(function (user) {
                return user.email === email;
            });

            if (!foundUser) {
                emailMessage.textContent = "No account found with this email.";
                emailMessage.className = "form-message error";
                return;
            }

            verifiedEmail = email;
            emailMessage.textContent = "Email verified. Set your new password below.";
            emailMessage.className = "form-message success";

            stepNewPassword.classList.remove("hidden");
        });

        document.getElementById("forgot-password-form").addEventListener("submit", function (event) {
            event.preventDefault();

            const newPassword = document.getElementById("newPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value;
            const resetMessage = document.getElementById("reset-message");

            if (newPassword !== confirmPassword) {
                resetMessage.textContent = "Passwords do not match.";
                resetMessage.className = "form-message error";
                return;
            }

            const users = JSON.parse(localStorage.getItem("users")) || [];

            const updatedUsers = users.map(function (user) {
                if (user.email === verifiedEmail) {
                    user.password = newPassword;
                }
                return user;
            });

            localStorage.setItem("users", JSON.stringify(updatedUsers));

            resetMessage.textContent = "Password reset successful! Redirecting to login...";
            resetMessage.className = "form-message success";

            setTimeout(function () {
                window.location.href = "login.html";
            }, 1500);
        });
    }
});