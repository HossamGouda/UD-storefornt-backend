import { Router } from 'express';
import * as controllers from '../../controllers/order.controller';
import validateMiddleware from '../../middleware/authenticate';

const routes = Router();
routes.route('/').get(controllers.getAllOrders).post(controllers.create);
routes
  .route('/:id')
  .get(controllers.getoneOrder)
  .patch(controllers.updateOrder)
  .delete(controllers.deleteOrder);

export default routes;
