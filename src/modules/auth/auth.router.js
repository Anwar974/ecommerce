
import {Router} from 'express';
import * as controller from './auth.controller.js';
import { checkEmail } from '../../middleware/checkEmail.js';
import { asyncHandler } from '../../ults/catchError.js';
import { validation } from '../../middleware/validation.js';
import * as schema from './auth.validation.js';
// import fileUpload, { fileType } from '../../ults/multer.js';

const router = Router();
router.post('/register',validation(schema.registerSchema),checkEmail,asyncHandler(controller.register) );
router.post('/Excel',fileUpload(fileType.excel).single('excel'),asyncHandler(controller.addUserExcel))
router.post('/login', validation(schema.loginSchema),controller.login);
router.patch('/sendcode',validation(schema.sendCode),  controller.sendCode);
router.patch('/forgotpassword',validation(schema.forgotPasswordSchema), controller.forgotPassword);
router.get('/confirmEmail/:token',controller.confirmEmail);


export default router;