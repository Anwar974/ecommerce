import {Router} from 'express';
import * as controller from './user.controller.js'
import fileUpload, { fileType } from '../../ults/multer.js';
import { auth } from '../../middleware/auth.js';
import { endpoints } from './user.role.js';

const router = Router();

router.get('/',auth(endpoints.getUsers), controller.getUsers);
router.get('/userData',auth(endpoints.userData), controller.getUserData);

export default router;
