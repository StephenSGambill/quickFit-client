import { getToken } from "../../utils/getToken"

export const getCompletedWorkouts = () => {
    return fetch(`https://king-prawn-app-4ozdj.ondigitalocean.app/completedworkouts`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}


export const getWorkoutGroups = () => {
    return fetch(`https://king-prawn-app-4ozdj.ondigitalocean.app/workoutgroups`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const getWorkouts = () => {
    return fetch(`https://king-prawn-app-4ozdj.ondigitalocean.app/workouts`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const getWorkoutById = (id) => {
    return fetch(`https://king-prawn-app-4ozdj.ondigitalocean.app/workouts/${id}`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const updateWorkout = (id, updatedWorkout) => {
    return fetch(`https://king-prawn-app-4ozdj.ondigitalocean.app/workouts/${id}`, {
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
    return fetch(`https://king-prawn-app-4ozdj.ondigitalocean.app/workouts/${id}`, {
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
    return fetch(`https://king-prawn-app-4ozdj.ondigitalocean.app/workouts`, {
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
    return fetch(`https://king-prawn-app-4ozdj.ondigitalocean.app/completedworkouts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(workoutId)
    })
        .then(response => response.json())
}