# Storefront project UDacity Nanodgree

1-`yarn` or `npm install` to insatll project dependencies.
2- yarn dev to start the server on port 5555
3- Env Variables as the following :

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

available endpoints are (products,users,orders)

## Token and Authentication

added as a middle ware and passed to requested routes to authenticated.

## innitaing the databases in dev mode

npx migrate up

# Available Endpoints.

### Users Endpoint

- /users to get and post users.
- /users/id to get secifc user.
- /users/auth for authentciation.

### Products Endpoint

- /products to get and post products.
- /products/id to get secifc user.
- /products/auth for authentciation.

### orders Endpoint

- /orders to get and post products.
- /orders/id to get secifc user.
- /orders/auth for authentciation.

### order_Products

- /order-products/orders/id/products to create order.
- - /order-products/orders/id/products/id to show and update and delete products.

## in testing

The test command `npm run test` will build the schema and test the comiled files in the build/src.

## Testing

npm run test

## Resources & Credits

1-https://www.yonisfy.com/udacity/projects/build-store-front-backend.

2-https://www.youtube.com/watch?v=pMZ0l_cSAw8&list=PLLWuK602vNiVLQ4rAylfIkqp3rkN0TuPD&index=20&ab_channel=MohammedElzanaty.

3-https://github.com/moelzanaty3/authentication-express-api-typescript-jasmine.

4-https://github.com/HossamAbubakr/Productify-Storefront-API.

5-https://github.com/ahmeddbahaa/Storefront

6-https://www.youtube.com/watch?v=qw--VYLpxG4&t=3249s

7-https://www.youtube.com/watch?v=7nafaH9SddU&t=1039s

8- https://github.com/atwamahmoud/storefront-api.git
