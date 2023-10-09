require('dotenv').config();

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const userRoutes = require('./routes/userRoutes');
const situationRoutes = require('./routes/situationRoutes');
const answerRoutes = require('./routes/answerRoutes');
const achievementRoutes = require('./routes/achievementRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/quiz', quizRoutes);
app.use('/users', userRoutes);
app.use('/situations', situationRoutes);
app.use('/answers', answerRoutes);
app.use('/achievements', achievementRoutes);

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_string',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Swidler Quiz App API',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], // Path to your route files
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
