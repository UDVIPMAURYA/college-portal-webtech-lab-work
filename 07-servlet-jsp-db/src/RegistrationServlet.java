// RegistrationServlet.java — Handles registration form submission,
// inserts the new user into the MySQL "users" table using a
// PreparedStatement to prevent SQL injection.

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class RegistrationServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String name = request.getParameter("name");
        String email = request.getParameter("email");
        String phone = request.getParameter("phone");
        String password = request.getParameter("password");

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        String insertQuery = "INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(insertQuery)) {

            stmt.setString(1, name);
            stmt.setString(2, email);
            stmt.setString(3, phone);
            stmt.setString(4, password);

            stmt.executeUpdate();

            out.println("<h2>Registration successful!</h2>");
            out.println("<p>Welcome, " + name + "</p>");

        } catch (SQLException e) {
            out.println("<h2>Registration failed.</h2>");
            out.println("<p>" + e.getMessage() + "</p>");
        }
    }
}