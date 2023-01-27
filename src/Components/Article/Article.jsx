import React from 'react'
import "./Article.css"
import parse from "html-react-parser"
import { Link } from "react-router-dom"
import moment from "moment"

const Article = ({ article }) => {
    if (article.length === 0) return <div className="article animate__animated animate__fadeIn">
        <h2>No articles found.</h2>
    </div>

    return (
        <div className="article animate__animated animate__fadeIn">
            <h2 className='article-title'>{article.title}</h2>
            <div className="article-info">
                <small className="article-author article-info-item">@{article?.author?.name}</small>
                <div className="article-created-at article-info-item">
                    <i className="fa-regular fa-calendar" id="article-date-icon" />
                    <small className="article-date">{moment(article.createdAt).format("MMM D, YYYY")}</small>
                </div>
            </div>
            <Link className="see-details" to={`/article/${article._id}`}>
                <button>See details</button>
            </Link>

            <section className="container article-description">
                {article.description && parse(article.description)}
            </section>
        </div>
    )
}

export default Article