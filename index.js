const express = require('express');
const app = express();

const dotenv = require('dotenv');
const mongoose = require('mongoose');
const helmet = require('helmet');
const morgan = require('morgan');
const userRoute = require('./routes/users');
const authRoute = require('./routes/auth');
const PostRoute = require('./routes/posts');
const actionsRoute = require('./routes/actions');

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true},
    () => {
        console.log("Connected to mongoDB.....");
    }
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// app.get('/', (req,res) => {
//     res.send("Welcome to our REST API! ");
// });

app.use('/api/users',userRoute);
app.use('/api/auth',authRoute);
app.use('/api/posts',PostRoute);
app.use('/api/',actionsRoute);

app.listen(5000, () => {
    console.log("Server is ready.......");
});