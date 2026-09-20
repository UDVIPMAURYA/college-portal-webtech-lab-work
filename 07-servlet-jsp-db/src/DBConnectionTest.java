// DBConnectionTest.java — A quick standalone test to verify the
// database connection works, before wiring it into a servlet.

import java.sql.Connection;

public class DBConnectionTest {
    public static void main(String[] args) {
        try {
            Connection conn = DBConnection.getConnection();
            System.out.println("Connection successful!");
            conn.close();
        } catch (Exception e) {
            System.out.println("Connection failed: " + e.getMessage());
        }
    }
}