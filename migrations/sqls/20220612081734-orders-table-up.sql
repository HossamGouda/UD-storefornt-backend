CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE oders (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    status VARCHAR(150),
   user_id VARCHAR(250) NOT Null REFERENCES users(id)

);
