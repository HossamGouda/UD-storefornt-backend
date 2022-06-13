CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id BIGINT REFERENCES orders(id) NOT NULL,
    product_id bigint REFERENCES products(id)
);

