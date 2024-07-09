"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPasswordMiddleware = void 0;
const passwordUtils_1 = require("../utils/passwordUtils");
const hashPasswordMiddleware = async (req, res, next) => {
    try {
        if (req.body.password) {
            req.body.password = await (0, passwordUtils_1.hashPassword)(req.body.password);
        }
        next();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.hashPasswordMiddleware = hashPasswordMiddleware;
