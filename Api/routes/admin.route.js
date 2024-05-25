import express, { Router } from 'express'
import { adminSignin, blockUser, unblockUser, updateUser, users } from '../controllers/admin.controller.js';
const router = express.Router();


router.post('/users/:id/block', blockUser)
router.post('/users/:id/unblock',unblockUser )
router.post('/signin', adminSignin);
router.get('/users', users);


export default router