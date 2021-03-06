import express from 'express';
import * as AdminController from '../controllers/adminController.js';
import { auth } from '../controllers/authController.js'

const router = express.Router();

router.route('/').get(auth, AdminController.getAdmin);

router.route('/edit').put(auth, AdminController.editAdmin);

router.route('/delete').delete(auth, AdminController.editAdmin);

export default router;