-- Make it so all of the following code will affect employeeTracker_db --
USE employeeTracker_db;

-- Seed data for the department table
INSERT INTO department (dept_name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

-- Seed data for the roles table
INSERT INTO roles (title, salary, department_id)
VALUES 
("Sales Lead", 100000, 1), 
("Salesperson", 80000, 1), 
("Lead Engineer", 150000, 2), 
("Software Engineer", 120000, 2), 
("Accountant", 125000, 3), 
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);

-- Seed data for the employee table
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUES 
("John", "Doe", null, 1), 
("Jane", "Austin", 1, 2), 
("Mike", "Chan", null, 3), 
("Ashley", "Crane", 3, 4), 
("Kevin", "Brown", null, 5), 
("Tom", "Allen", null, 6), 
("Sarah", "Ross", 6, 7);
