const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/mongo');

const app = express();
dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World'));
app.use('/api/signup', require('./routes/signup'));
app.use('/api/login', require('./routes/login'));

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


