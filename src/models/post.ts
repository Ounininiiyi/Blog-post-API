import mongoose, { Schema, Types, Document } from 'mongoose'

export interface IPost extends Document {
	title: string
	content: string
	author: Types.ObjectId
	files: string[]
}

const postSchema: Schema = new Schema({
	title: {type: String, required: true},
	content: {type: String, required: true},
	author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
	files: {type: [String], default: []}
}, {timestamps: true})

export const Post = mongoose.model<IPost>('Post', postSchema)