import { Request, Response } from 'express'
import { User, IUser } from '../models/user'
import { comparePassword } from '../utils/passwordUtils'
import jwt from 'jsonwebtoken'

export const register = async (req: Request, res: Response) => {
	const {username, password} = req.body
	try {
		const user = new User({ username, password})
		await user.save()
		res.status(201).json({message: 'User created successfully'})
	} catch (error) {
		res.status(400).json({message: (error as Error).message})
	}
}

export const login = async (req: Request, res: Response) => {
	const {username, password} = req.body
	try {
		const user = await User.findOne({username}).exec() as IUser | null
		if(!user) {
			return res.status(401).json({message: 'Invalid username'})
		}

		const isPasswordValid = await comparePassword(password, user.password)
		if (!isPasswordValid) {
			return res.status(401).json({message: 'Invalid password'})
		}

		const token = jwt.sign({userId: user._id}, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '2h'});
		res.json({token})
	} catch (error) {
		res.status(400).json({message: (error as Error).message})
	}
}