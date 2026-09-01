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