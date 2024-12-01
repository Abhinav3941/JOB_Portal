

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'

import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs '
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'


// this is for user to apply jobs
const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/signup',
    element: <Signup/>,
},
  {
    path: '/Jobs',
    element: <Jobs/>,
},
{
  path: '/description/:id',
element: <JobDescription/>,
},
  {
    path: '/Browse',
    element: <Browse/>,
},
  {
    path: '/Profile',// agr ye path hai to
    element: <Profile/>, // mujhe ye elemnt dikhana hai 
},
// from here all of it is for admin (recruiter), who can post jobs of a comapny .

{
  path:"/admin/companies",
  element: <ProtectedRoute><Companies/></ProtectedRoute>
},
{
  path:"/admin/companies/create",
  element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
},
{
  path:"/admin/companies/:id",
  element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
},
{
  path:"/admin/jobs",
  element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
},
{
  path:"/admin/jobs/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
{
  path:"/admin/jobs/:id/applicants",
  element:<ProtectedRoute><Applicants/></ProtectedRoute> 
},
])


function App() {


  return (
    <>

     <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
