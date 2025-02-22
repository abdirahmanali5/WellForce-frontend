import { useState,useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import ResponsiveAppBar from './Navbar'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SignUp from './register';
import SignIn from './Login/log-in';
// import AppRouter from './AppRouter';
import Home from './Home/Home'
import Navbar from './Navbar';
// import Activity from './activity';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import axios from 'axios';
function App() {
  const [count, setCount] = useState(0)
  const [user, setUser] = useState({})
  const [posts, setPosts] = useState([])
  const [error, setError] = useState(null)
  const [isFetching, setIsFetching] = useState(false)
  const [isLoggedin, setIsLoggedin] = useState(false)
  useEffect(() => {
    const fetchPosts = async () => {
      setIsFetching(true)

      try {
        const res = await axios.get("http://localhost:3001/preferences")
        if (res?.data?.posts1) {
          setError(null)
          setPosts(res.data.posts1)
        }
      } catch (err) {
        console.log(err)
        const message = err?.response?.data?.error?.message
        setError(message ?? String(err))
      } finally {
        setIsFetching(false)
      }
    }

    fetchPosts()
  }, [])

  const addPost = (newPost) => {
    setPosts((oldPosts) => [newPost, ...oldPosts])
  }

  const updatePost = ({ postId, postUpdate }) => {
    setPosts((oldPosts) => {
      return oldPosts.map((post) => {
        if (post.id === Number(postId)) {
          return { ...post, ...postUpdate }
        }

        return post
      })
    })
  }










return (
  <div className="app">
    <BrowserRouter>
      <main>
      <Navbar setIsLoggedin = {setIsLoggedin} isLoggedin = {isLoggedin} count = {count}  setCount = {setCount} setUser = {setUser} user = {user} posts = {posts} setPosts = {setPosts} Error = {Error}  setError = {setError} isFetching = {isFetching} setIsFetching = {setIsFetching} ></Navbar>
      <Routes>
      <Route path="/" setUser = {setUser} user = {user} element={<Home />} />
      <Route path="/register" element={<SignUp setUser = {setUser} user = {user}  setIsLoggedin = {setIsLoggedin} isLoggedin = {isLoggedin}/>} />
      <Route path="/log-in" element={<SignIn />} />
      {/* <Route path="/activity" element={<Activity setIsLoggedin = {setIsLoggedin} isLoggedin = {isLoggedin} />} /> */}
      </Routes>
  
      </main>
    </BrowserRouter>
  </div>
)
}
export default App
