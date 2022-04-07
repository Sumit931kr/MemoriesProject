import express from 'express';
import { getpost, createpost, updatepost, deletepost, likepost } from '../Controller/posts.js';

const router = express.Router();

import auth from '../Middleware/auth.js'

router.get('/', getpost );
router.post('/',auth, createpost);
router.patch('/:id',auth, updatepost)
router.delete('/:id',auth, deletepost)
router.patch('/:id/likePost', auth, likepost)

export default router;

