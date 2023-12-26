# Create Database


# Create Database named - 'empchatappdb2' in mySql Workbench

# please dont change routing path; 


# refer- src folder in ReactApp , for login Functionality



# sql queries to add data for test


# insert Groups 
-- Group 1 (Angular)
INSERT INTO Mygroups (name, type) VALUES ('Angular', 'Technical');

-- Group 2 (React)
INSERT INTO Mygroups (name, type) VALUES ('React', 'Technical');

-- Group 3 (Support Team)
INSERT INTO Mygroups (name, type) VALUES ('Support Team', 'Functional');

-- Group 4 (Data Science)
INSERT INTO Mygroups (name, type) VALUES ('Data Science', 'Technical');

-- Group 5 (Sales Team)
INSERT INTO Mygroups (name, type) VALUES ('Sales Team', 'Functional');

-- Group 6 (Marketing)
INSERT INTO Mygroups (name, type) VALUES ('Marketing', 'Functional');



#insert Employees 
INSERT INTO employees (username, password, role) VALUES
    ('Admin1', 'adminpass1', 'admin'),
    ('Admin2', 'adminpass2', 'admin'),
    ('Admin3', 'adminpass3', 'admin'),
    ('Admin4', 'adminpass4', 'admin'),
    ('Admin5', 'adminpass5', 'admin'),
    ('Admin6', 'adminpass6', 'admin'),
    ('User1', 'userpass1', 'user'),
    ('User2', 'userpass2', 'user'),
    ('User3', 'userpass3', 'user'),
    ('User4', 'userpass4', 'user'),
    ('User5', 'userpass5', 'user'),
    ('User6', 'userpass6', 'user'),
    ('User7', 'userpass7', 'user'),
    ('User8', 'userpass8', 'user'),
    ('User9', 'userpass9', 'user'),
    ('User10', 'userpass10', 'user'),
    ('User11', 'userpass11', 'user'),
    ('User12', 'userpass12', 'user'),
    ('User13', 'userpass13', 'user'),
    ('User14', 'userpass14', 'user'),
    ('User15', 'userpass15', 'user'),
    ('User16', 'userpass16', 'user'),
    ('User17', 'userpass17', 'user'),
    ('User18', 'userpass18', 'user'),
    ('User19', 'userpass19', 'user'),
    ('User20', 'userpass20', 'user'),
    ('User21', 'userpass21', 'user'),
    ('User22', 'userpass22', 'user'),
    ('User23', 'userpass23', 'user'),
    ('User24', 'userpass24', 'user'),
    ('User25', 'userpass25', 'user')
    
    
    
# insert relationship in group and employee

-- Group 1 (Angular)
INSERT INTO group_employee (my_group_group_id, employees_employee_id) VALUES
    (1, 1), (1, 7), (1, 8), (1, 9), (1, 10), (1, 11), (1, 12), (1, 13), (1, 14), (1, 15), (1, 16);

-- Group 2 (React)
INSERT INTO group_employee (my_group_group_id, employees_employee_id) VALUES
    (2, 2), (2, 17), (2, 18), (2, 19), (2, 20), (2, 21), (2, 22), (2, 23), (2, 24), (2, 25), (2, 26);

-- Group 3 (Support Team)
INSERT INTO group_employee (my_group_group_id, employees_employee_id) VALUES
    (3, 3), (3, 27), (3, 28), (3, 29), (3, 30), (3, 31), (3, 32), (3, 33), (3, 34), (3, 35), (3, 36);





# insert messages

-- Messages for Group 1 (Angular) and its Employees
INSERT INTO Messages (employee_id, group_id, text, local_date_time) 
VALUES 
    (1, 1, 'Hello from User1 in Angular Group', '2023-01-01 10:00:00'),
    (7, 1, 'Hello from User7 in Angular Group', '2023-01-02 

-- Messages for Group 2 (React) and its Employees
INSERT INTO Messages (employee_id, group_id, text, local_date_time) 
VALUES 
    (2, 2, 'Hello from User2 in React Group', '2023-01-01 11:00:00'),
    (17, 2, 'Hello from User17 in React Group', '2023-01-02 12:00:00'),
  

-- Messages for Group 3 (Support Team) and its Employees
INSERT INTO Messages (employee_id, group_id, text, local_date_time) 
VALUES 
    (3, 3, 'Hello from User3 in Support Team Group', '2023-01-01 12:00:00'),
    (27, 3, 'Hello from User27 in Support Team Group', '2023-01-02 13:00:00'),
    (28, 3, 'Hello from User28 in Support Team Group', '2023-01-03 14:00:00'),
    (29, 3, 'Hello from User29 in Support Team Group', '2023-01-04 15:00:00')


-- Messages for Group 4 (Data Science) and its Employees
INSERT INTO Messages (employee_id, group_id, text, local_date_time) 
VALUES  
    (4, 4, 'Hello from User4 in Data Science Group', '2023-01-01 13:00:00'),
    (37, 4, 'Hello from User37 in Data Science Group', '2023-01-02 14:00:00'),
    (38, 4, 'Hello from User38 in Data Science Group', '2023-01-03 15:00:00'),
    (39, 4, 'Hello from User39 in Data Science Group', '2023-01-04 16:00:00'),
    (40, 4, 'Hello from User40 in Data Science Group', '2023-01-05 17:00:00')

-- Messages for Group 5 (Sales Team) and its Employees
INSERT INTO Messages (employee_id, group_id, text, local_date_time) 
VALUES  
    (5, 5, 'Hello from User5 in Sales Team Group', '2023-01-01 14:00:00'),
    (47, 5, 'Hello from User47 in Sales Team Group', '2023-01-02 15:00:00'),
    (48, 5, 'Hello from User48 in Sales Team Group', '2023-01-03 16:00:00'),
    (49, 5, 'Hello from User49 in Sales Team Group', '2023-01-04 17:00:00')
 

-- Messages for Group 6 (Marketing) and its Employees
INSERT INTO Messages (employee_id, group_id, text, local_date_time) 
VALUES 
    (6, 6, 'Hello from User6 in Marketing Group', '2023-01-01 15:00:00'),
    (57, 6, 'Hello from User57 in Marketing Group', '2023-01-02 16:00:00'),
    (58, 6, 'Hello from User58 in Marketing Group', '2023-01-03 17:00:00'),
    (59, 6, 'Hello from User59 in Marketing Group', '2023-01-04 18:00:00'),
    (60, 6, 'Hello from User60 in Marketing Group', '2023-01-05 19:00:00')





