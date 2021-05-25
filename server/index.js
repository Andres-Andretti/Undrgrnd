const express = require ('express');
const cors = require ('cors');
const bodyParser = require ('body-parser');
const mongoose = require ('mongoose');
require('dotenv').config();

const postRoutes = require('./routes/route.posts');
const userRouter = require('./routes/route.users');

const app = express();


app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/posts' , postRoutes);
app.use('/user', userRouter);


const CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);