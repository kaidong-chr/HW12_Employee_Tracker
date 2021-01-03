-- Departrment seed
USE employeesDB;

INSERT INTO department (name)
VALUES ("Sales"),
("IT"),
("Management");

-- Role seed
INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 50000, 1),
("Developer", 100000, 2),
("Manager", 150000, 3);

-- Employee Seed
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Richard", "Nixon", 1),
("Bob", "Dole", 2),
("George", "Washington", 3)