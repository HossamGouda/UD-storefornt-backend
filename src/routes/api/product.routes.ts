import { Router } from 'express';
import * as controllers from '../../controllers/product.controller';
import validateMiddleware from '../../helpers/authenticate';

const routes = Router();
routes
  .route('/')
  .get(validateMiddleware, controllers.getAllProducts)
  .post(controllers.createProduct);
routes
  .route('/:id')
  .get(controllers.getoneProduct)
  .patch(controllers.updateProduct)
  .delete(controllers.deleteProduct);

export default routes;
