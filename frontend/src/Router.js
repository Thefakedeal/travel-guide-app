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
import AdminPlaces from './pages/admin/places/Index'
import AdminCreatePlaces from './pages/admin/places/Create'
import AdminEditPlaces from './pages/admin/places/Edit'
import AdminIndexExperiences from './pages/admin/experiences/Index'
import AdminCreateExperiences from './pages/admin/experiences/Create'
import AdminIndexCities from './pages/admin/cities/Index'
import AdminCreateCities from './pages/admin/cities/Create'

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
          <Route path="places" element={<AdminPlaces />} />
          <Route path="places/create" element={<AdminCreatePlaces />} />
          <Route path="places/:id" element={<AdminEditPlaces />} />
          <Route path="experiences" element={<AdminIndexExperiences />} />
          <Route path="experiences/create" element={<AdminCreateExperiences />} />
          <Route path="cities" element={<AdminIndexCities />} />
          <Route path="cities/create" element={<AdminCreateCities/>} />
        </Route>
    </Routes>
  )
}
