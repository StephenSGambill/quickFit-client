import { getToken } from "../../utils/getToken"

export const getExercises = () => {
    return fetch(`http://localhost:8000/exercises`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}
export const getExercisesByGroup = (id) => {
    return fetch(`http://localhost:8000/workoutgroups/${id}`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const saveExercise = (newExercise) => {
    return fetch(`http://localhost:8000/exercises`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`
        },
        body: JSON.stringify(newExercise)
    })
        .then(response => response.json())
}

export const deleteExercise = (id) => {
    return fetch(`http://localhost:8000/exercises/${id}`, {
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

export const updateExercise = (id, updatedExercise) => {
    return fetch(`http://localhost:8000/exercises/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${getToken()}`,
            "Content-Type": "application/json" // Specify the content type as JSON
        },
        body: JSON.stringify(updatedExercise) // Convert the body to JSON string
    })
        .then(response => {
            if (response.status === 200) {
                return Promise.resolve(); // No content to parse, resolve with an empty value
            } else {
                return response.json(); // Parse the response as JSON for other status codes
            }
        });
}