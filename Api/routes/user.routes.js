import express, { Router } from 'express'
import { test } from '../controllers/user.controller.js';
const router = express.Router();

router.get('/', test);

export default router