import { createContext, useReducer} from 'react'

export const WorkoutsContext = createContext()

//state is the previous state value, action is what is passed into dispatch
export const workoutsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_WORKOUTS':
            return {
                workouts: action.payload //to set all of the workouts, the payload would be an array of all of the workouts
            }
        case 'CREATE_WORKOUT': 
            return  {
                workouts: [action.payload, ...state.workouts] //adds new one to the previous state's workouts spread out
            }
        case 'DELETE_WORKOUT':
            return {
                workouts: state.workouts.filter((w) => w._id !== action.payload._id) //keeps all workouts where id doesnt match one being deleted
            }
        default:
            return state
    }
        
}

//provide context to application component tree
export const WorkoutsContextProvider = ({ children }) => {
    //useReducer hooks returns a state value to update, and specify initial value for state
    //to update state object, call dispatch function (whcic calls reducer and workoutsReducer function)
    const [state, dispatch] = useReducer(workoutsReducer, {
        workouts: null
    })



    return (
        //is able to access the state and dispatch in other places
        <WorkoutsContext.Provider value={{...state, dispatch}}>  
            { children }
        </WorkoutsContext.Provider>
    )
}