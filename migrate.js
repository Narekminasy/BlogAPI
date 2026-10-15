import DBMysql from "./clients/db.mysql.js";

async function runMigrate() {
    try {
        console.log("Checking database connection and running migration...");

        const creatUsersTableSQL = `
        CREATE TABLE IF NOT EXISTS users (
                                             id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                             name VARCHAR(255) NOT NULL,
            age INT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL, 
        )`;


    } catch (error) {

    }
}