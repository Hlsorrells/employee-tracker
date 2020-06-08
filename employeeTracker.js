// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");

// Create the connection to the sql database
const connection = mysql.createConnection({
    host: "localhost",
    // Port selection
    port: 3306,
    user: "root",
    password: "root",
    database: "employeeTracker_db"
});

// Connect to the mysql server and sql database
connection.connect(err => {
    if (err) throw err;
    // Run the start function after the connection is made to prompt the user
    start();
});

// Prompts the start menu
function start() {
    inquirer
        .prompt({
            name: "operationSelection",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Departments", "View All Roles", "Create a New Department", "Create a New Role", "EXIT"]
        })
        .then(answer => {
            // Based on their answer, call the appropriate function when finished prompting
            if (answer.operationSelection === "View All Employees") {
                viewAllEmployees();
            }
            else if (answer.operationSelection === "View All Departments") {
                viewAllDepartments();
            }
            else if (answer.operationSelection === "View All Roles") {
                viewAllRoles();
            }
            else if (answer.operationSelection === "Create a New Department") {
                addDepartment();
            }
            else if (answer.operationSelection === "Create a New Role") {
                addRole();
            }
            else {
                connection.end();
            }
        });
};// end of start() fct def

// View all of the employees joined with role and department table information
function viewAllEmployees() {
    // Execute query to retrieve all employees from db
    connection.query(
        "SELECT A.id AS employeeID, A.first_name, A.last_name, roles.title, roles.salary, department.dept_name, concat(B.first_name, '', B.last_name) AS managerName FROM employee A LEFT JOIN employee B ON A.manager_id = B.id LEFT JOIN roles ON A.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            // Re-prompt the user for next action
            start();
        }
    );
};// end of viewAllEmployees() fct def

// View all the departments in the department table of the db
function viewAllDepartments() {
    // Execute query to retrieve all departments from db
    connection.query(
        "SELECT dept_name FROM department",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            // Re-prompt the user for next action
            start();
        }
    );
};// end of viewAllDepartments() fct def

// View all the roles joined with department name from the department table of db
function viewAllRoles() {
    // Execute query to retrieve all roles from db
    connection.query(
        "SELECT department.dept_name, title, salary FROM roles LEFT JOIN department ON roles.department_id = department.id",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            // Re-prompt the user for next action
            start();
        }
    );
};// end of viewAllRoles() fct def

// Add a new department to the department table in db
function addDepartment() {
    inquirer
        .prompt({
            name: "departmentSelection",
            type: "input",
            message: "Which department would you like to create?"
        })
        .then(answer => {
            // Capitalization of each word in a string
            const newDept = capitalization(answer.departmentSelection)

            // Insert new department name into department table
            connection.query(
                "INSERT INTO department (dept_name) VALUE (?)",
                [newDept],
                (err, res) => {
                    if (err) throw err;
                    console.log(`You have added ${newDept} to the department table.`);
                    // Re-prompt the user for next action
                    start();
                }
            );
        });
};// end of addDepartment() fct def

// Global variable to contain dynamic department list
const deptList = [];

// Retrieve department list including id field
async function departmentList() {
    connection.query(
        "SELECT id, dept_name FROM department",
        (err, res) => {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                deptList.push(`${res[i].id}) ${res[i].dept_name}`);
            }
        }
    )
};//end departmentList() fct def

// Add a new role to the role table in db
async function addRole() {
    // Prompt user for new role information
    departmentList()
    inquirer
        .prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of the new role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for the new position?"
            },
            {
                name: "department",
                type: "list",
                message: "Which department will be assigned the new role?",
                choices: deptList
            }
        ])//end .prompt()
        .then(answer => {
            let title = answer.title
            let salary = answer.salary
            let deptID = parseInt(answer.department.split(")")[0])
            let deptName = answer.department.split(") ")[1]
            // Insert new department name into department table
            connection.query(
                "INSERT INTO roles (title, salary, department_id) VALUES (?,?,?)",
                [title, salary, deptID],
                (err, res) => {
                    if (err) throw err;
                    console.log(`The role of ${title} with a salary of ${salary} has been added to the ${deptName} department.`);
                    // Re-prompt the user for next action
                    start();
                }
            );
        })
};// end addRole() fct def

// Capitalization of each word in a string
function capitalization(str) {
    let words = str.split(" ")
    let capWords = words.map(
        word => word.charAt(0).toUpperCase() + word.substring(1)
    )
    return capWords.join(" ")
}// end of capitalization() fct def
