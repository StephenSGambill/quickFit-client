import { useEffect, useState } from "react"
import { getCurrentMember, updateMemberDetails } from "../managers/MemberManager"
import { getCompletedWorkouts, getWorkoutGroups } from "../managers/WorkoutManager"

export const ProfilePage = () => {
    const [currentMember, setCurrentMember] = useState({})
    const [completedWorkouts, setCompletedWorkouts] = useState([])
    const [workoutGroups, setWorkoutGroups] = useState("")
    const [showEditDialog, setShowEditDialog] = useState(false)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [motivation, setMotivation] = useState("")
    const [memberPic, setMemberPic] = useState("")


    useEffect(() => {
        Promise.all([
            getCurrentMember(),
            getCompletedWorkouts(),
            getWorkoutGroups()

        ])
            .then(([currentMemberRes, completedWorkoutsRes, workoutGroupsRes]) => {
                setCurrentMember(currentMemberRes)
                const sortedCompletedWorkouts = completedWorkoutsRes.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
                setCompletedWorkouts(sortedCompletedWorkouts)
                setWorkoutGroups(workoutGroupsRes)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    const openEditDialog = () => {
        setShowEditDialog(true);
        setFirstName(currentMember.user?.first_name)
        setLastName(currentMember.user?.last_name)
        setMotivation(currentMember.motivation)
        setMemberPic(currentMember?.pic)
    };

    const closeEditDialog = () => {
        setShowEditDialog(false);
    };

    const saveMemberDetails = () => {
        const updatedMember = { ...currentMember }
        updatedMember.first_name = firstName
        updatedMember.last_name = lastName
        updatedMember.motivation = motivation
        updatedMember.pic = memberPic

        updateMemberDetails(updatedMember)
            .then(() => {
                setCurrentMember(updatedMember)
                setShowEditDialog(false)

            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <>
            <div className="m-5 text-xl font-bold">Profile Page</div>

            <div className="flex justify-center">
                <div className="w-1/2 text-center">
                    <div className="mt-2 text-left shadow-md border-gray-400 bg-slate-400 p-4 rounded-2xl divide-gray-900 flex justify-center items-center space-x-5">
                        <img className="h-24 rounded-2xl shadow-xl" src={currentMember.pic} alt="user" />
                        <div>
                            <h2 className="font-bold">Welcome {currentMember?.user?.first_name} {currentMember?.user?.last_name}!</h2>
                            <div><span className="font-bold">User Name:</span> {currentMember.user?.username}</div>
                            <div><span className="font-bold">Motivation:</span> {currentMember.motivation}</div>
                            <div><span className="font-bold">Email:</span> {currentMember.user?.email}</div>

                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-2xl mt-2 shadow-lg"
                                onClick={openEditDialog}
                            >
                                Edit Info
                            </button>
                        </div>
                    </div>

                    <div className="mt-10 font-extrabold">Workout History</div>
                    <div className="max-h-80 overflow-y-auto rounded">
                        {completedWorkouts.map(completedWorkout => {
                            const workoutGroup = workoutGroups.find((group) => group.id === completedWorkout?.workout.workout_group);

                            return (
                                <div id="completed-workouts" key={completedWorkout.id} className="m-2 shadow-md p-2 rounded-2xl bg-slate-300">
                                    <div className="font-bold">{completedWorkout?.workout?.name}</div>
                                    <div>Group: {workoutGroup?.name}</div>
                                    <div>Date Completed: {completedWorkout?.date}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {showEditDialog && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-4 round rounded-md">
                        <h3 className="text-lg font-bold mb-2">Edit Member Details</h3>
                        <div className="flex flex-col space-y-4">
                            <div>
                                <label className="font-bold">First Name:</label>
                                <input
                                    className="border border-gray-300 p-2 rounded"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="font-bold">Last Name:</label>
                                <input
                                    className="border border-gray-300 p-2 rounded"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="font-bold">Motivation:</label>
                                <textarea
                                    className="border border-gray-300 p-2 rounded"
                                    value={motivation}
                                    onChange={(e) => setMotivation(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="font-bold">Profile Picture URL:</label>
                                <input
                                    className="border border-gray-300 p-2 rounded-md"
                                    value={memberPic}
                                    onChange={(e) => setMemberPic(e.target.value)}
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-2xl "
                                    onClick={closeEditDialog}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 ml-2 rounded-2xl"
                                    onClick={saveMemberDetails}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
