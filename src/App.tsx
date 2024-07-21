import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import MovieHome from './components/MovieHome';

function App() {

  return (
    <div className={`flex flex-col items-center bg-gray-dk text-white overflow-x-hidden`}>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/sign-in' element={<Login/>}/>
          <Route path='/sign-up' element={<Register/>}/>
          <Route path='/search' element={<SearchPage/>}/>
          <Route path='/movie/:movieId' element={<MovieHome/>}/>
          <Route path='/:ERROR' element={<MovieHome/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
