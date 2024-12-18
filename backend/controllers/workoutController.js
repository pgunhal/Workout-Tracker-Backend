const { model } = require('mongoose')
const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

//get all workouts
const getWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({}).sort({createdAt: -1}) //if passed in smthg like reps: 20 in the {}, would return all those in the db that matched that 
        res.status(200).json(workouts); // Return workouts as JSON
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

//get a single workout
const getWorkout = async (req, res) => {
    const {id} = req.params

    //if the type of Id is not what mongodb expects Ids to be 
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id) 

    if(!workout) {
        return res.status(404).json({error: 'No such workout'})
    } 
    
    res.status(200).json(workout)

}

//create a new workout
const createWorkout = async (req, res) => {

    const { title, reps, sets, load } = req.body; // Destructure fields from req.body

    let emptyFields = []
    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(!sets) {
        emptyFields.push('sets')
    }

    if(emptyFields.length > 0) {
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields })
    }

    //add doc to db
    try {
        const workout = await Workout.create({title, reps, sets, load}) //async method to create 
        res.status(200).json(workout) // success + send back the json pobject
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


//delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})


    if(!workout) {
        return res.status(404).json({error: 'No such workout'})
    } 

    res.status(200).json(workout)

}


//update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body //spread the params of the body which is an object
    })

    if(!workout) {
        return res.status(404).json({error: 'No such workout'})
    } 

    res.status(200).json(workout)
}


module.exports = {
    getWorkout,
    getWorkouts, 
    createWorkout,
    deleteWorkout,
    updateWorkout
}