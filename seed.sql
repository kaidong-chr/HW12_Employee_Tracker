-- Departrment seed
USE employeesDB

INSERT INTO department (name)
VALUES ("Sales"),
("IT"),
("Management")

-- Role seed
INSERT INTO role (title, salary, department_id)
VALUES ("Account Manager", 50000, 3),
("Developer", 100000, 2),
("Manager", 150000, 1)

-- Employee Seed
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Richard", "Nixon", 3, null),
("Bob", "Dole", 2, null),
("George", "Washington", 1, 1),