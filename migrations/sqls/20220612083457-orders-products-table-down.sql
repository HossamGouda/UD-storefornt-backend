CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE order_products (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    quantity integer,
    order_id VARCHAR(250) REFERENCES orders(id),
    product_id VARCHAR(250) REFERENCES products(id)
);

ALTER TABLE order_products ADD FOREIGN KEY (order_id)
REFERENCES orders(id) ON DELETE CASCADE;