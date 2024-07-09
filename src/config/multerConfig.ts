import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadDir = 'uploads/'
if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, {recursive: true})
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadDir)
	},
	filename: (req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname}`)
	}
})

const checkFileType = (file: Express.Multer.File, cb: multer.FileFilterCallback) => {
	const filetypes = /jpeg|jpg|png|gif|mp4|mkv/
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase())	
	const mimetype = filetypes.test(file.mimetype)

	if(mimetype && extname) {
		return cb(null, true)
	} else {
		cb(new Error('Error: Images and Videos Only!'))
	}
};

const upload = multer({
	storage,
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb)
	}
})

export default upload