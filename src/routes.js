import { Router } from 'express';
import UserController from './app/controllers/UserController.js';
import SessionController from './app/controllers/SessionController.js';
import ProductController from './app/controllers/ProductController.js';
import multer from 'multer';
import multerConfig from './config/multer.cjs';
import authMiddleware from './middlewares/auth.js';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.post(
  '/products',
  authMiddleware,
  upload.single('file'),
  ProductController.store,
);
routes.get('/products', authMiddleware, ProductController.index);

routes.post(
  '/categories',
  authMiddleware,
  CategoryController.store,
);
routes.get('/categories', authMiddleware, CategoryController.index);

export default routes;
