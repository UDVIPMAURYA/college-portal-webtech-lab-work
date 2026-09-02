// Toggle Student/Faculty fields based on "Register As" selection
document.addEventListener("DOMContentLoaded", function () {
    const registerAsSelect = document.getElementById("registerAs");
    const studentFields = document.getElementById("student-fields");
    const staffFields = document.getElementById("staff-fields");

    registerAsSelect.addEventListener("change", function () {
        if (this.value === "student") {
            studentFields.classList.remove("hidden");
            staffFields.classList.add("hidden");
        } else {
            studentFields.classList.add("hidden");
            staffFields.classList.remove("hidden");
        }
    });
});

// Validates the registration form in real time (on blur) and on submission.
document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registration-form");

    if (!registrationForm) {
        return;
    }

    const phonePattern = /^[0-9]{10}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phone");
    const designationInput = document.getElementById("designation");
    const registerAsSelect = document.getElementById("registerAs");

    // Each function checks one field and returns true/false.
    // It also writes the error message directly into that field's error span.

    function validateName() {
        const value = nameInput.value.trim();
        const errorEl = document.getElementById("name-error");

        if (value === "") {
            errorEl.textContent = "Full name is required.";
            return false;
        }
        errorEl.textContent = "";
        return true;
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        const errorEl = document.getElementById("email-error");

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

    function validatePhone() {
        const value = phoneInput.value.trim();
        const errorEl = document.getElementById("phone-error");

        if (value === "") {
            errorEl.textContent = "Phone number is required.";
            return false;
        }
        if (!phonePattern.test(value)) {
            errorEl.textContent = "Phone number must be exactly 10 digits.";
            return false;
        }
        errorEl.textContent = "";
        return true;
    }

    function validateDesignation() {
        const errorEl = document.getElementById("designation-error");

        // Only required when Faculty or Staff is selected
        if (registerAsSelect.value === "student") {
            errorEl.textContent = "";
            return true;
        }

        const value = designationInput.value.trim();
        if (value === "") {
            errorEl.textContent = "Designation is required.";
            return false;
        }
        errorEl.textContent = "";
        return true;
    }

    // Check on blur (when the user leaves the field)
    nameInput.addEventListener("blur", validateName);
    emailInput.addEventListener("blur", validateEmail);
    phoneInput.addEventListener("blur", validatePhone);
    designationInput.addEventListener("blur", validateDesignation);

    // Clear the error as the user types, so it doesn't stay stuck
    // after they've already fixed the problem.
    nameInput.addEventListener("input", function () {
        if (nameInput.value.trim() !== "") {
            document.getElementById("name-error").textContent = "";
        }
    });
    emailInput.addEventListener("input", function () {
        if (emailPattern.test(emailInput.value.trim())) {
            document.getElementById("email-error").textContent = "";
        }
    });
    phoneInput.addEventListener("input", function () {
        if (phonePattern.test(phoneInput.value.trim())) {
            document.getElementById("phone-error").textContent = "";
        }
    });
    designationInput.addEventListener("input", function () {
        if (designationInput.value.trim() !== "") {
            document.getElementById("designation-error").textContent = "";
        }
    });

    // Final check on submit — runs all validators together
    registrationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isDesignationValid = validateDesignation();

        const isValid = isNameValid && isEmailValid && isPhoneValid && isDesignationValid;

        const messageBox = document.getElementById("registration-message");

        if (!isValid) {
            messageBox.textContent = "Please fix the errors above.";
            messageBox.className = "form-message error";
            return;
        }

        messageBox.textContent = "Registration successful!";
        messageBox.className = "form-message success";
    });
});