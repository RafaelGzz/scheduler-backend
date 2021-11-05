import express from 'express';
import * as AdminController from '../controllers/adminController.js';
import { auth } from '../controllers/authController.js'

const router = express.Router();

router.route('/').get(auth, AdminController.getUser);

router.route('/edit').post(auth, AdminController.editUser);

router.route('/nurses').get(auth, AdminController.getUsers);

router.route('/change-request-status/:id').post(auth, AdminController.editUser);

export default router;