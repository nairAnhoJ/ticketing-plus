import { Route, Routes } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import ProtectedRoute from './ProtectedRoute'

import LoginPage from '../features/auth/LoginPage'

import HomeIndex from '../features/home/HomeIndex'
import CreateTicket from '../features/create/createTicket'

import Inbox from '../features/inbox/InboxIndex'

import Settings from '../features/settings/Settings'

function AppRoutes() {
	return (
		<>
			<Routes>
					<Route element={<ProtectedRoute />}>
						<Route element={<MainLayout />}>
							<Route path='/' element={<HomeIndex />}></Route>
							<Route path='/create-ticket' element={<CreateTicket />}></Route>


							<Route path='/inbox' element={<Inbox />}></Route>

							
							<Route path='/settings' element={<Settings />}></Route>
						</Route>
					</Route>

					
					<Route path='/login' element={<LoginPage />}></Route>
			</Routes>
		</>
	)
}

export default AppRoutes
