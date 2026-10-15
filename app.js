import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import usersRouter from './routes/index.js';
import sequelize from './clients/db.sequelize.js';
import './models/Posts.js';


const app = express();

const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(morgan('dev'));

app.use(usersRouter);


sequelize.sync({ alter: true })
    .then(() => {
        console.log("Database tables synchronized successfully.");
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to sync database:", error);
    });
