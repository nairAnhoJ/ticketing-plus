import { Route, Routes } from 'react-router-dom'
import HomeIndex from '../features/home/HomeIndex'

function AppRoutes() {
  return (
    <>
      <Routes>
          <Route path='/' element={<HomeIndex />}></Route>
      </Routes>
    </>
  )
}

export default AppRoutes
