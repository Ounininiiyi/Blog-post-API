"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const postRouter_1 = __importDefault(require("./routes/postRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('/api/posts', postRouter_1.default);
app.use('/api/users', userRouter_1.default);
mongoose_1.default.connect(process.env.MONGO_URI2)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Could not connect to MongoDB:', error));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
