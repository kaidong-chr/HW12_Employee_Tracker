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
          employeeSummary();
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