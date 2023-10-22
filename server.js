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
const apiRoutes = require('./routes/apiRoutes');
const userRoutes = require('./routes/users');
const cheaterPhoneRoutes = require('./routes/cheaterPhones');
const feedbackRoutes = require('./routes/feedbacks');

const app = express();
app.use(express.static('public'));

app.use(cors({
	origin: process.env.APP_URL,
	credentials: true,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
    optionsSuccessStatus: 200,
}));

app.options('*', cors());
app.enable('trust proxy');

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
app.use('/', cheaterPhoneRoutes)
app.use('/', feedbackRoutes)

app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_string',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: process.env.NODE_ENV === 'docker', // set to true if you're using https in production
        maxAge: 60000 
    }
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
app.use('/api', apiRoutes);
app.use('/quiz', quizRoutes);
app.use('/', indexRoutes);
app.use('/', userRoutes);

app.all('*', (req, res) => {
    req.flash('error', '404! Page not found');
    res.redirect('/users');
});

// View engine setup
app.set('view engine', 'ejs');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
