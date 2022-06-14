
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(60) UNIQUE,
    user_name VARCHAR(60) NOT NULL,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    password  VARCHAR(255) NOT NULL

);

ALTER SEQUENCE users_id_seq RESTART WITH 1;



