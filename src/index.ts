import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import postRouter from './routes/postRouter'
import userRouter from './routes/userRouter'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use('/api/posts', postRouter)
app.use('/api/users', userRouter)

mongoose.connect(process.env.MONGO_URI2 as string)
	.then(() =>  console.log('Connected to MongoDB'))
	.catch((error) => console.error('Could not connect to MongoDB:', error))

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})