const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const session = require('express-session');
const cors = require('cors');
const flash = require('connect-flash');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const bodyParser = require('body-parser');
const passport = require('passport');
const quizRoutes = require('./routes/quizRoutes');

const situationRoutes = require('./routes/situations');
const answerRoutes = require('./routes/answers');
const achievementRoutes = require('./routes/achievements');
const categoryRoutes = require('./routes/categories');
const topicRoutes = require('./routes/topics');

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
app.use(express.static('public'));

if(process.env.NODE_ENV == 'development' ) {
    app.use(cors());
}

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

// Load YAML swagger file and set up /api-docs route BEFORE authentication
const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', achievementRoutes);
app.use('/', answerRoutes);
app.use('/', categoryRoutes);
app.use('/', situationRoutes);
app.use('/', topicRoutes);

// Set up session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_string',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 }  // Set to false unless using HTTPS
}));

app.use(flash());

// Passport Config
require('./config/passport')(passport);

// Initialize Passport and its session middleware
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.error = req.flash('error') || [];
    res.locals.success_msg = req.flash('success_msg') || [];
    next();
});

// Routes
app.use('/auth', authRoutes);
app.use('/quiz', quizRoutes);
app.use('/', indexRoutes);
app.use('/', userRoutes);

app.all('*', (req, res) => {
    req.flash('error', '404! Page not found');
    res.redirect('/dashboard');
});

// View engine setup
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
