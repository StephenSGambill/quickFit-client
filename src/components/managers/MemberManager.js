import { getToken } from "../../utils/getToken"

export const getCurrentMember = () => {
    return fetch(`http://localhost:8000/profile`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const updateMemberDetails = (updatedMember) => {
    return fetch(`http://localhost:8000/profile/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${getToken()}`,
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
