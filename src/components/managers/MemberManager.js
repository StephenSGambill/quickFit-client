import { getToken } from "../../utils/getToken"
import { backEndURL } from "./_backEndURL"

export const getCurrentMember = () => {
    return fetch(`${backEndURL}/profile`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const updateMemberDetails = (updatedMember) => {
    return fetch(`${backEndURL}/profile/edit`, {
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
    return fetch(`${backEndURL}/members`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}
