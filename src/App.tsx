import './App.css'
import LandingPage from './components/LandingPage'
import LoginPage from './components/LoginPage'
import Register from './components/Register'

function App() {

  return (
    <div className='flex flex-col items-center bg-black'>
      {/* <LandingPage/> */}
      {/* <LoginPage /> */}
      <Register/>
    </div>
  )
}

export default App
