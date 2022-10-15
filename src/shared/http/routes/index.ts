import productsRouter from '@shared/modules/products/routes/products.routes';
import usersRouter from '@shared/modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

export default routes;
