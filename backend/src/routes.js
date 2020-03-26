import express from 'express';

import SessionController from './controllers/SessionController';
import OngController from './controllers/OngController';
import IncidentController from './controllers/IncidentController';
import ProfileController from './controllers/ProfileController';

import ongMiddleware from './middlewares/ongHandler';

const routes = express.Router();

function catchAsyncErrors(fn) {
  return (req, res, next) => {
    const routePromise = fn(req, res, next);
    if (routePromise.catch) {
      routePromise.catch((err) => next(err));
    }
  };
}

routes.post('/sessions', catchAsyncErrors(SessionController.store));
routes.get('/ongs', catchAsyncErrors(OngController.index));
routes.post('/ongs', catchAsyncErrors(OngController.store));
routes.get('/incidents', catchAsyncErrors(IncidentController.index));

routes.use(ongMiddleware);

routes.post('/incidents', catchAsyncErrors(IncidentController.store));
routes.delete('/incidents/:id', catchAsyncErrors(IncidentController.destroy));
routes.get('/profiles', catchAsyncErrors(ProfileController.index));

export default routes;
