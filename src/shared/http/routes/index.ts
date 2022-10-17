import productsRouter from 'src/modules/products/routes/products.routes';
import sessionsRouter from 'src/modules/users/routes/sessions.routes';
import usersRouter from 'src/modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
