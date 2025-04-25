import { useState } from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home.jsx'
import ShowVideo from './pages/ShowVideo.jsx'
import Login from './components/Auth/Login.jsx'
import SignUp from './components/Auth/SignUp.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/show/:id" element={<ShowVideo/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
