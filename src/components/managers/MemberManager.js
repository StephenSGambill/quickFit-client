import { getToken } from "../../utils/getToken"

export const getCurrentMemberById = () => {
    return fetch(`http://localhost:8000/profile`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const updateMemberDetails = (updatedMember, id) => {
    return fetch(`http://localhost:8000/members/${id}`, {
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