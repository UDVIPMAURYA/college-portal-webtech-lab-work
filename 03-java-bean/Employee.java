// Employee.java — A JavaBean representing employee/faculty information.
// Follows the standard JavaBean conventions: private fields,
// public getters/setters, and a public no-argument constructor.

public class Employee {

    private String empId;
    private String name;
    private double salary;
    private String designation;
    private String department;

    // No-argument constructor — required by the JavaBean convention
    public Employee() {
    }

    // Getter and setter for empId
    public String getEmpId() {
        return empId;
    }

    public void setEmpId(String empId) {
        this.empId = empId;
    }

    // Getter and setter for name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter and setter for salary
    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        // Basic validation — a real-world benefit of using getters/setters
        // instead of letting other code touch the field directly.
        if (salary < 0) {
            throw new IllegalArgumentException("Salary cannot be negative.");
        }
        this.salary = salary;
    }

    // Getter and setter for designation
    public String getDesignation() {
        return designation;
    }

    public void setDesignation(String designation) {
        this.designation = designation;
    }

    // Getter and setter for department
    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}



