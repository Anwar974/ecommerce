import {roles} from '../../middleware/auth.js';

export const endpoints ={
    create: [roles.User],
    all: [roles.Admin],
    getOrder: [roles.User],
    changeStatus: [roles.Admin],
   
}