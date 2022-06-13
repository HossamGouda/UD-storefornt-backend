import { Router } from 'express';
import * as controllers from '../../controllers/order.controller';
import validateMiddleware from '../../middleware/authenticate';

const routes = Router();
routes.route('/').get(controllers.getAllOrders).post(controllers.create);
routes
  .route('/:id')
  .get(validateMiddleware, controllers.getoneOrder)
  .patch(validateMiddleware, controllers.updateOrder)
  .delete(validateMiddleware, controllers.deleteOrder);

export default routes;
