const mongoose = require('mongoose')
//mongoose allows us to create schemas for the data

const Schema = mongoose.Schema


const workoutSchema = new Schema({
    title: {
        type: String, //type of title must be a string
        required: true //must be provided 
    },
    reps: {
        type: Number,
        required: true
    },
    sets: {
        type: Number, 
        required: true
    },
    load: {
        type: Number, 
        required: true
    }

}, {timestamps: true})
//when creating a new property, tracks time added/updated


//schema describes structure. model applies it to a specific model
module.exports = mongoose.model('Workout', workoutSchema)

// workout.find() //finds all workouts in collection
