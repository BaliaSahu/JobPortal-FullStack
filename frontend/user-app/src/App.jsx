import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Footer from './components/Footer/Footer.jsx'
import Jobs from './pages/Jobs/Jobs.jsx'
import SignUp from './pages/SignUp/SignUp.jsx'
import{ToastContainer} from 'react-toastify'
import RecruiterProfile from './pages/RecruiterProfile/RecruiterProfile.jsx'
import JobsForYou from './pages/JobsForYou/JobsForYou.jsx'
import JobsApplied from './pages/JobsApplied/JobsApplied.jsx'
import UserProfile from './pages/UserProfile/UserProfile.jsx'
import ProfileView from './pages/ProfileView/ProfileView.jsx'
import SignIn from './pages/SignIn/SignIn.jsx'
import About from './pages/About/About.jsx'
import JobSearch from './pages/JobSearch/JobSearch.jsx'
import MenuBar from './components/MenuBar/MenuBar.jsx'
import Home from './pages/Homes/Home.jsx'
 
function App() {

  return (  
    <div>
      <ToastContainer></ToastContainer>
      <MenuBar></MenuBar>

      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/job" element={<Jobs></Jobs>}></Route>
        <Route path='/jobsforyou' element={<JobsForYou></JobsForYou>} ></Route>
        <Route path='/profile' element={<UserProfile></UserProfile>}></Route>
        <Route path='/profile/view' element={<ProfileView></ProfileView>} ></Route>
        <Route path='/login' element={<SignIn></SignIn>} ></Route>
        <Route path='/register' element={<SignUp></SignUp>} ></Route>
        <Route path='/recruiter/:email' element={<RecruiterProfile></RecruiterProfile>} ></Route>
        <Route path='/applied/jobs' element={<JobsApplied></JobsApplied>} ></Route>
        <Route path='/about' element={<About></About>} ></Route>
        <Route path='/search' element={<JobSearch></JobSearch>} ></Route>
      </Routes>
      <Footer></Footer>
    </div>
  )
}

export default App
