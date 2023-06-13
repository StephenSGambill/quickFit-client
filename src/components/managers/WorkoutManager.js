import { getToken } from "../../utils/getToken"

export const getMemberCompletedWorkouts = () => {
    return fetch(`http://localhost:8000/completedworkouts`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const getMemberCustomWorkouts = () => {
    return fetch(`http://localhost:8000/customworkouts`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const getWorkoutGroups = () => {
    return fetch(`http://localhost:8000/workoutgroups`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}