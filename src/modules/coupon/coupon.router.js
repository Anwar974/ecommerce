import {Router} from 'express';
import * as controller from './coupon.controller.js'
import { auth } from '../../middleware/auth.js';
import { endpoints } from './coupon.role.js';

const router = Router();

router.post('/',auth(endpoints.create), controller.create)

export default router;
