import express from 'express'
import { register, login } from '../controllers/userController'
import { hashPasswordMiddleware } from '../middlewares/hashPassword'

const router = express.Router()

router.post('/register', hashPasswordMiddleware, register)
router.post('/login', login)

export default router	