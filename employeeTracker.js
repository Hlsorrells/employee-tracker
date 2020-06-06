// Dependencies
var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
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

// connect to the mysql server and sql database
connection.connect(err => {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

// function which prompts the user for what action they should take
function start() {
    inquirer
        .prompt({
            name: "operationSelection",
            type: "list",
            message: "What would you like to do?",
            choices: ["View All Employees", "EXIT"]
        })
        .then(function (answer) {
            // based on their answer, call the appropriate function
            if (answer.operationSelection === "View All Employees") {
                // when finished prompting, execute query to retrieve all employees from db
                viewAllEmployees();
            }
            else {
                connection.end();
            }
        });
}

function viewAllEmployees() {
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
