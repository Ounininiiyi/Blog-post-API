import jwt from 'jsonwebtoken'

export const generateAccessToken = (user: any) => {
	return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: '1h'})
}