# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Users

- Index [token required]: `'users/' [GET] (token)`
- Show [token required]: `'users/:id' [GET] (token)`
- Create (args: User)[token required]: `'users/' [POST] (token)`
- Update order (args: new user data)[token required]: `'users/:id [PATCH] (token)`
- Delete [token required]: `'users/:id' [DELETE] (token)`

#### Products

- Index: `'products/' [GET]`
- Show: `'products/:id' [GET]`
- Create (args: Product)[token required]: `'products/' [POST] (token)`
- Update order (args: new order data)[token required]: `'products/:id [PATCH] (token)`
- Delete: `'products/:id [DELETE]`

#### Orders

- Index [token required]: `'orders/' [GET] (token)`
- Create [token required]: `'orders/' [POST] (token)`
- Show Order by user [token required]: `'orders/:id' [GET] (token)`
- Update order [token required]: `'orders/:id [PUT] (token)`
- Delete [token required]: `'orders/:id [DELETE] (token)`

### Order-Products

- Create [token required]: `'/order-products/orders/:id/products' [POST] (token)`
- Index [token required]: `'order-products/orders/:id/products/:id' [GET] (token)`
- Show Order by user [token required]: `'order-products/orders/:id/products/:id' [GET] (token)`
- Update order [token required]: `'order-products/orders/:id/products/:id' [PATCH] (token)`
  -Delete [token required]: `'order-products/orders/:id/products/:id' [DELETE] (token)`

## Data Shapes:

### User

```typescript
type User = {
  id?: number;
  email: string;
  user_name: string;
  first_name: string;
  last_name: string;
  password: string;
};
```

### Product

```typescript
type Product = {
  id?: number;
  name: string;
  description: string;
  price: number;
  category: string;
};
```

### Order

```typescript
type Order = {
  id?: number;
  status: string;
  user_id: number;
};
```

### Order Product

```typescript
type OrderProduct = {
  id?: number;
  quantity: number;
  orderId: string;
  productId: string;
  products?: Product[];
};
```

## Databas Schema

### Users Schema

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(60) UNIQUE,
    user_name VARCHAR(60) NOT NULL,
    first_name VARCHAR(60) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    password  VARCHAR(255) NOT NULL

);

ALTER SEQUENCE users_id_seq RESTART WITH 1;
```

### Products Schema

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    description VARCHAR(255),
    price integer NOT NULL,
    category VARCHAR(150) NOT NULL

);
```

### Orders Schema

```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(100),
    user_id bigint NOT NULL REFERENCES users(id)
);
```

### orders-Products Schema

```sql
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id BIGINT REFERENCES orders(id) NOT NULL,
    product_id bigint REFERENCES products(id)
);
```
