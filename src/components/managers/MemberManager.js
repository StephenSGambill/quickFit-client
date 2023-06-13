import { getToken } from "../../utils/getToken"

export const getCurrentMemberById = (id) => {
    return fetch(`http://localhost:8000/members/${id}`, {
        headers: {
            "Authorization": `Token ${getToken()}`
        }
    })
        .then(response => response.json())
}