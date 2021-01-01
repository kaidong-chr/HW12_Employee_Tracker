const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const logo = require("asciiart-logo");

// Database promise - https://codeburst.io/node-js-mysql-and-promises-4c3be599909b
class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }

    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}

// Connect to our database
const connection = new Database({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "homework",
  database: "employeesDB"
});


// Asciiart Logo
console.log(
  logo({
    name: "Employee Management Tracker",
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
runSearch = () => {
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
viewEmployeeSummary = () => {
  connection.query('SELECT e.id, e.first_name AS "First Name", e.last_name AS "Last Name", title AS Title, salary AS Salary, name AS Department, CONCAT(m.first_name, " ", m.last_name) AS Manager FROM employee e LEFT JOIN employee m ON e.manager_id = m.id INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id', (err, res) => {
    if (err) throw err;
    console.table(res);
    runSearch();
  })
};

// View Roles table
viewRoles = () => {
  connection.query('SELECT r.id, title, salary, name AS department FROM role r LEFT JOIN department d ON department_id = d.id', (err, res) => {
      if (err) throw err;
      console.table(res);
      runSearch();
  })
};

// View Departments table
viewDepartments = () => {
  connection.query('SELECT id, name AS department FROM department', (err, res) => {
      if (err) throw err;
      console.table(res);
      runSearch();
  })
};

// Edit employees options
editEmployees = () => {
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

// Add employee with options
addEmployee = async () =>  {
  let roleChoices = await connection.query('SELECT id, title FROM role');
  let mgrChoices = await connection.query('SELECT id, CONCAT(first_name, " ", last_name) AS Manager FROM employee');
  mgrChoices.unshift({ id: null, Manager: "None" });

    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "Enter employee's first name:",
        },
        {
            name: "lastName",
            type: "input",
            message: "Enter employee's last name:",
        },
        {
            name: "role",
            type: "list",
            message: "Choose employee role:",
            choices: roleChoices.map(obj => obj.title)
        },
        {
            name: "manager",
            type: "list",
            message: "Choose the employee's manager:",
            choices: mgrChoices.map(obj => obj.Manager)
        }
    ]).then(answers => {
        let roleDetail = roleChoices.find(obj => obj.title === answers.role);
        let manager = mgrChoices.find(obj => obj.Manager === answers.manager);
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)", [[answers.firstName.trim(), answers.lastName.trim(), roleDetail.id, manager.id]]);
        console.log(`${answers.firstName} ${answers.lastName} has been added to the database.`);
        runSearch();
    });
}

  

// Update employee role with options

// Update manager with options

// Remove employee


// Edit roles options
editRoles = () => {
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



// Edit department options
editDepartments = () => {
  inquirer.prompt({
      name: "editDepartment",
      type: "list",
      message: "What would you like to update?",
      choices: [
          "Add New Department",
          "Remove Department",
          "Main Menu"
      ]
  }).then(answer => {
      switch (answer.editDepartment) {
          case "Add New Department":
              addDepartment();
              break;
          case "Remove Department":
              removeDepartment();
              break;
          case "Main Menu":
              runSearch();
              break;
      }
  })
};

runSearch();