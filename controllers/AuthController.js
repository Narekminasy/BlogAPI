import "dotenv/config";
import _ from "lodash";
import CryptoJS from "crypto-js";
import DBMysql from "../clients/db.mysql.js";

const {
    TOKEN_SECRET,
} = process.env;


if (!TOKEN_SECRET) {
    throw new Error("TOKEN_SECRET is missing");
}

export async function findById(id) {
    try {
        const [result] = await DBMysql(`SELECT *
                                        FROM users
                                        WHERE id = ? limit 1`, [id]);

        return result && result.length ? result[0] : null;
    } catch (error) {
        console.error(err);
        return null;
    }
}

export async function findByEmail(email) {
    try {
        const [result] = await DBMysql(`SELECT *
                                        FROM users
                                        WHERE email = ? limit 1`, [email]);

        return result && result.length ? result[0] : null;
    } catch (error) {
        console.error(err);
        return null;
    }
}

export async function checkEmailUnique(email) {
    const user = await findByEmail(email);
    return !!user;
}

export async function create({name, age, email, password}) {
    try {
        const [result] = await DBMysql(`
                    insert into users
                        (name, age, email, password)
                        Value(?, ?, ?, ?)`,
            [name, age, email, password]
        );
        return result && result.length
    } catch (error) {
        console.error(error);
        return null;
    }
}

export async function update({id, name, age, email, password}) {
    try {
        const emailExists = await checkEmailUnique(id);
        if (!emailExists) {
            throw new Error("Email already exists");
        }
        const [result] = await DBMysql(`
                    UPDATE users
                    set name=?,
                        age=?,
                        email=?,
                        password=?
                    where id = ?;
            ` [name, age, email, password]
        );
        return result && result.length
    } catch (error) {
        console.error(error);
        return null;
    }
}

export function encrypt(data) {
    return CryptoJS.AES.encrypt(
        JSON.stringify(data),
        TOKEN_SECRET
    ).toString();
}

export function decrypt(ciphertext) {
    try {
        const bytes = CryptoJS.AES.decrypt(
            ciphertext,
            TOKEN_SECRET
        );
        return JSON.parse(
            bytes.toString(CryptoJS.enc.Utf8)
        );
    } catch (e) {

        console.log(e);
        return null;
    }
}

export default {
    create,
    findById,
    findByEmail,
    checkEmailUnique,
    update,
    encrypt,
    decrypt,
}




