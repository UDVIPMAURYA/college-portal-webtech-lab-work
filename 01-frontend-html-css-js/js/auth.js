// Handles signup form submission and stores user in localStorage (demo only)
document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");

    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("signupName").value.trim();
            const email = document.getElementById("signupEmail").value.trim();
            const password = document.getElementById("signupPassword").value;
            const messageBox = document.getElementById("signup-message");

            // Get existing users list, or start a new empty list
            const users = JSON.parse(localStorage.getItem("users")) || [];

            // Check if email is already registered
            const alreadyExists = users.some(function (user) {
                return user.email === email;
            });

            if (alreadyExists) {
                messageBox.textContent = "An account with this email already exists.";
                messageBox.className = "form-message error";
                return;
            }

            // Save new user
            users.push({ name: name, email: email, password: password });
            localStorage.setItem("users", JSON.stringify(users));

            messageBox.textContent = "Account created successfully! Redirecting to login...";
            messageBox.className = "form-message success";

            setTimeout(function () {
                window.location.href = "login.html";
            }, 1500);
        });
    }
});