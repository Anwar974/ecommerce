import {Router} from 'express';
import * as controller from './category.controller.js'
import fileUpload, { fileType } from '../../ults/multer.js';

const router = Router({caseSensitive:true});

router.post('/', fileUpload(fileType.image).single('image'), controller.create)
router.get('/', controller.getAll);
router.get('/active', controller.getActive);
router.get('/:id', controller.getDetails);
router.patch('/:id',fileUpload(fileType.image).single('image'), controller.update);
router.get('/:id', controller.destroy);

export default router;
