import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setResponsive } from "./Redux/actions/app"
import { Routes, Route } from "react-router-dom"
import { generateNewToken } from './Redux/actions/auth'
import "animate.css"
import "./App.css"

// Components
import { Navbar, Footer } from './Components'

// Pages
import { ArticlesPage, AboutPage, NotFound, Dashboard, CreateArticle, ArticlePage, RegisterPage, LoginPage, MyArticlesPage, HomePage, EditArticle, UserPage } from "./Pages"

const App = () => {
  const { responsive, isLoading, error } = useSelector(state => state.appReducer)
  const dispatch = useDispatch()
  const access_token = localStorage.getItem('access_token');


  // responsive
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        dispatch(setResponsive(true));
      } else {
        dispatch(setResponsive(false));
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    }
  }, []);

  // generate new token
  useEffect(() => {
    dispatch(generateNewToken(access_token))
  }, [access_token])



  return (
    <div className="app">
      <Navbar responsive={responsive} isLoading={isLoading} />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/articles" element={<ArticlesPage isLoading={isLoading} />} />
        <Route exact path="/about" element={<AboutPage />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/dashboard/create-article" element={<CreateArticle />} />
        <Route exact path="/edit-article/:id" element={<EditArticle />} />
        <Route exact path="/dashboard/my-articles" element={<MyArticlesPage isLoading={isLoading} />} />
        <Route exact path="/article/:id" element={<ArticlePage />} />
        <Route exact path="/profile/:id" element={<UserPage isLoading={isLoading} />} />
        <Route exact path="/register" element={<RegisterPage error={error} />} />
        <Route exact path="/login" element={<LoginPage error={error} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App