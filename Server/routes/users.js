import express from 'express'
import { signin, signup, signupgoogle, signingoogle } from '../Controller/user.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/signupgoogle', signupgoogle);
router.post('/signingoogle', signingoogle);

export default router