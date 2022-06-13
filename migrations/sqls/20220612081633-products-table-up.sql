CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE products (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    description VARCHAR(255),
    price integer NOT NULL,
    category VARCHAR(150) NOT NULL

);
