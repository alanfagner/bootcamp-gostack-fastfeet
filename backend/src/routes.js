import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import bruteForce from './config/burteStore';

/* Controllers */
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliveryManController from './app/controllers/DeliveryManController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryManagerController from './app/controllers/DeliveryManagerController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import ProblemManagerController from './app/controllers/ProblemManagerController';

/* Validators */
import deliveryProblemStore from './app/validators/deliveryProblemStore';
import deliveryMainStore from './app/validators/deliveryManStore';
import deliveryMainUpdate from './app/validators/deliveryManUpdate';

import deliveryStore from './app/validators/deliveryStore';
import deliveryUpdate from './app/validators/deliveryUpdate';

import recipientStore from './app/validators/recipientStore';
import recipientUpdate from './app/validators/recipientUpdate';

import deliveryManagerEnd from './app/validators/deliveryManagerEnd';

/* Middleware */
import authMiddleware from './app/middlewares/auth';
import { isAdmin } from './app/middlewares/validation';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', bruteForce.prevent, SessionController.store);

routes.get('/deliveries/:id/problems', DeliveryProblemController.index);
routes.post('/deliveries/:id/problems', deliveryProblemStore, DeliveryProblemController.store);

routes.put('/deliverymans/:deliveryManId/deliveries/:deliveryId/start', DeliveryManagerController.start);
routes.put(
  '/deliverymans/:deliveryManId/deliveries/:deliveryId/end',
  upload.single('signature'),
  deliveryManagerEnd,
  DeliveryManagerController.end
);

routes.get('/deliverymans/:id/deliveries', DeliveryManagerController.index);

routes.put('/problems/:id/cancel-delivery', ProblemManagerController.cancel);

routes.get('/deliverymans/:id', DeliveryManController.index);

routes.use(authMiddleware);

routes.use(isAdmin);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', recipientStore, RecipientController.store);
routes.put('/recipients/:id', recipientUpdate, RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

routes.post('/deliverymans', upload.single('file'), deliveryMainStore, DeliveryManController.store);
routes.put('/deliverymans/:id', upload.single('file'), deliveryMainUpdate, DeliveryManController.update);
routes.get('/deliverymans', DeliveryManController.index);
routes.delete('/deliverymans/:id', DeliveryManController.delete);

routes.post('/deliveries', deliveryStore, DeliveryController.store);
routes.put('/deliveries/:id', deliveryUpdate, DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);
routes.get('/deliveries', DeliveryController.index);

routes.get('/deliveries/problems', DeliveryProblemController.index);

export default routes;
