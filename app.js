const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const logo = require("asciiart-logo");

let connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "homework",
  database: "employeesDB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

// Asciiart Logo
console.log(
  logo({
    name: "Employee Management Interface",
    font: "Speed",
    lineChars: 1,
    padding: 2,
    margin: 1,
    borderColor: "gold",
    logoColor: "white",
    textColor: "blue",
    version: "1.0.0"
  }).render()
)

// Main options
function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
            "Edit Employee Info",
            "View Roles",
            "Edit Roles",
            "View Departments",
            "Edit Departments"
      ]
    })
    .then(answer => {
      switch (answer.action) {
        case "View All Employees":
          viewEmployeeSummary();
          break;
      case "Edit Employee Info":
          editEmployees();
          break;
      case "View Roles":
          viewRoles();
          break;
      case "Edit Roles":
          editRoles();
          break;
      case "View Departments":
          viewDepartments();
          break;
      case "Edit Departments":
          editDepartments();
          break;
      }
    });
}

// View Employee Summary Table
function viewEmployeeSummary() {
  connection.query('SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", title AS Title, salary AS Salary, name AS Department, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id', (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
  })
};

// View Roles table
function viewRoles() {
  connection.query('SELECT r.id, title, salary, name AS department FROM role r LEFT JOIN department d ON department_id = d.id', (err, res) => {
      if (err) throw err;
      console.table(res);
      runSearch();
  })
};

// VIew Departments table
function viewDepartments() {
  connection.query('SELECT id, name AS department FROM department', (err, res) => {
      if (err) throw err;
      console.table(res);
      runSearch();
  })
};

// Edit employees options
function editEmployees() {
  inquirer.prompt({
      name: "editEmployees",
      type: "list",
      message: "What would you like to update?",
      choices: [
          "Add New Employee",
          "Update Employee Role",
          "Update Employee Manager",
          "Remove Employee",
          "Main Menu"
      ]
  }).then(answer => {
      switch (answer.editEmployees) {
          case "Add New Employee":
              addEmployee();
              break;
          case "Update Employee Role":
              updateEmployeeRole();
              break;
          case "Update Employee Manager":
              updateManager();
              break;
          case "Remove Employee":
              removeEmployee();
              break;
          case "Main Menu":
              runSearch();
              break;
      }
  })
};

// Edit roles options
function editRoles() {
  inquirer.prompt({
      name: "editRoles",
      type: "list",
      message: "What would you like to update?",
      choices: [
          "Add New Role",
          "Update Role",
          "Remove Role",
          "Main Menu"
      ]
  }).then(answer => {
      switch (answer.editRoles) {
          case "Add New Role":
              addRole();
              break;
          case "Update Role":
              updateRole();
              break;
          case "Remove Role":
              removeRole();
              break;
          case "Main Menu":
              runSearch();
              break;
      }
  })
};

