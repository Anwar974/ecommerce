import {Router} from 'express';
import * as controller from './cart.controller.js'
import { auth } from '../../middleware/auth.js';
import { endpoints } from './cart.role.js';
import { validation } from '../../middleware/validation.js';
import * as schema from './cart.validation.js';

const router = Router();

router.get('/',auth(endpoints.get), controller.get);
router.post('/',auth(endpoints.create), validation(schema.createCartSchema),controller.create);
router.put('/clear',auth(endpoints.delete), controller.clearCart)
router.put('/:productId',auth(endpoints.delete), controller.remove)
router.put('/updateQuantity/:productId',auth(endpoints.delete), controller.updateQuantity)


export default router;
