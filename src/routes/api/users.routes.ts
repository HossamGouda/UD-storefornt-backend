import { Router } from 'express';
import * as controllers from '../../controllers/users.controllers';
import validateMiddleware from '../../helpers/authenticate';

const routes = Router();
routes
  .route('/')
  .get(validateMiddleware, controllers.getAll)
  .post(controllers.create);
routes
  .route('/:id')
  .get(controllers.getUser)
  .patch(controllers.update)
  .delete(controllers.deleteUser);

//authenticate
routes.route('/auth').post(controllers.auth);

export default routes;
