import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getArticlesOfOwner, getArticleById } from '../../Redux/actions/articles'
import { Article, Loading } from '../../Components'
import { Link } from "react-router-dom"
import "./MyArticlesPage.css"

const MyArticlesPage = ({ isLoading }) => {
    const dispatch = useDispatch()
    const { articles, current_article } = useSelector(state => state.articlesReducer)
    const [active_title, setActiveTitle] = useState(current_article?.title)
    const access_token = localStorage.getItem('access_token');

    useEffect(() => {
        dispatch(getArticlesOfOwner(access_token))
    }, [dispatch])


    const setCurrentArticle = (article) => {
        dispatch(getArticleById(article._id))

        setActiveTitle(article.title)
    }


    if (isLoading) return <Loading />


    if (articles.length === 0) return <main className="my-articles-page">
        <div className="my-articles-page-no-article">
            <h2>It seems that you don't have a blog yet. <Link to="/dashboard/create-article">Would you create a new one?</Link></h2>
        </div>
    </main>

    return (
        <main className="my-articles-page">
            <section className="my-articles-titles">
                <h2 className="my-articles-titles-title">My Articles</h2>
                <ul className="my-articles-titles-list">
                    {articles?.map(article => (
                        <li key={article._id} onClick={() => setCurrentArticle(article)} className={`article-titles-list-item ${active_title === article.title && "title-active"}`}>{article.title}</li>
                    ))}
                </ul>
            </section>
            <section className="article">
                <Article article={current_article} />
            </section>
        </main>
    )
}

export default MyArticlesPage