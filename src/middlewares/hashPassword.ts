import { Request, Response, NextFunction } from 'express'
import { hashPassword } from '../utils/passwordUtils'

export const hashPasswordMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	try {
		if (req.body.password) {
			req.body.password = await hashPassword(req.body.password)
		}
		next()
	} catch (error) {
		res.status(500).json({message: (error as Error).message})
	}
}