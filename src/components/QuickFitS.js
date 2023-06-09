import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const QuickFitS = () => {
	return (
		<div className=" bg-slate-200 rounded-2xl">
			<div >
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />

					<Route path="*" element={
						<Authorized>
							<>
								<NavBar />
								<ApplicationViews />
							</>
						</Authorized>

					} />
				</Routes>
			</div>
		</div>
	)
}

