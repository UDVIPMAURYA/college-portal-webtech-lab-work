// AddToCartServlet.java — Adds a product to the user's cart,
// which is stored in their HttpSession.

import java.io.IOException;
import java.util.ArrayList;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class AddToCartServlet extends HttpServlet {

    @Override
    @SuppressWarnings("unchecked")
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        String name = request.getParameter("name");
        double price = Double.parseDouble(request.getParameter("price"));

        // getSession(true) — if a session already exists for this
        // browser, reuse it; otherwise, create a new one.
        HttpSession session = request.getSession(true);

        ArrayList<String> cart = (ArrayList<String>) session.getAttribute("cart");

        if (cart == null) {
            cart = new ArrayList<>();
        }

        cart.add(name + " - Rs. " + price);
        session.setAttribute("cart", cart);

        response.setContentType("text/html");
        response.getWriter().println(
                "<p>" + name + " added to cart!</p>" +
                "<a href='ProductServlet'>Continue Shopping</a> | " +
                "<a href='ViewCartServlet'>View Cart</a>"
        );
    }
}