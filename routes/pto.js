import express from 'express';
import * as PtoController from '../controllers/ptoController.js';
import { auth } from '../controllers/authController.js'

const router = express.Router();

router.route('/').get(auth, PtoController.getPtos);

router.route('/:id').get(PtoController.getPto);

router.route('/all-by-nurse').post(PtoController.getPtosByNurse);

router.route('/edit/:id').put(auth, PtoController.editPto);

router.route('/add').post(PtoController.addPto);

router.route('/delete/:id').delete(auth, PtoController.deletePto);

export default router;