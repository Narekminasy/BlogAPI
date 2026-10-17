import jwt from 'jsonwebtoken';
import Users from './models/Users';
import HttpErrors, {isHttpError} from "http-errors";
import moment from 'moment';

import {
    create,
    findById,
    findByEmail,
    checkEmailUnique,
    update,
    encrypt,
    decrypt,
} from "../controllers/authController.js";



const { JWT_SECRET } = process.env;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is missing");
}

export const controller = {

    async profile(req, res) {
        try {
            res.json({
                message: "Profile found",
                user: req.user,
            });
        }catch (error) {
            console.log(error);
        }
    },

    async login(req, res, next) {
        try {
            const { email, password } = req.body;

            const user = await Users.findByEmail(email);

            if(!user || user.password !== user.hashPassword(password)) {
                return next(
                    isHttpError(403, "Invalid email or password.")
                );
            }

            if (!user.is_verified) {
                return next(
                    isHttpError(403, "Your email is not verified. Please verify it using the code sent to your Gmail.")
                );
            }
            const token = jwt.sign(
                {
                    userId: user.id,
                    role: user.role,
                },
                JWT_SECRET,{
                    expiresIn: "1h",
                }
            );

            const userResponse = user.toObject ? user.toObject() : { ...user };
            delete userResponse.password;


            res.json({
                message: "Login successfully",
                token,
                user: userResponse,
            });

        }catch (e) {
            next(e);
        }

    },

    async register(req, res, next) {
        try {
            const { name, age, email, password } = req.body;

            const emailExists = await Users.findByEmail(email);

            if (emailExists) {
                return next(
                    HttpErrors(422, "Email is already in use!")
                );
            }

            const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

            const expiresAt = moment().add(15, "minutes").toDate();

            const user = await Users.create({
                name,
                age,
                email,
                password: Users.hashPassword(password),
                verification_code: otpCode,
                code_expires_at: expiresAt,
                is_verified: false,
            });

            const userResponse = JSON.parse(JSON.stringify(user));
            delete userResponse.password;

            res.json({
                success: true,
                message: "Successfully registered",
                user: userResponse,
            })
        }catch (e) {
            next(e);
        }
    },

    async logout(req, res, next) {
        try {

            return res.json({
                success: true,
                message: "Logged out successfully",
            });

        } catch (e) {
            next(e);
        }
    },
};


