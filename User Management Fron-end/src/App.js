import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Admin from './pages/Admin'
import Customer from './pages/Customer'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path='/'
          element={<Suspense fallback={<div className='loader'>Loading...</div>}>
            <Login />
          </Suspense>}
        />
        <Route
          exact
          path='/admin'
          element={<Suspense fallback={<div className='loader'>Loading....</div>}>
            <Admin />
          </Suspense>}
        />
        <Route
          exact
          path='/customer'
          element={<Suspense fallback={<div className='loader'>Loading....</div>}>
            <Customer />
          </Suspense>}
        />
      </Routes>
    </Router>
  )
}
