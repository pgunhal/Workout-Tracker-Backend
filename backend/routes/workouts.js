const express = require('express')
const {
    createWorkout,
    getWorkouts, 
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController')


const router = express.Router()
//to use the router

//to GET all workouts
router.get('/', getWorkouts)

//GET a single workout
//colon represents a route param
router.get('/:id', getWorkout)

//POST a new workout
router.post('/', createWorkout)

//DELETE a workout
router.delete('/:id', deleteWorkout)

//UPDATE a workout
router.patch('/:id', updateWorkout)


//export the routes
module.exports = router