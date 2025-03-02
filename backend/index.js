const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();


const port = process.env.PORT
require('./db')


const allowedOrigins = [process.env.FRONTEND_URL || 'https://studynest-mern-frontend.onrender.com/#/login']; // Add more origins as needed

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
         methods: "GET, POST, PUT, DELETE, OPTIONS",
        allowedHeaders: "Content-Type, Authorization"
    })
)
app.use(bodyParser.json());
app.use(cookieParser({
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 7,
    signed: true
}));

const authRoutes = require('./routes/authRoutes')
const classroomRoutes = require('./routes/classroomRoutes')


app.use('/auth', authRoutes)
app.use('/class', classroomRoutes)


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/getuserdata', (req, res) => {
    res.send('Charan , 21 , Male')
})

app.listen(port, () => {
    console.log(`StudyNest backend app listening on port ${port}`)
})
