import {roles} from '../../middleware/auth.js';

export const endpoints ={
    create: [roles.Admin],
    get: [roles.Admin,roles.User],
    active: [roles.User],
    delete: [roles.Admin],
}