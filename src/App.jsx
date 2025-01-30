import './App.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import LayoutAuth from './Layouts/LayoutAuth'
import Register from './Components/Register/Register'
import app from './firebase.config'
import { ToastContainer } from 'react-toastify'
import Login from './Components/Login/Login'
import ChangePassword from './Components/ChangePassword/ChangePassword'
import UserProfile from './Components/UserProfile/UserProfile'
import AllUsers from './Pages/AllUsers/AllUsers'
import LayoutOne from './Layouts/LayoutOne'
import Home from './Pages/Home/Home'
import AllRequest from './Pages/AllRequest/AllRequest'

function App() {
  const myRoute = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<LayoutAuth />}>
          <Route index element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/changePassword' element={<ChangePassword />} />
        </Route>
        <Route element={<LayoutOne />}>
          <Route path='/home' element={<Home />} />
          <Route path='/allUsers' element={<AllUsers />} />
          <Route path='/allRequest' element={<AllRequest />} />
          <Route path='/myFriends' element={<AllRequest />} />
        </Route>
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={myRoute}/>
      <ToastContainer />
    </>
  )
}

export default App
