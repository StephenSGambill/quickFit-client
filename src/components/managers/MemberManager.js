import { getToken } from "../../utils/getToken"

export const getCurrentMemberById = (id) => {
    return fetch(`http://localhost:8000/members/${id}`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const updateMemberDetails = (updatedMember) => {
    return fetch(`http://localhost:8000/members`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${getToken()}`,
        },
        body: JSON.stringify(updatedMember)
    })
        .then(response => response.json())
}

export const getMembers = () => {
    return fetch(`http://localhost:8000/members`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}