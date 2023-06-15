import { Route, Routes } from "react-router-dom"
import { AboutPage } from "../about/AboutPage"
import { ProfilePage } from "../profile/ProfilePage"
import { WorkoutsPage } from "../workouts/Workouts"
import { ExercisesPage } from "../exercises/Exercises"
import { MembersPage } from "../members/MembersPage"
import { WorkoutPage } from "../workout/Workout"
import 'tailwindcss/tailwind.css'


export const ApplicationViews = () => {
	return <>
		<div className=" m-6 mt-20 pt-4 pb-20">
			<img className="rounded-lg " src="./img/QFSfull.jpg" alt="QFS Logo" />
			<div className=" text-2xl " >Get 'Er Done</div>
			<Routes>
				<Route path="about/" element={<AboutPage />} />
				<Route path="profile/" element={<ProfilePage />} />
				<Route path="workouts/" element={<WorkoutsPage />} />
				<Route path="exercises/" element={<ExercisesPage />} />
				<Route path="members/" element={<MembersPage />} />
				<Route path="workout/" element={<WorkoutPage />} />
				{/* START HERE */}
				<Route path="workouts/id:" element={<WorkoutPage />} />
				<Route path="customworkouts/id:" element={<WorkoutPage />} />


			</Routes>
		</div>
	</>
}

