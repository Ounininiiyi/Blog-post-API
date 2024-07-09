"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const hashPassword_1 = require("../middlewares/hashPassword");
const router = express_1.default.Router();
router.post('/register', hashPassword_1.hashPasswordMiddleware, userController_1.register);
router.post('/login', userController_1.login);
exports.default = router;
