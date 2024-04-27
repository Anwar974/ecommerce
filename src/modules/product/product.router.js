import {Router} from 'express';
import * as controller from './product.controller.js'
const router = Router();

router.get('/', controller.getAll)

export default router;
