import express, { Router } from 'express'
import { adminSignin, updateUser, users } from '../controllers/admin.controller.js';
const router = express.Router();


router.post('/signin', adminSignin);
router.get('/users', users);
router.get('/update/:id', updateUser)
export default router