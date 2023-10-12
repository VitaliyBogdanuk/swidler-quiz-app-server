require('dotenv').config();

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const passport = require('passport');
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes');
const userRoutes = require('./routes/userRoutes');
const situationRoutes = require('./routes/situationRoutes');
const answerRoutes = require('./routes/answerRoutes');
const achievementRoutes = require('./routes/achievementRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const topicRoutes = require('./routes/topicRoutes');
const YAML = require('yamljs');


const app = express();

if(process.env.NODE_ENV == 'development' ) {
    app.use(cors());
}

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/quiz', quizRoutes);
app.use('/users', userRoutes);
app.use('/situations', situationRoutes);
app.use('/answers', answerRoutes);
app.use('/achievements', achievementRoutes);
app.use('/categories', categoryRoutes);
app.use('/topics', topicRoutes);

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_string',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }  // Set to true if using HTTPS
}));

app.use(passport.initialize());
app.use(passport.session());

// Load YAML swagger file
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
