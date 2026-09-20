// ProductServlet.java — Displays a hardcoded list of products,
// each with an "Add to Cart" link.

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ProductServlet extends HttpServlet {

    private static final String[] PRODUCT_NAMES = { "Notebook", "Pen", "Backpack", "Calculator" };
    private static final double[] PRODUCT_PRICES = { 50.0, 10.0, 800.0, 300.0 };

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter out = response.getWriter();

        out.println("<h2>Available Products</h2>");
        out.println("<ul>");

        for (int i = 0; i < PRODUCT_NAMES.length; i++) {
            out.println("<li>" + PRODUCT_NAMES[i] + " - Rs. " + PRODUCT_PRICES[i] +
                    " <a href='AddToCartServlet?name=" + PRODUCT_NAMES[i] +
                    "&price=" + PRODUCT_PRICES[i] + "'>Add to Cart</a></li>");
        }

        out.println("</ul>");
        out.println("<a href='ViewCartServlet'>View Cart</a>");
    }
}