import { useEffect } from 'react'
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'

//components
import WorkoutDetails from '../components/WorkoutDetails'
import WorkoutForm from '../components/WorkoutForm'


const Home = () => {

    const { workouts, dispatch} = useWorkoutsContext()

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts') //since react does not recognize this locally, it proxies it to localhost:4000
            const json = await response.json() //array of workout objects

            if(response.ok) { //dont do if there is some error with the response
                dispatch({type: 'SET_WORKOUTS', payload: json})
            }

        }

        fetchWorkouts()
    }, [dispatch]) //empty dependecncy array makes it first once on first render (2nd arg)


    return (
        <div className="home">
            <div className="workouts">
                {workouts && workouts.map((workout) => (
                   // <p key={workout._id /*bc must be unique*/}>workout.title</p>
                    <WorkoutDetails key={workout._id} workout={workout} />
                )) }
            </div>
            <WorkoutForm />
        </div>
    )
}

export default Home