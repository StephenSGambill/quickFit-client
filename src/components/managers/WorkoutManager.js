import { getToken } from "../../utils/getToken"
import { backEndURL } from "./_backEndURL"

export const getCompletedWorkouts = () => {
    return fetch(`${backEndURL}/completedworkouts`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}


export const getWorkoutGroups = () => {
    return fetch(`${backEndURL}/workoutgroups`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const getWorkouts = () => {
    return fetch(`${backEndURL}/workouts`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const getWorkoutById = (id) => {
    return fetch(`${backEndURL}/workouts/${id}`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const updateWorkout = (id, updatedWorkout) => {
    return fetch(`${backEndURL}/workouts/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${getToken()}`,
            "Content-Type": "application/json" // Specify the content type as JSON
        },
        body: JSON.stringify(updatedWorkout) // Convert the body to JSON string
    })
        .then(response => {

            if (response.status === 204) {
                return Promise.resolve(); // No content to parse, resolve with an empty value
            } else {
                return response.json(); // Parse the response as JSON for other status codes
            }
        });
}


export const deleteWorkout = (id) => {
    return fetch(`${backEndURL}/workouts/${id}`, {
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
    return fetch(`${backEndURL}/workouts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(newWorkout)
    })
        .then(response => response.json())
}

export const completeWorkout = (workoutId) => {
    return fetch(`${backEndURL}/completedworkouts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(workoutId)
    })
        .then(response => response.json())
}