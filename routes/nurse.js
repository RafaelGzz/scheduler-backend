import express from 'express';
import * as NurseController from '../controllers/nurseController.js';
import { newNurseValidation } from '../includes/validation.js';
// import { valid } from '../controllers/nurseController.js';

const router = express.Router();

router.route('/').get(NurseController.getNurses)

router.route('/:id').get(NurseController.getNurse)

router.route('/add').post(newNurseValidation, NurseController.addNurse);

router.route('/edit').put(NurseController.editNurse)

router.route('/delete/:id').delete(NurseController.deleteNurse);

export default router;