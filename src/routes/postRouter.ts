import express from 'express'
import { getPosts, createPost, getPostById, updatePost, deletePost } from '../controllers/postController'
import { authMiddleware } from '../middlewares/auth'
import upload from '../config/multerConfig'

const router = express.Router()

router.get('/', getPosts)
router.post('/', authMiddleware, upload.array('files', 10), createPost)	
router.get('/:id', getPostById)
router.patch('/:id', authMiddleware, upload.array('files', 10), updatePost)
router.delete('/:id', authMiddleware, deletePost)

export default router