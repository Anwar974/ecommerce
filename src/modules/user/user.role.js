import {roles} from '../../middleware/auth.js';

export const endpoints ={
    getUsers: [roles.Admin],
    getUserData: [roles.Admin,roles.User]

}