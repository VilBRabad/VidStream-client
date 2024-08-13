import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import MovieHome from './components/MovieHome';
import { UserProvider } from './contexts/UserContext';
import { HomeMovieProvider } from './contexts/HomeMoviesContext';
import { SkeletonTheme } from 'react-loading-skeleton';
import MoviesByFIlters from './components/MoviesByFIlters';
import ErrorPage from './components/ErrorPage';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

function App() {

  return (
    <div className={`flex flex-col items-center bg-gray-dk text-white overflow-x-hidden`}>
      <Router>
        <UserProvider>
          <HomeMovieProvider>
            <SkeletonTheme baseColor='#393E46' highlightColor='#23252b'>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/sign-in' element={<Login />} />
              <Route path='/sign-up' element={<Register />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/reset-password' element={<ResetPassword />} />
              <Route path='/search' element={<SearchPage />} />
              <Route path='/movie/:id' element={<MovieHome />} />
              <Route path='/movies' element={<MoviesByFIlters/>}/>
              <Route path='/Error' element={<ErrorPage />} />
            </Routes>
            </SkeletonTheme>
          </HomeMovieProvider>
        </UserProvider>
      </Router>
    </div>
  )
}

export default App
