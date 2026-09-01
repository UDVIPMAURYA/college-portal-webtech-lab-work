// include.js — ye JS Django ke "extends base.html" jaisa kaam karta hai
function includeHTML(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(err => console.error("Include failed:", err));
}

// Page load hote hi header aur footer inject karo
document.addEventListener("DOMContentLoaded", function () {
    Promise.all([
        includeHTML("header-placeholder", "header.html"),
        includeHTML("footer-placeholder", "footer.html")
    ]).then(() => {
        document.getElementById("loading-spinner").classList.add("hide");
    });
});