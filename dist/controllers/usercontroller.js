"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const user_1 = require("../models/user");
const passwordUtils_1 = require("../utils/passwordUtils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new user_1.User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.register = register;
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await user_1.User.findOne({ username }).exec();
        if (!user) {
            return res.status(401).json({ message: 'Invalid username' });
        }
        const isPasswordValid = await (0, passwordUtils_1.comparePassword)(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2h' });
        res.json({ token });
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.login = login;
