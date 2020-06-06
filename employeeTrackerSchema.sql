-- Drops the employeeTracker_db if it exists currently --
DROP DATABASE IF EXISTS employeeTracker_db;

-- Creates the "employeeTracker_db" database --
CREATE DATABASE employeeTracker_db;

-- Make it so all of the following code will affect employeeTracker_db --
USE employeeTracker_db;

-- Creates the table "department" within employeeTracker_db --
CREATE TABLE department (
id TINYINT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL
);

-- Creates the table "roles" within employeeTracker_db --
CREATE TABLE roles (
  id TINYINT AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id TINYINT,
  -- Primary Key for Roles table
  PRIMARY KEY(id),
  -- Foriegn Key to Department Table
  FOREIGN KEY(department_id) REFERENCES department(id)
);

-- Creates the table "employee" within employeeTracker_db --
CREATE TABLE employee (
    id SMALLINT AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    manager_id SMALLINT,
    roles_id TINYINT,
    -- Primary Key for Employee Table
    PRIMARY KEY(id),    
    -- Self-Referencing Key to Employee Table
    FOREIGN KEY(manager_id) REFERENCES employee(id),
    -- Foriegn Key to Roles Table
    FOREIGN KEY(roles_id) REFERENCES roles(id)
);
