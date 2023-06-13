import { Route, Routes } from "react-router-dom"
import { AboutPage } from "../about/AboutPage"
import { ProfilePage } from "../profile/ProfilePage"
import 'tailwindcss/tailwind.css'


export const ApplicationViews = () => {
	return <>
		<div className=" m-6 ">
			<img src="./img/QFSfull.jpg" alt="QFS Logo" className="rounded-lg" />
			<div className=" text-2xl mt-2 " >Get 'Er Done</div>
			<Routes>
				<Route path="about/" element={<AboutPage />} />
				<Route path="profile/" element={<ProfilePage />} />

			</Routes>
		</div>
	</>
}

