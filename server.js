const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/mongo');
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => res.send('Hello World'));
app.use('/api/signup', require('./routes/signup'));
app.use('/api/login', require('./routes/login'));
app.use('/api/personalInfo', require('./routes/profileinfo'));
app.use('/api/healthInfo', require('./routes/health_info'));


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


