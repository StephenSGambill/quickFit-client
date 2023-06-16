import { getToken } from "../../utils/getToken"

export const getCompletedWorkouts = () => {
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

export const getWorkouts = () => {
    return fetch(`http://localhost:8000/workouts`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const getWorkoutById = (id) => {
    return fetch(`http://localhost:8000/workouts/${id}`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}



export const deleteWorkout = (id) => {
    return fetch(`http://localhost:8000/workouts/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => {
            if (response.status === 204) {
                return Promise.resolve(); // No content to parse, resolve with an empty value
            } else {
                return response.json(); // Parse the response as JSON for other status codes
            }
        });
}


export const saveWorkout = (newWorkout) => {
    return fetch(`http://localhost:8000/workouts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(newWorkout)
    })
        .then(response => response.json())
}