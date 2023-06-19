import { Route, Routes } from "react-router-dom"
import { AboutPage } from "../about/AboutPage"
import { ProfilePage } from "../profile/ProfilePage"
import { WorkoutsPage } from "../workouts/Workouts"
import { ExercisesPage } from "../exercises/Exercises"
import { MembersPage } from "../members/MembersPage"
import { WorkoutPage } from "../workout/Workout"
import { CreateWorkout } from "../workouts/CreateWorkout"
import { EditWorkout } from "../workouts/EditWorkout"
import 'tailwindcss/tailwind.css'


export const ApplicationViews = () => {
	return <>
		<div className=" m-6 mt-14 pt-4 pb-20">
			<div className="flex flex-col justify-center items-center">
				<img className="rounded-2xl" src={process.env.PUBLIC_URL + "/img/QFSfull.jpg"} />
				<div className="text-2xl justify-right
				">Get 'Er Done</div>
			</div>
			<Routes>
				<Route path="about/" element={<AboutPage />} />
				<Route path="profile/" element={<ProfilePage />} />
				<Route path="workouts/" element={<WorkoutsPage />} />
				<Route path="exercises/" element={<ExercisesPage />} />
				<Route path="members/" element={<MembersPage />} />
				<Route path="workout/:id" element={<WorkoutPage />} />
				<Route path="workout/create/" element={<CreateWorkout />} />
				<Route path="workout/edit/:id" element={<EditWorkout />} />
			</Routes>
		</div>
	</>
}

