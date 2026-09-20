// ViewCartServlet.java — Displays all items currently in the
// user's session-based cart, along with the total price.

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class ViewCartServlet extends HttpServlet {

    @Override
    @SuppressWarnings("unchecked")
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        HttpSession session = request.getSession(false);

        out.println("<h2>Your Cart</h2>");

        if (session == null || session.getAttribute("cart") == null) {
            out.println("<p>Your cart is empty.</p>");
        } else {
            ArrayList<String> cart = (ArrayList<String>) session.getAttribute("cart");
            out.println("<ul>");
            for (String item : cart) {
                out.println("<li>" + item + "</li>");
            }
            out.println("</ul>");
            out.println("<p>Total items: " + cart.size() + "</p>");
        }

        out.println("<a href='ProductServlet'>Continue Shopping</a>");
    }
}