import React, { useContext } from 'react'
import Sidebar from './components/Sidebar'
import Player from './components/Player'
import Navbar from './components/Navbar'
import Display from './components/Display.jsx'
import DisplayHome from './components/DisplayHome.jsx'
import { createHashRouter, Navigate, Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import DisplayAlbum from './components/DisplayAlbum'
import Auth from './components/Auth'
import SignUpForm from './components/SignUpForm.jsx'
import { ReactContext } from './context/UserContext.jsx'
import Loading from './components/Loading.jsx'
import Search from './components/Search.jsx'
import SearchedSong from './components/SearchedSong.jsx'




const App = () => {
  const {user, setUser} = useContext(ReactContext);
  const router = createHashRouter(
    createRoutesFromElements(
      <>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Auth />} />
        <Route path='/signup' element={user ? <Navigate to="/" replace /> : <Auth />} />
        <Route path='/' errorElement={<Loading />} element={<Display />}>
          <Route index element={<DisplayHome />} />
          <Route path="music" element={<DisplayHome />} />
          <Route path="podcasts" element={<DisplayHome />} />
          <Route path='album/:id' element={<DisplayAlbum />} />
          <Route path='search' element={<Search />} />
          <Route path='search:song' element={<SearchedSong />} />
          <Route path='login' element={<Auth />} />
        </Route>
      </>
    )
  )

  return (
    <RouterProvider router={router} />

  )
}

export default App