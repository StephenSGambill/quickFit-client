import { useEffect, useState } from "react"
import { getMemberCustomWorkouts, getWorkoutGroups, getWorkouts } from "../managers/WorkoutManager"

export const WorkoutsPage = () => {
    const [workouts, setWorkouts] = useState([])
    const [memberCustomWorkouts, setMemberCustomWorkouts] = useState([])
    const [workoutGroups, setWorkoutGroups] = useState([])
    const localUser = localStorage.getItem("qfs_user")
    const userObject = JSON.parse(localUser)


    useEffect(() => {
        Promise.all([
            getWorkouts(userObject.user_id),
            getWorkoutGroups(),
            getMemberCustomWorkouts()

        ])
            .then(([workoutsRes, groupsRes, customWorkoutsRes]) => {
                setWorkouts(workoutsRes)
                setWorkoutGroups(groupsRes)
                setMemberCustomWorkouts(customWorkoutsRes)

            })
            .catch(error => {
                console.error(error)
            })
    }, [])


    return (
        <div>
            <div className="m-5 text-xl font-bold">Workouts Page</div>

            <div>
                <h2 className="font-bold">My Custom Workouts</h2>
                {memberCustomWorkouts?.map(customWorkout => {

                    return (
                        <div className="m-2 shadow-md p-4 rounded-lg bg-slate-300" key={customWorkout.id}>
                            <div className="font-bold">Name: {customWorkout.workout.name}</div>
                            <div>Description: {customWorkout.workout.description}</div>
                            <div>Group: {customWorkout.workout.workout_group?.name}</div>
                            <div>Exercises {customWorkout.workout.exercises?.map(exercise => <li key={exercise.id}>{exercise.name}</li>)}</div>
                        </div>
                    )
                })}
            </div>

            <div>
                <h2 className="font-bold mt-20">All Workouts</h2>
                {workouts.map(workout => {
                    const workoutGroup = workoutGroups.find(group => group.id === workout.workout_group)
                    return (
                        <div className="m-2 shadow-md p-4 rounded-lg bg-slate-400" key={workout.id}>
                            <div className="font-bold">Name: {workout.name}</div>
                            <div>Description: {workout.description}</div>
                            <div>Group: {workoutGroup?.name}</div>
                            <div>Exercises {workout.exercises.map(exercise => <li key={exercise.id}>{exercise.name}</li>)}</div>
                        </div>
                    )
                })}
            </div>

        </div>
    )

}


