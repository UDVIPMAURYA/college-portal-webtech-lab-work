// Fetches department data from the Module 2 XML file, parses it,
// and dynamically builds the departments table. This demonstrates
// the original real-world use case of XML: JavaScript consuming
// structured data fetched from a separate source (the same idea AJAX
// was originally built around, before JSON became common).
document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("departments-table-body");

    if (!tableBody) {
        return;
    }

    fetch("../02-xml-data/departments.xml")
        .then(function (response) {
            return response.text();
        })
        .then(function (xmlText) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");

            // Check for parsing errors (e.g. malformed XML)
            const parseError = xmlDoc.querySelector("parsererror");
            if (parseError) {
                console.error("XML parsing failed:", parseError.textContent);
                return;
            }

            const departments = xmlDoc.querySelectorAll("department");

            departments.forEach(function (dept) {
                const name = dept.querySelector("name").textContent;
                const hod = dept.querySelector("hod").textContent;
                const established = dept.querySelector("established").textContent;
                const intake = dept.querySelector("intake").textContent;

                const row = document.createElement("tr");
                row.innerHTML =
                    "<td>" + name + "</td>" +
                    "<td>" + hod + "</td>" +
                    "<td>" + established + "</td>" +
                    "<td>" + intake + "</td>";

                tableBody.appendChild(row);
            });
        })
        .catch(function (err) {
            console.error("Failed to load department data:", err);
        });
});