import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes, Navigate } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import Login from './pages/Login'
import Welcome from './pages/Welcome/Welcome'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserList from './pages/UserList'

const App = () => {
  // const url = "https://joykoly-server.onrender.com"
  const url = 'http://localhost:4000'
  const isAuthenticated = localStorage.getItem('adminToken');

  return (
    <div>
      <ToastContainer/>
      {isAuthenticated && <Navbar/>}
      {isAuthenticated && <hr/>}
      <div className="app-content">
        {isAuthenticated && <Sidebar/>}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Welcome />
            </ProtectedRoute>
          } />
          <Route path="/add" element={
            <ProtectedRoute>
              <Add url={url}/>
            </ProtectedRoute>
          }/>
          <Route path="/list" element={
            <ProtectedRoute>
              <List url={url}/>
            </ProtectedRoute>
          }/>
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders url={url}/>
            </ProtectedRoute>
          }/>
          <Route path="/users" element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }/>
        </Routes>
      </div>
    </div>
  )
}

export default App
