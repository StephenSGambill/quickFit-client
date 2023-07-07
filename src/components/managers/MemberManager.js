import { getToken } from "../../utils/getToken"

export const getCurrentMember = () => {
    return fetch(`https://starfish-app-8dtmr.ondigitalocean.app/profile`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}

export const updateMemberDetails = (updatedMember) => {
    return fetch(`https://starfish-app-8dtmr.ondigitalocean.app/profile/edit`, {
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
    return fetch(`https://starfish-app-8dtmr.ondigitalocean.app/members`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}
