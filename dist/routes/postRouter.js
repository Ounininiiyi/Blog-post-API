"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const auth_1 = require("../middlewares/auth");
const multerConfig_1 = __importDefault(require("../config/multerConfig"));
const router = express_1.default.Router();
router.get('/', postController_1.getPosts);
router.post('/', auth_1.authMiddleware, multerConfig_1.default.array('files', 10), postController_1.createPost);
router.get('/:id', postController_1.getPostById);
router.patch('/:id', auth_1.authMiddleware, multerConfig_1.default.array('files', 10), postController_1.updatePost);
router.delete('/:id', auth_1.authMiddleware, postController_1.deletePost);
exports.default = router;
