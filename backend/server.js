const dotenv = require('dotenv')
const path = require('path');
const cors = require('cors');

const cookieParser = require("cookie-parser");

const express = require('express')
const mongoose = require('mongoose')

//get the exported routes
const workoutRoutes = require('./routes/workouts')
const authRoute = require('./routes/authRoute')
// console.log('authRoute:', authRoute); // This should log the router object


dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express() //creates express app by invoking function

//global middleware
app.use(express.json()) 
//reads the json of the app to be accessed in the request handler

app.use(
    cors({
      origin: ["http://localhost:3000", "https://mern-health-tracker.netlify.app"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );

app.use(cookieParser());

//gets the path of the request and its method and logs then
//calls next() function to do the next thing!
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})


//route handler
//first param -> whena request is fired to that route,
//(api/workouts), then the workoutRoutes are used
//bc ./ is used for workoutRoutes, it is all local
app.use('/api/workouts', workoutRoutes)

app.use("/", authRoute);

//connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen to a port number for requests
        app.listen(process.env.PORT, () => {
        console.log('connected to DB and listening on port', process.env.PORT)
        }) 
    })
    .catch((error) => {
        console.log(error)
    })




