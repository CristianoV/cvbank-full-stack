import { Request, Response, Router } from 'express';
import BoletoService from '../Services/boleto.service';
import BoletoController from '../Controllers/boleto.controller';
import Validate from '../middleware/validate.middleware';

const BoletoRoutes: Router = Router();
const boletoService = new BoletoService();
const boletoController = new BoletoController(boletoService);
const validate = new Validate();

BoletoRoutes.post(
  '/',
  validate.checkUserExists,
  (request: Request, response: Response) =>
    boletoController.createNewBoleto(request, response)
);

BoletoRoutes.get(
  '/',
  validate.checkUserExists,
  (request: Request, response: Response) =>
    boletoController.getAllBoletos(request, response)
);

BoletoRoutes.get(
  '/user',
  validate.checkUserExists,
  (request: Request, response: Response) =>
    boletoController.getAllBoletosByUser(request, response)
);

BoletoRoutes.get(
  '/:boletoId',
  validate.checkUserExists,
  (request: Request, response: Response) =>
    boletoController.getBoletoById(request, response)
);

export default BoletoRoutes;
