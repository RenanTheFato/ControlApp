import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import LoginForm from './pages/login';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/singin' element={<LoginForm/>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
