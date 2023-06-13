import { useEffect, useState } from "react"
import { getCurrentMemberById } from "../managers/MemberManager"
import { getMemberCompletedWorkouts, getMemberCustomWorkouts, getWorkoutGroups } from "../managers/WorkoutManager"

export const ProfilePage = () => {
    const [currentMember, setCurrentMember] = useState({})
    const [memberCompletedWorkouts, setMemberCompletedWorkouts] = useState([])
    const [memberCustomWorkouts, setMemberCustomWorkouts] = useState([])
    const [workoutGroups, setWorkoutGroups] = useState("")
    const localUser = localStorage.getItem("qfs_user")
    const userObject = JSON.parse(localUser)


    useEffect(() => {
        Promise.all([
            getCurrentMemberById(userObject.user_id),
            getMemberCompletedWorkouts(userObject.user_id),
            getMemberCustomWorkouts(userObject.user_id),
            getWorkoutGroups()

        ])
            .then(([currentMemberRes, completedWorkoutsRes, customWorkoutsRes, workoutGroupsRes]) => {
                setCurrentMember(currentMemberRes);
                setMemberCompletedWorkouts(completedWorkoutsRes);
                setMemberCustomWorkouts(customWorkoutsRes);
                setWorkoutGroups(workoutGroupsRes)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);


    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };


    const deleteWorkout = (workoutId, workoutType) => {
        // Logic to delete the workout with the specified ID and type (completed or custom)
        console.log(`Deleting ${workoutType} workout with ID ${workoutId}`);
    };


    return (
        <>
            <div className="mt-5 ">
                <a href="#completed-workouts">Go to Completed Workouts</a> |{" "}
                <a href="#custom-workouts">Go to Custom Workouts</a>
            </div>

            <div className="flex justify-center " >
                <div className="w-3/4 text-center" >
                    <div className="mt-10 text-left  shadow-md border-gray-400 bg-gray-300 p-4 rounded-lg divide-gray-900 flex justify-center items-center space-x-5">
                        <img className="h-24 rounded-lg shadow-xl" src={currentMember.pic} alt="user" />
                        <div>
                            <h2 className="font-bold  ">Welcome {currentMember.user?.first_name} {currentMember.user?.last_name}!</h2>
                            <div className="italic bold ">Motivation: {currentMember.motivation}</div>
                        </div>
                    </div>


                    <div className=" mt-10 font-extrabold " >Completed Workouts</div>
                    <div className="max-h-6 overflow-y-auto"></div>
                    {memberCompletedWorkouts.map(completedWorkout => {
                        const workoutGroup = workoutGroups.find((group) => group.id === completedWorkout?.workout.workout_group)

                        return (
                            <div id="completed-workouts" key={completedWorkout.id} className="m-2 shadow-md p-4 rounded-lg bg-slate-300">
                                <div>Name: {completedWorkout?.workout?.name}</div>
                                <div>Group: {workoutGroup?.name}</div>
                                <div>Date Completed: {completedWorkout?.date}</div>
                                <button
                                    className=" bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded mt-2"
                                    onClick={() => deleteWorkout(completedWorkout.id, "completed")}
                                >
                                    Delete this workout
                                </button>
                            </div>

                        )

                    })}

                    <div id="custom-workouts" className=" mt-10 font-extrabold ">Custom Workouts</div>
                    {memberCustomWorkouts.map(customWorkout => (
                        <div key={customWorkout.id} className="m-2 p-4 shadow-md rounded-lg bg-slate-400" >
                            <div>Name: {customWorkout?.workout?.name}</div>
                            <div>Group: {customWorkout?.workout.workout_group?.name}</div>
                            <button
                                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded mt-2"
                                onClick={() => deleteWorkout(customWorkout.id, "custom")}
                            >
                                Delete this workout
                            </button>
                        </div>


                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-4">
                <button onClick={scrollToTop}>Back to Top</button>
            </div>
        </>
    )
}

