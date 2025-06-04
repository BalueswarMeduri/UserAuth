import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Mainpage from './Pages/Mainpage'
import Login from './components/Login'
import Signup from './components/Signup'
import ForgotPassword from './components/ForgotPassword'
import AdminPage from './Pages/AdminPage'
import UserPage from './Pages/UserPage'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'

const App = () => {
  return (
    <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Mainpage/>}/>
                <Route path='/login' element={
                    <PublicRoute>
                        <Login/>
                    </PublicRoute>
                }/>
                <Route path='/signup' element={
                    <PublicRoute>
                        <Signup/>
                    </PublicRoute>
                }/>
                <Route path='/forgot-password' element={
                    <PublicRoute>
                        <ForgotPassword/>
                    </PublicRoute>
                }/>
                
                {/* Protected Routes */}
                <Route 
                    path='/admin' 
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <AdminPage/>
                        </ProtectedRoute>
                    }
                />
                <Route 
                    path='/user' 
                    element={
                        <ProtectedRoute allowedRoles={['user', 'admin']}>
                            <UserPage/>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App