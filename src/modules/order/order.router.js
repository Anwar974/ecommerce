import {Router} from 'express';
import * as controller from './order.controller.js'
import { auth } from '../../middleware/auth.js';
import { endpoints } from './order.role.js';

const router = Router();

router.post('/',auth(endpoints.create), controller.create)
router.get('/all',auth(endpoints.all), controller.getOrders)
router.get('/userOrder',auth(endpoints.getOrder), controller.getUserOrders)
router.patch('/changestatus/:orderId',auth(endpoints.changeStatus), controller.changeStatus)


export default router;
