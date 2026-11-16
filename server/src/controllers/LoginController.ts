import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from '../utils/AppError.js';
import { User } from '../models/User.js';

const Login = async ( req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
        const token = await ValidateUser({ email, password });
        res.status(200).json({ token: token, message: 'Login successful' });
    } catch (err) {
        next(err);
    }

};

interface Credentials {
    email: string;
    password: string;
}

const ValidateUser = async (user: Credentials) => {
    const { email, password } = user;

    if (!email || !password) {
        
        throw new AppError('Email and password are required', 400);
    }

    const existingUser = await User.findOne({ email });
        if (!existingUser) {
            throw new AppError('Invalid email or password', 401);
    }

    const isMatch = await (existingUser as any).comparePassword(password);
        
    if (!isMatch) {
            throw new AppError('Invalid email or password', 401);
    }

    const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    
    return token;
}

export default Login;
