import React, { useContext, useEffect, useState } from 'react'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import Login from './components/Auth/Login'
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import ProjectShowcase from './components/ProjectShowcase'
import { AuthContext } from './context/AuthProvider'

const AppRoutes = () => {
  const [user, setUser] = useState(null)
  const [loggedInUserData, setLoggedInUserData] = useState(null)
  const authData = useContext(AuthContext)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!localStorage.getItem('loggedInUser')) {
      setUser(null)
      setLoggedInUserData(null)
    }
  }, [location])

  useEffect(() => {
    const stored = localStorage.getItem('loggedInUser')
    if (!stored) return

    const loggedInUser = JSON.parse(stored)
    if (loggedInUser.role === 'admin') {
      setUser('admin')
    } else if (loggedInUser.role === 'employee' && loggedInUser.data) {
      setUser('employee')
      setLoggedInUserData(loggedInUser.data)
    }
  }, [])

  useEffect(() => {
    if (authData && user === 'employee') {
      const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'))
      if (loggedInUser) {
        const updatedEmployee = authData.employees.find(
          (e) => e.email === loggedInUser.data.email
        )
        if (updatedEmployee) {
          setLoggedInUserData(updatedEmployee)
        }
      }
    }
  }, [authData, user])

  const handleLogin = (email, password) => {
    if (email === 'admin@me.com' && password === '123') {
      setUser('admin')
      localStorage.setItem('loggedInUser', JSON.stringify({ role: 'admin' }))
      return 'admin'
    }

    if (authData) {
      const employee = authData.employees.find(
        (e) => e.email === email && e.password === password
      )
      if (employee) {
        setUser('employee')
        setLoggedInUserData(employee)
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({ role: 'employee', data: employee })
        )
        return 'employee'
      }
    }

    alert('Invalid Credentials')
    return null
  }

  const handleExploreAdmin = () => {
    if (handleLogin('admin@me.com', '123') === 'admin') {
      navigate('/admin-dashboard')
    }
  }

  const handleExploreEmployee = () => {
    if (handleLogin('e@e.com', '123') === 'employee') {
      navigate('/employee-dashboard')
    }
  }

  const handleLoginSubmit = (email, password) => {
    const role = handleLogin(email, password)
    if (role === 'admin') navigate('/admin-dashboard')
    else if (role === 'employee') navigate('/employee-dashboard')
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProjectShowcase
            onExploreAdmin={handleExploreAdmin}
            onExploreEmployee={handleExploreEmployee}
          />
        }
      />
      <Route
        path="/login"
        element={
          user ? (
            <Navigate
              to={user === 'admin' ? '/admin-dashboard' : '/employee-dashboard'}
              replace
            />
          ) : (
            <Login handleLogin={handleLoginSubmit} />
          )
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          user === 'admin' ? <AdminDashboard /> : <Navigate to="/login" replace />
        }
      />
      <Route
        path="/employee-dashboard"
        element={
          user === 'employee' ? (
            <EmployeeDashboard data={loggedInUserData} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
