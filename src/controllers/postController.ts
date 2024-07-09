import { Request, Response } from 'express'
import { Types } from 'mongoose'
import { Post } from '../models/post'
import { User } from '../models/user'	

export const getPosts = async (req: Request, res: Response) => {
	try {
		const posts = await Post.find()
		res.json(posts)
	} catch (error) {
		res.status(500).json({message: (error as Error).message})
	}
}

export const createPost = async(req: Request, res: Response) => {
	const {title, content} = req.body
	const files = req.files as Express.Multer.File[]
	const userId = req.user?.userId

	try {
		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({message:'User not found'})
		}

		const filePaths = files.map(file => file.path)

		const post = new Post({title, content, author: user._id as Types.ObjectId, files: filePaths})
		await post.save()
		
		user.posts.push(post._id as Types.ObjectId)
		await user.save()

		res.status(201).json(post)
	} catch (error) {
		res.status(400).json({message: (error as Error).message})
	}
}

export const getPostById = async(req: Request, res: Response) => {
	try {
		const post = await Post.findById(req.params.id)
		if (post == null) {
			return res.status(404).json({message: 'Cannot find post'})
		}
		res.json(post)
	} catch (error) {
		res.status(500).json({message: (error as Error).message})
	}	
}

export const updatePost = async (req: Request, res: Response) => {
	try {
		const post = await Post.findById(req.params.id)
		if (post == null) {
			return res.status(404).json({message: 'Cannot find post'})
		}
		if (req.body.title != null) {
			post.title = req.body.title
		}
		if (req.body.content != null) {
			post.content = req.body.content;
		}

		const updatedPost = await post.save()
		res.json(updatedPost)	
	} catch (error) {
		res.status(400).json({message: (error as Error).message})
	}
}

export const deletePost = async (req: Request, res: Response) => {
	try {
		const post = await Post.findById(req.params.id)
		if(post == null) {
			return res.status(404).json({message: 'Cannot find post'})
		}
		await post.deleteOne({_id: post._id})
		res.json({message: 'Deleted post'})
	} catch (error) {
		res.status(500).json({message: (error as Error).message})
	}
}