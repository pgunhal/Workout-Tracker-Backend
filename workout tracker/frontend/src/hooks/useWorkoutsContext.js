import { WorkoutsContext } from '../context/WorkoutsContext'
import {useContext } from 'react'

export const useWorkoutsContext = () => {
    const context = useContext(WorkoutsContext) //has state and dispatch function stored

    if(!context) {
        throw Error('useWorkoutsContext must be used inside a WorkoutsContextProvider')
    }

    return context //to use the workoutsdata, invoke this hook to get
}