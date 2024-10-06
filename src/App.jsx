import './App.css'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/LoginAndSignup/Login'
import Signup from './components/LoginAndSignup/Signup'
import Home from './components/Home'
import About from './components/About'
import BlogPost from './components/BlogPost'

function App() {

  return (
    <Router>
      <Navbar/>
      <Toaster />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/About' element={<About/>}/>
        <Route path='/BlogPost' element={<BlogPost/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='/SignUp' element={<Signup/>} />
      </Routes>
    </Router>
  )
}

export default App
