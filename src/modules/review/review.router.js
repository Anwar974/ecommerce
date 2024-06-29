import {Router} from 'express';
import * as controller from './review.controller.js'
import fileUpload, { fileType } from '../../ults/multer.js';
import { auth } from '../../middleware/auth.js';
import { endpoints } from './review.role.js';

const router = Router({mergeParams: true});

router.post('/',auth(endpoints.create), fileUpload(fileType.image).single('image'), controller.create);

export default router;
