CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE orders(
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  status VARCHAR(50),
  user_id VARCHAR(250) REFERENCES users(id) NOT Null
);
