import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Home from './Layouts/Home'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import PlacesPage from './pages/PlacesPage'

export default function Router() {
  return (
    <Routes> 
        <Route path="/" element={<Home />}>
          <Route index element={<LandingPage />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>
    </Routes>
  )
}
