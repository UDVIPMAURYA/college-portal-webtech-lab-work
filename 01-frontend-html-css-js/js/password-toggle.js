// Adds show/hide functionality to any password field marked with
// a sibling button of class "toggle-password" and a data-target
// attribute pointing to the input's id. Works across all pages
// without needing separate code per form.
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".toggle-password").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const targetId = btn.getAttribute("data-target");
            const input = document.getElementById(targetId);

            if (input.type === "password") {
                input.type = "text";
                btn.textContent = "Hide";
            } else {
                input.type = "password";
                btn.textContent = "Show";
            }
        });
    });
});