import {roles} from '../../middleware/auth.js';

export const endpoints ={
    get: [roles.User],
    create: [roles.User],
    delete: [roles.User],
}