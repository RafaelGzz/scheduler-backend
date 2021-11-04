import express from 'express';
import * as AccountController from '../controllers/accountController.js';
import { auth } from '../controllers/authController.js'

const router = express.Router();

router.route('/').get(auth, AccountController.getUser);

router.route('/edit').post(auth, AccountController.editUser);

export default router;