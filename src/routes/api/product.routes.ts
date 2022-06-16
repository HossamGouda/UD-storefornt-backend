import { Router } from 'express';
import * as controllers from '../../controllers/product.controller';
import validateMiddleware from '../../middleware/authenticate';

const routes = Router();
routes
  .route('/')
  .get(controllers.getAllProducts)
  .post(validateMiddleware, controllers.createProduct);
routes
  .route('/:id')
  .get(controllers.getoneProduct)
  .patch(validateMiddleware, controllers.updateProduct)
  .delete(controllers.deleteProduct);

export default routes;
