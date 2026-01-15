import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MenuBar from './components/MenuBar/MenuBar.jsx'
import Footer from './components/Footer/Footer.jsx'
import SignIn from './pages/SignIn/SignIn.jsx'
import SignUp from './pages/SignUp/SignUp.jsx'
import { ToastContainer } from 'react-toastify'
import CreateJobPost from './pages/CreateJobPost/CreateJobPost.jsx'
import MyJobs from './pages/MyJobs/MyJobs.jsx'
import UpdateJobPost from './pages/UpdateJobPost/UpdateJobPost.jsx'
import AppliedCandidates from './pages/AppliedCandidates/AppliedCandidates.jsx'
import RecruiterProfile from './pages/Profile/RecruiterProfile.jsx'
import UserProfile from './pages/UserProfile/UserProfile.jsx'
import Home from './pages/Home/Home.jsx'
import About from './pages/About/About.jsx'
import SearchCandidates from './pages/SearchCandidates/SearchCandidates.jsx'


function App() {
  
  return (
   <div>
    <ToastContainer></ToastContainer>
    <MenuBar></MenuBar>
    <Routes>
      <Route path="/" element={<SignIn></SignIn>} ></Route>
      <Route path="/home" element={<Home></Home>} ></Route>
      <Route path="/register" element={<SignUp></SignUp>} ></Route>
      <Route path='/create' element={<CreateJobPost></CreateJobPost>} ></Route>
      <Route path='/myjobs' element={<MyJobs></MyJobs>} ></Route>
      <Route path="/update/jobpost/:id" element={<UpdateJobPost></UpdateJobPost>} ></Route>
      <Route path="/applied/users/:jobId" element={<AppliedCandidates></AppliedCandidates>} ></Route>
      <Route path="/profile" element={<RecruiterProfile></RecruiterProfile>} ></Route>
      <Route path='/candidate/profile/:email' element={<UserProfile></UserProfile>} ></Route>
      <Route path='/about' element={<About></About>} ></Route>
      <Route path="/search" element={<SearchCandidates></SearchCandidates>} ></Route>
    </Routes>
    <Footer></Footer>
   
   </div>
  )
}

export default App
