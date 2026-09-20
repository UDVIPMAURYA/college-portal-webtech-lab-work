# 🎓 College Portal — Web Technology Lab (BCS552)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![XML](https://img.shields.io/badge/XML-DTD%20%7C%20XSLT-orange)
![Java](https://img.shields.io/badge/Java-ED8B00?logo=openjdk&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?logo=mysql&logoColor=white)
![Tomcat](https://img.shields.io/badge/Apache%20Tomcat-9.0-F8DC75?logo=apachetomcat&logoColor=black)
![Status](https://img.shields.io/badge/Status-All%2012%20Experiments%20Complete-brightgreen)

> 🎓 A unified, portfolio-grade implementation of the AKTU BCS552 Web
> Technology Lab syllabus — by **Udvip Maurya**

---

## 📌 Problem Statement

The BCS552 lab syllabus covers 12 experiments across 8 unrelated
technologies (HTML/CSS/JS, XML, Java Bean, Node.js, MongoDB, Servlet,
JSP). Done the standard way, these become 12 disconnected snippets
that get forgotten right after submission — not something you'd show
a recruiter, and not something that builds real understanding.

## 💡 Proposed Solution

This project reframes every experiment as a module of **one cohesive
web app** — a fictional college's website, registration system,
course catalog, and shopping cart — so each technology is learned in
the context of a real, connected product rather than in isolation.
Several modules go beyond the syllabus (a full auth system, a
dynamic navbar, real MySQL persistence) to make the end result
genuinely demo-able.

---

## 🛠️ Tech Stack & Tools

| Category | Tools / Technologies |
|---|---|
| Frontend | `HTML5`, `CSS3`, `JavaScript` (DOM, Fetch, Regex validation) |
| Data | `XML`, `DTD`, `XSLT` |
| Backend (Java) | `Servlet`, `JSP`, `JavaBean` |
| Server | `Apache Tomcat 9` |
| Databases | `MongoDB` (aggregation), `MySQL` (JDBC) |
| Scripting | `Node.js` (CLI utility) |
| Version Control | `Git` / `GitHub` |

---

## 📁 Modules

| # | Folder | Technology | Description |
|---|---|---|---|
| 1 | `01-frontend-html-css-js` | HTML, CSS, JS | Institute website, responsive design, JS-validated registration form, full signup/login/navbar system |
| 2 | `02-xml-data` | XML, DTD, XSL | Course catalog with DTD-validated structure, XSLT transformation, linked live into Module 1 via `DOMParser` |
| 3 | `03-java-bean` | Java Bean | Employee bean (EmpID, Name, Salary, Designation, Department) with encapsulation and validation |
| 4 | `04-nodejs-cli` | Node.js | Multi-command CLI utility — uppercase, factorial, password generator — with input bounds validation |
| 5 | `05-mongodb-aggregation` | MongoDB | Aggregation pipeline — grouping, filtering, sorting, averaging student records |
| 6 | `06-servlet-cookie-auth` | Servlet | Cookie-based login for 4 hardcoded users, deployed on Tomcat |
| 7 | `07-servlet-jsp-db` | Servlet + JSP + MySQL | Registration & login backed by a real MySQL table via JDBC `PreparedStatement`, rendered with JSP |
| 8 | `08-shopping-cart-session` | Servlet | Shopping cart tracked with `HttpSession` across requests |

---

## ⚙️ System Architecture (Modules 6–8)

```
Browser
   │  (form submit / link click)
   ▼
Apache Tomcat 9
   │  routes via web.xml <url-pattern>
   ▼
Servlet (Java)
   │  business logic, validation
   ▼
JDBC (PreparedStatement)  ──▶  MySQL Database
   │
   ▼
JSP  ──▶  renders response back to Browser
```

Session-based flows (Module 8) additionally store a small ID in a
cookie on the client, while the actual cart data lives server-side
in the servlet container's memory — not exposed to the browser.

---

## 🚀 How to Run

### Frontend (Module 1)
```bash
cd 01-frontend-html-css-js
# serve via a local dev server (e.g. VS Code Live Server) — 
# pages use fetch() for includes, so they need to run over HTTP
```

### XML (Module 2)
Open `02-xml-data/college.xml` directly in a browser to see the
XSLT-rendered view.

### Java Bean (Module 3)
```bash
cd 03-java-bean
javac Employee.java EmployeeDemo.java
java EmployeeDemo
```

### Node.js CLI (Module 4)
```bash
cd 04-nodejs-cli
node cli.js uppercase "hello"
node cli.js factorial 5
node cli.js password 12
```

### MongoDB (Module 5)
```bash
cd 05-mongodb-aggregation
mongosh college_portal seed-data.js
mongosh college_portal aggregation-queries.js
```

### Servlet / JSP / MySQL (Modules 6–8)
Modules 6–8 share one deployed Tomcat web app (`college-portal`),
since they build on each other. Requires **Apache Tomcat 9** and,
from Module 7 onward, a running **MySQL** server.

1. Compile each module's `.java` files with the Servlet API (and,
   for Module 7+, the MySQL Connector/J jar) on the classpath:
   ```bash
   javac --release 21 -cp "<servlet-api.jar>;<mysql-connector.jar>" *.java
   ```
2. Create `<tomcat>/webapps/college-portal/`.
3. Copy each module's `web/` contents (HTML, JSP, `WEB-INF/web.xml`)
   into it, merging the `<servlet>` / `<servlet-mapping>` entries
   from each module's `web.xml` into one combined file.
4. Copy each module's compiled `.class` files into
   `webapps/college-portal/WEB-INF/classes/`.
5. For Module 7: copy `mysql-connector-j-*.jar` into `<tomcat>/lib/`,
   and create `db.properties` in `WEB-INF/classes/` from
   `07-servlet-jsp-db/src/db.properties.example` with your own MySQL
   credentials (gitignored — never committed).
6. Start Tomcat (`<tomcat>/bin/startup.bat`) and visit
   `http://localhost:8080/college-portal/`.

---

## 📊 Highlights Beyond the Syllabus

- 🔐 Full client-side auth demo (signup/login/forgot-password) with a
  dynamic profile-dropdown navbar
- 🔁 Live data flow from XML straight into the Module 1 UI, rather
  than a standalone XSLT demo
- 🛡️ SQL Injection–safe database access via `PreparedStatement`
- 🙈 Credentials kept out of version control via a gitignored
  `.properties` file, with a committed `.example` template

---

## 📌 Status

✅ All 12 AKTU BCS552 lab experiments complete, across 8 modules.

## 👤 Author

**Udvip Maurya** — B.Tech CSE, AKTU
