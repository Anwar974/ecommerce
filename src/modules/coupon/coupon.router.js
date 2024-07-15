import {Router} from 'express';
import * as controller from './coupon.controller.js'
import { auth } from '../../middleware/auth.js';
import { endpoints } from './coupon.role.js';
import { validation } from '../../middleware/validation.js';
import * as schema from './coupon.validation.js'
import { asyncHandler } from '../../ults/catchError.js';
const router= Router();


router.post('/',auth(endpoints.create), validation(schema.createCouponSchema),asyncHandler(controller.create) );

export default router;
