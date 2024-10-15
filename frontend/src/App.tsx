import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import LoginForm from './pages/login';
import SingUpForm from './pages/singup';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/singin' element={<LoginForm/>} />
        <Route path='/singup' element={<SingUpForm/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
