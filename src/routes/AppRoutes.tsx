import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ProtectedRoute from './ProtectedRoute'

import LoginPage from '../features/auth/LoginPage'

import HomeIndex from '../features/home/HomeIndex'

function AppRoutes() {
	return (
		<>
			<Routes>
					<Route element={<ProtectedRoute />}>
						<Route element={<MainLayout />}>
							<Route path='/' element={<HomeIndex />}></Route>
						</Route>
					</Route>

					
					<Route path='/login' element={<LoginPage />}></Route>
			</Routes>
		</>
	)
}

export default AppRoutes
