CREATE DATABASE crud_task;

USE crud_task;

--USER tabel

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(20) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY(id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;


--table task
CREATE TABLE tasks(
    id INT(11) NOT NULL,
    title VARCHAR(20) NOT NULL,
    description TEXT NOT NULL,
    user_id INT(11),
    create_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE tasks
    ADD PRIMARY KEY (id);

ALTER TABLE tasks
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE tasks;