// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// Create the connection to the sql database
var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "employeeTracker_db"
});

// Connect to the mysql server and sql database
connection.connect(err => {
    if (err) throw err;
    // Run the start function after the connection is made to prompt the user
    start();
});

// Prompts the user for action
function start() {
    inquirer
        .prompt({
            name: "operationSelection",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "View All Departments", "EXIT"]
        })
        .then(answer => {
            // Based on their answer, call the appropriate function when finished prompting
            if (answer.operationSelection === "View All Employees") {
                viewAllEmployees();
            }
            else if (answer.operationSelection === "View All Departments") {
                viewAllDepartments();
            }
            else {
                connection.end();
            }
        });
}

function viewAllEmployees() {
    // Execute query to retrieve all employees from db
    connection.query(
        "SELECT A.id AS employeeID, A.first_name, A.last_name, roles.title, roles.salary, department.dept_name, concat(B.first_name, '', B.last_name) AS managerName FROM employee A LEFT JOIN employee B ON A.manager_id = B.id LEFT JOIN roles ON A.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            // re-prompt the user for next action
            start();
        }
    );
}

function viewAllDepartments() {
    // Execute query to retrieve all departments from db
    connection.query(
        "SELECT dept_name FROM department",
        (err, res) => {
            if (err) throw err;
            console.table(res);
            // re-prompt the user for next action
            start();
        }
    )
}
