// Reads login state from localStorage and updates the navbar accordingly.
// Must run AFTER header.html has been injected into the page.
function updateNavbarAuthState() {
    const navGuest = document.getElementById("nav-guest");
    const navUser = document.getElementById("nav-user");

    if (!navGuest || !navUser) {
        return;
    }

    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        navGuest.classList.remove("hidden");
        navUser.classList.add("hidden");
        return;
    }

    navGuest.classList.add("hidden");
    navUser.classList.remove("hidden");

    const profileTrigger = document.getElementById("profile-trigger");
    const profileCard = document.getElementById("profile-card");
    const navAvatarInitial = document.getElementById("nav-avatar-initial");
    const navProfileName = document.getElementById("nav-profile-name");
    const cardAvatar = document.getElementById("profile-card-avatar");
    const cardName = document.getElementById("profile-card-name");
    const cardEmail = document.getElementById("profile-card-email");
    const logoutLink = document.getElementById("nav-logout-link");

    // Use the first letter of the name as a placeholder avatar
    // until profile photo upload is implemented.
    const initial = loggedInUser.name.charAt(0).toUpperCase();

    navAvatarInitial.textContent = initial;
    navProfileName.textContent = loggedInUser.name;
    cardAvatar.textContent = initial;
    cardName.textContent = loggedInUser.name;
    cardEmail.textContent = loggedInUser.email;

    // Toggle the dropdown card when the avatar/name is clicked.
    profileTrigger.addEventListener("click", function (event) {
        event.stopPropagation();
        profileCard.classList.toggle("hidden");
    });

    // Close the dropdown when clicking anywhere outside of it.
    document.addEventListener("click", function (event) {
        const clickedOutside = !profileCard.contains(event.target) && event.target !== profileTrigger;
        if (clickedOutside) {
            profileCard.classList.add("hidden");
        }
    });

    logoutLink.addEventListener("click", function (event) {
        event.preventDefault();
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
    });
}