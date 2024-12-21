const dotenv = require('dotenv')
const path = require('path');
const cors = require('cors');

const express = require('express')
const mongoose = require('mongoose')

//get the exported workout routes
const workoutRoutes = require('./routes/workouts')


dotenv.config({ path: path.resolve(__dirname, './.env') });

const app = express() //creates express app by invoking function

//global middleware
app.use(express.json()) 
//reads the json of the app to be accessed in the request handler

app.use(cors());

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




