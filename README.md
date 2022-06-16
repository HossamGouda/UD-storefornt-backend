# Storefront project UDacity Nanodgree.

This is a part of Udacity Nanodgree Course for developing a backend server with the Following technologies (Postgres,db-migrate , dotenv , express, jsonwebtoken , Node js , TypeScript ,Jasmine Unite Test, supertest )

1-`yarn` or `npm install` to insatll project dependencies.
2- yarn dev to start the server on port 5555
3- Env Variables as the following :

# ENV VARIABLES EXAMPLES

```
PORT=555

ENV=dev
#database info
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=store_dev
POSTGRES_DB_TEST=store_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=123
BCRYPT_PASSWORD=secret,
SALT_ROUNDS=10,
TOKEN_SECRET=secret-token
```

## Token and Authentication

added as a middle ware and passed to requested routes to authenticated.

## innitaing the databases in dev mode

npx migrate up

Available endpoints are (products ,users , orders)

# API Endpoints

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

# Databas Schema

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

## Data Shapes

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

# Testing

The test command `npm run test` will build the schema and test the comiled files in the build/src.

## Testing commad

`npm run test`

### Resources & Credits

1-https://www.yonisfy.com/udacity/projects/build-store-front-backend.

2-https://www.youtube.com/watch?v=pMZ0l_cSAw8&list=PLLWuK602vNiVLQ4rAylfIkqp3rkN0TuPD&index=20&ab_channel=MohammedElzanaty.

3-https://github.com/moelzanaty3/authentication-express-api-typescript-jasmine.

4-https://github.com/HossamAbubakr/Productify-Storefront-API.

5-https://github.com/ahmeddbahaa/Storefront

6-https://www.youtube.com/watch?v=qw--VYLpxG4&t=3249s

7-https://www.youtube.com/watch?v=7nafaH9SddU&t=1039s

8- https://github.com/atwamahmoud/storefront-api.git
