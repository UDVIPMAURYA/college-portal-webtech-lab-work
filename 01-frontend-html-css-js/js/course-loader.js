// Fetches course and student data from the Module 2 XML file (college.xml)
// and dynamically builds two tables — same DOMParser pattern used for
// the departments page, reused here for a different XML source.
document.addEventListener("DOMContentLoaded", function () {
    const coursesBody = document.getElementById("courses-table-body");
    const studentsBody = document.getElementById("students-table-body");

    if (!coursesBody || !studentsBody) {
        return;
    }

    fetch("../02-xml-data/college.xml")
        .then(function (response) {
            return response.text();
        })
        .then(function (xmlText) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");

            const parseError = xmlDoc.querySelector("parsererror");
            if (parseError) {
                console.error("XML parsing failed:", parseError.textContent);
                return;
            }

            const courses = xmlDoc.querySelectorAll("course");
            courses.forEach(function (course) {
                const id = course.getAttribute("id");
                const name = course.querySelector("name").textContent;
                const credits = course.querySelector("credits").textContent;

                const row = document.createElement("tr");
                row.innerHTML =
                    "<td>" + id + "</td>" +
                    "<td>" + name + "</td>" +
                    "<td>" + credits + "</td>";

                coursesBody.appendChild(row);
            });

            const students = xmlDoc.querySelectorAll("student");
            students.forEach(function (student) {
                const rollNo = student.getAttribute("rollNo");
                const name = student.querySelector("name").textContent;
                const enrolledCourse = student.querySelector("enrolledCourse").textContent;

                const row = document.createElement("tr");
                row.innerHTML =
                    "<td>" + rollNo + "</td>" +
                    "<td>" + name + "</td>" +
                    "<td>" + enrolledCourse + "</td>";

                studentsBody.appendChild(row);
            });
        })
        .catch(function (err) {
            console.error("Failed to load course data:", err);
        });
});