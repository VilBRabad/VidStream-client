import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'

function App() {

  return (
    <div className={`flex flex-col items-center bg-gray-bg text-white overflow-x-hidden`}>
      <Navbar />
      <Home/>
    </div>
  )
}

export default App
