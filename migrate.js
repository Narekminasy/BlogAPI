import DBMysql from "./clients/db.mysql.js";

async function runMigrate() {
    try {
        console.log("Checking database connection and running migration...");

        const createUsersTableSQL = `
            CREATE TABLE IF NOT EXISTS users (
                                                 id BIGINT AUTO_INCREMENT PRIMARY KEY,
                                                 name VARCHAR(255) NOT NULL,
                age INT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                is_verified BOOLEAN DEFAULT FALSE,
                verification_code VARCHAR(10) NULL,
                code_expires_at DATETIME NULL,
                role VARCHAR(50) DEFAULT 'user',
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                );`;

        const createPostsTableSQL = `
            CREATE TABLE IF NOT EXISTS posts (
                                                 id INT AUTO_INCREMENT PRIMARY KEY,
                                                 title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                userId BIGINT NOT NULL,
                createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- <-- Sequelize-ի համար
                updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- <-- Sequelize-ի համար
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
                );
        `;

        await DBMysql.query(createUsersTableSQL);
        console.log("Users table checked/created.");

        await DBMysql.query(createPostsTableSQL);
        console.log("Posts table checked/created.");

        console.log("Migration completed successfully!");

    } catch (error) {
        console.error("Migration failed:", error);
    }
}

runMigrate();
