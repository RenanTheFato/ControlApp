import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/home';
import LoginForm from './pages/login';
import SingUpForm from './pages/singup';
import Dashboard from './pages/dashboard';
import Tasks from './pages/tasks';
import MainInfos from './pages/mainInfos';
function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/singin' element={<LoginForm/>} />
        <Route path='/singup' element={<SingUpForm/>} />
        <Route path='/dashboard' element={<Dashboard/>}>
          <Route path='' element={<MainInfos />}/>
          <Route path='tasks' element={<Tasks />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
