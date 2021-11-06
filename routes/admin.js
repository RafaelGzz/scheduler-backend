import express from 'express';
import * as AdminController from '../controllers/adminController.js';
import { auth } from '../controllers/authController.js'

const router = express.Router();

router.route('/').get(auth, AdminController.getAdmin);

router.route('/edit').post(auth, AdminController.editAdmin);

router.route('/nurses').get(auth, AdminController.getNurses);

router.route('/change-request-status/:id').post(auth, AdminController.changeRequestStatus);

export default router;