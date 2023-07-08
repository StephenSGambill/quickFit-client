import { getToken } from "../../utils/getToken"
import { backEndURL } from "./_backEndURL"

export const getExercises = () => {
    return fetch(`${backEndURL}/exercises`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}
export const getExercisesByGroup = (id) => {
    return fetch(`${backEndURL}/${id}`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const saveExercise = (newExercise) => {
    return fetch(`${backEndURL}/exercises`, {
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
    return fetch(`${backEndURL}/exercises/${id}`, {
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
    return fetch(`${backEndURL}/${id}`, {
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
