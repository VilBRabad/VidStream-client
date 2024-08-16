import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Register from './components/Register'
import Login from './components/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './components/SearchPage';
import MovieHome from './components/MovieHome';
import { HomeMovieProvider } from './contexts/HomeMoviesContext';
import { SkeletonTheme } from 'react-loading-skeleton';
import MoviesByFIlters from './components/MoviesByFIlters';
import ErrorPage from './components/ErrorPage';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import WatchLists from './components/WatchLists';
import { useEffect } from 'react';
import { useAppDispatch } from './utils/hooks';
import {fetchWatchlist} from "./redux/watchlist/watchlistSlice";
import { useUser } from './contexts/UserContext';

function App() {

  const {user} = useUser();
  const dispatch = useAppDispatch();

  useEffect(()=>{
    if(user){
      dispatch(fetchWatchlist());
    }
  }, []);


  return (
    <div className={`flex flex-col items-center bg-gray-dk text-white overflow-x-hidden`}>
      <Router>
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
              <Route path='/watchlist' element={<WatchLists />} />
              <Route path='/movie/:id' element={<MovieHome />} />
              <Route path='/movies' element={<MoviesByFIlters/>}/>
              <Route path='/Error' element={<ErrorPage />} />
            </Routes>
            </SkeletonTheme>
          </HomeMovieProvider>
      </Router>
    </div>
  )
}

export default App
