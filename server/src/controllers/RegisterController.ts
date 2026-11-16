import { Request, Response } from "express";
import { User } from "../models/User";
import { AppError } from "../utils/AppError";

const RegisterController = async ( req: Request, res: Response ) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ $or: [{ name: name }, { email: email }] });

        if (existingUser) {
            throw new AppError('Username or email already exists', 409);
        }

        const user = new User({ name: name, email: email, password: password });
        
        await user.save();


        return user;
    } catch (err) {
        if (err instanceof AppError) {
            throw err;
        }

        throw new AppError('Error in database operations', 500);
    }

}

export default RegisterController;