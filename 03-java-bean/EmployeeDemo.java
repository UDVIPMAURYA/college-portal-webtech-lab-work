// EmployeeDemo.java — A simple driver class to demonstrate creating
// an Employee bean, setting its properties via setters, and reading
// them back via getters.

public class EmployeeDemo {

    public static void main(String[] args) {
        Employee emp = new Employee();

        emp.setEmpId("E101");
        emp.setName("Rakesh Kumar");
        emp.setSalary(45000.00);
        emp.setDesignation("Assistant Professor");
        emp.setDepartment("Computer Science & Engineering");

        System.out.println("Employee Details:");
        System.out.println("ID: " + emp.getEmpId());
        System.out.println("Name: " + emp.getName());
        System.out.println("Salary: " + emp.getSalary());
        System.out.println("Designation: " + emp.getDesignation());
        System.out.println("Department: " + emp.getDepartment());
    }
}