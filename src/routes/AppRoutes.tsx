import { Route, Routes } from 'react-router-dom'

import LoginPage from '../features/auth/LoginPage'

import HomeIndex from '../features/home/HomeIndex'

function AppRoutes() {
  return (
    <>
      <Routes>

          <Route path='/' element={<HomeIndex />}></Route>

          
          <Route path='/login' element={<LoginPage />}></Route>
      </Routes>
    </>
  )
}

export default AppRoutes
