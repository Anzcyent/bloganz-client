import React, { useEffect } from 'react'
import "./ArticlePage.css"
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { getArticleById } from "../../Redux/actions/articles"
import parse from "html-react-parser"
import moment from "moment"
import { Loading } from "../../Components"

const ArticlePage = () => {
    const dispatch = useDispatch()
    const { current_article } = useSelector(state => state.articlesReducer)
    const { isLoading } = useSelector(state => state.appReducer)
    const { id } = useParams()
    const navigate = useNavigate();

    localStorage.setItem('article', id);


    useEffect(() => {
        dispatch(getArticleById(id))
    }, [dispatch])

    if (isLoading) return <Loading />

    return (
        <main className="article-page container">
            <h2 className="article-page-title">{current_article?.title}<button onClick={() => navigate("/articles")} title="Go Back"><i className="fas fa-arrow-left"></i></button></h2>
            <hr />
            <section className="article-page-description">
                {parse(String(current_article?.description))}
            </section>

            <footer className="article-page-footer">
                <span><i className="fa-regular fa-calendar" id="article-date-icon" />{moment(current_article?.createdAt).format("MMM Do YYYY, h:mm:ss a")}</span>
                <span>@&nbsp;{current_article?.author?.name}</span>
            </footer>
        </main>
    )
}

export default ArticlePage