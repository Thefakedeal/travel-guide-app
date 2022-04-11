import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Auth from './components/ProtectedRoutes/Auth'
import Guest from './components/ProtectedRoutes/Guest'
import Home from './Layouts/Home'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import AdminLandingPage  from './pages/admin/LandingPage'
import PlacesPage from './pages/PlacesPage'
import RegisterPage from './pages/RegisterPage'

export default function Router() {
  return (
    <Routes> 
        <Route path="/" element={<Home />}>
          <Route index element={<LandingPage />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/login" element={<Guest element={<LoginPage />}/>} />
          <Route path="/register" element={<Guest element={<RegisterPage />}/>} />
        </Route>
        <Route path="/admin" element={<Home />}>
          <Route index element={<AdminLandingPage />} />
          
        </Route>
    </Routes>
  )
}
