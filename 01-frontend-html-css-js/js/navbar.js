// Reads login state from localStorage and updates the navbar accordingly.
// Must run AFTER header.html has been injected into the page.
function updateNavbarAuthState() {
    const navGuest = document.getElementById("nav-guest");
    const navUser = document.getElementById("nav-user");
    const profileLink = document.getElementById("nav-profile-link");
    const logoutLink = document.getElementById("nav-logout-link");

    if (!navGuest || !navUser) {
        return;
    }

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser) {
        navGuest.classList.add("hidden");
        navUser.classList.remove("hidden");
        profileLink.textContent = loggedInUser.name;
    } else {
        navGuest.classList.remove("hidden");
        navUser.classList.add("hidden");
    }

    logoutLink.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    });
}