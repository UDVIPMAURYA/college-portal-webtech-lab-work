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

// Handles login form submission (checks against users saved in localStorage)
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value;
            const messageBox = document.getElementById("login-message");

            const users = JSON.parse(localStorage.getItem("users")) || [];

            const matchedUser = users.find(function (user) {
                return user.email === email && user.password === password;
            });

            if (!matchedUser) {
                messageBox.textContent = "Invalid email or password.";
                messageBox.className = "form-message error";
                return;
            }

            // Save logged-in user (without password) for the navbar to read
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
    }
});