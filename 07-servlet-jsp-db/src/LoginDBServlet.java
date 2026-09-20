// LoginDBServlet.java — Authenticates a user against the MySQL
// users table (unlike Module 6's LoginServlet, which checked
// against 4 hardcoded users). On success, forwards to a JSP page
// that displays the logged-in user's details.

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginDBServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String email = request.getParameter("email");
        String password = request.getParameter("password");

        String selectQuery = "SELECT * FROM users WHERE email = ? AND password = ?";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(selectQuery)) {

            stmt.setString(1, email);
            stmt.setString(2, password);

            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {
                // Store the fetched user data as request attributes,
                // so the JSP page can read and display them.
                request.setAttribute("userName", rs.getString("name"));
                request.setAttribute("userEmail", rs.getString("email"));
                request.setAttribute("userPhone", rs.getString("phone"));

                // Forward the request to the JSP — the browser's URL
                // does not change, but the JSP handles the rendering.
                RequestDispatcher dispatcher = request.getRequestDispatcher("welcome.jsp");
                dispatcher.forward(request, response);
            } else {
                response.setContentType("text/html");
                response.getWriter().println("<h2>Login failed.</h2><p>Invalid email or password.</p>");
            }

        } catch (SQLException e) {
            response.setContentType("text/html");
            response.getWriter().println("<h2>Error:</h2><p>" + e.getMessage() + "</p>");
        }
    }
}