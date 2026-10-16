import jwt from 'jsonwebtoken';
import Users from './models/Users';
import HttpErrors from "http-errors";

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

async function getUsers(req, res) {
    try {


    }catch (error) {

    }
}


