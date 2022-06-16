CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(100),
    user_id bigint NOT NULL REFERENCES users(id)
);

ALTER TABLE orders ADD FOREIGN KEY (user_id)
REFERENCES users(id) ON DELETE CASCADE;