import express from 'express';
import * as NurseController from '../controllers/nurseController.js';

const router = express.Router();

router.route('/').get(NurseController.getNurses)

router.route('/:id').get(NurseController.getNurse)

router.route('/add').post(NurseController.addNurse);

router.route('/edit/:id').post(NurseController.editNurse)

router.route('/delete/:id').delete(NurseController.deleteNurse);

export default router;