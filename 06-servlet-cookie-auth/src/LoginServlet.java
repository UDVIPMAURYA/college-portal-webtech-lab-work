// LoginServlet.java — Handles login by checking submitted username/password
// against four hardcoded users, then sets a cookie containing the
// authenticated username if the credentials match.

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginServlet extends HttpServlet {

    private static final String[] USER_IDS = { "user1", "user2", "user3", "user4" };
    private static final String[] PASSWORDS = { "pwd1", "pwd2", "pwd3", "pwd4" };

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String enteredUser = request.getParameter("username");
        String enteredPass = request.getParameter("password");

        boolean isValid = false;

        for (int i = 0; i < USER_IDS.length; i++) {
            if (USER_IDS[i].equals(enteredUser) && PASSWORDS[i].equals(enteredPass)) {
                isValid = true;
                break;
            }
        }

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        if (isValid) {
            Cookie userCookie = new Cookie("loggedInUser", enteredUser);
            userCookie.setMaxAge(60 * 30);
            response.addCookie(userCookie);

            out.println("<h2>Login successful!</h2>");
            out.println("<p>Welcome, " + enteredUser + "</p>");
        } else {
            out.println("<h2>Login failed.</h2>");
            out.println("<p>Invalid username or password.</p>");
        }
    }
}