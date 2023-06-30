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
        <>
            <div className="m-5 text-xl font-bold">Members Page</div>
            <div className="bg-slate-400 rounded-2xl p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
                    {members.map((member) => (
                        <div key={member.id} className="bg-white rounded-2xl shadow-md p-4">
                            <img className="h-24 w-24 rounded-full mx-auto mb-4" src={member.pic} alt="user" />
                            <div className="text-lg font-bold text-center mb-2">{member.user.first_name} {member.user.last_name}</div>
                            <div className="text-center text-gray-600 mb-2">@{member.user.username}</div>
                            <div className="text-center ">{member.motivation}</div>
                            {member.user.is_staff ? <div className="text-center text-red-400">Staff</div> : <></>}

                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};