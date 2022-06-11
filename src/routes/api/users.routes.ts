import { Router } from 'express';
import * as controllers from '../../controllers/users.controllers';

const routes = Router();
routes.route('/').get(controllers.getAll).post(controllers.create);
routes
  .route('/:id')
  .get(controllers.getUser)
  .patch(controllers.update)
  .delete(controllers.deleteUser);

export default routes;
