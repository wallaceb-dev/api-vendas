import productsRouter from 'src/modules/products/routes/products.routes';
import sessionsRouter from 'src/modules/users/routes/sessions.routes';
import usersRouter from 'src/modules/users/routes/users.routes';
import { Router } from 'express';
import passwordRouter from '@modules/users/routes/password.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
