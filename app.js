import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';

const app = express();

const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.send('all ok');
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

