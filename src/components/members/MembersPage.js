import { useEffect, useState } from "react"
import { getMembers } from "../managers/MemberManager"

export const MembersPage = () => {
    const [members, setMembers] = useState([])


    useEffect(() => {
        getMembers()
            .then((membersRes) => {
                setMembers(membersRes)
            })
            .catch((error) => {
                console.error(error)
            })
    }, [])


    return (
        <div>
            <div className="m-5 text-xl font-bold">Members Page</div>
            {members.map((member) => (
                <div key={member.id} className="m-2 shadow-md p-4 rounded-lg bg-slate-300">
                    <img className="h-24 rounded-lg shadow-xl" src={member.pic} alt="user" />
                    <div>Name: {member.user.first_name} {member.user.last_name}</div>
                    <div>Motivation: {member.motivation}</div>
                </div>
            ))
            }
        </div >
    );
};