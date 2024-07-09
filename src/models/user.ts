import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IUser extends Document {
	username: string
	password: string
	posts: Types.ObjectId[]
}

const userSchema: Schema = new Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	posts:[{type: Schema.Types.ObjectId, ref: 'Post'}]
})

export const User = mongoose.model<IUser>('User', userSchema)