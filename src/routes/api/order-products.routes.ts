import { Router } from 'express';
import * as controllers from '../../controllers/order-products.controller';
import validateMiddleware from '../../middleware/authenticate';

const routes = Router();
routes.route('/:id').post(controllers.create);
routes
  .route('/:id/products/:id')
  .get(controllers.show)
  .patch(controllers.updateOrder)
  .delete(controllers.deleteOrder);
routes.route('/:id/products').get(controllers.getoneOrder);

export default routes;
