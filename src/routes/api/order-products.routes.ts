import { Router } from 'express';
import * as controllers from '../../controllers/order-products.controller';
import validateMiddleware from '../../middleware/authenticate';

const routes = Router();
routes.route('/orders/:id/products').post(controllers.create);
routes
  .route('/:id/products/:id')
  .get(controllers.show)
  .patch(validateMiddleware, controllers.updateOrder)
  .delete(validateMiddleware, controllers.deleteOrder);
routes.route('/:id/products').get(controllers.getoneOrder);

export default routes;
