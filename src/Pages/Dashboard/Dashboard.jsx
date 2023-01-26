import React from 'react'
import { Link } from "react-router-dom"
import "./Dashboard.css"

const Dashboard = () => {
  const access_token = localStorage.getItem('access_token');


  return (
    <main className="dashboard animate__animated animate__fadeIn">
      <Link to={access_token ? "/dashboard/my-articles" : "/login"} className="show-my-articles">
        <section >
          <p>Show My Articles</p>
        </section>
      </Link>

      <Link to="/dashboard/create-article" className="create-article">
        <section >
          <p>Create Article</p>
        </section>
      </Link>
    </main >
  )
}

export default Dashboard