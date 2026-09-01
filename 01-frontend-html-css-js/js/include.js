// include.js — dynamically injects reusable HTML fragments (like header/footer)
// into placeholder elements, similar to a templating "include" mechanism.
function includeHTML(id, file) {
    return fetch(file, { cache: "no-store" })
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(err => console.error("Include failed:", err));
}

// Once the page has loaded, inject the header and footer.
// After both are injected, hide the loading spinner and update
// the navbar's login/logout state (this must run AFTER the header
// exists in the DOM, since the nav elements live inside header.html).
document.addEventListener("DOMContentLoaded", function () {
    Promise.all([
        includeHTML("header-placeholder", "header.html"),
        includeHTML("footer-placeholder", "footer.html")
    ]).then(() => {
        document.getElementById("loading-spinner").classList.add("hide");
        updateNavbarAuthState();
    });
});