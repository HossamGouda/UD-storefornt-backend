import { Router } from 'express';
import usersRoute from './api/users.routes';
import productsRoute from './api/product.routes';
import ordersRoute from './api/orders.routes';

const routes = Router();

routes.use('/users', usersRoute);
routes.use('/products', productsRoute);
routes.use('/orders', ordersRoute);


export default routes;
