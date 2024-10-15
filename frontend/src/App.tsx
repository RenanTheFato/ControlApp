import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import LoginForm from './pages/login';
import SingUpForm from './pages/singup';
import Dashboard from './pages/dashboard';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/singin' element={<LoginForm/>} />
        <Route path='/singup' element={<SingUpForm/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
