import React from 'react'
import "./Article.css"
import parse from "html-react-parser"
import { Link, useNavigate } from "react-router-dom"
import moment from "moment"
import Loading from '../Loading/Loading'
import { useSelector , useDispatch} from "react-redux"
import { deleteArticle } from '../../Redux/actions/articles'

const Article = ({ article, isLoading }) => {
    if (article.length === 0) return <div className="article animate__animated animate__fadeIn">
        <h2>No articles found.</h2>
    </div>

    if (isLoading) return <Loading />

    const { user } = useSelector(state => state.authReducer);
    const access_token = localStorage.getItem('access_token');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className="article animate__animated animate__fadeIn">
            <h2 className='article-title'>{article.title}</h2>
            <div className="article-info">
                <small className="article-author article-info-item"><Link style={{color: "var(--primary-color)", textDecoration: "none"}} to={`/profile/${article?.author?._id}`}>@{article?.author?.name}</Link></small>
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

            {user?._id === article?.author?._id && 
            <footer className="article-footer">
                <Link to={`/edit-article/${article._id}`}><button style={{backgroundColor: 'darkblue', padding: ".7rem"}}><i className="fa-solid fa-pen-to-square"></i></button></Link>
                <button onClick={() => dispatch(deleteArticle(article._id, access_token, navigate))} style={{backgroundColor: 'red', padding: ".7rem"}}><i className="fa-solid fa-trash"></i></button>
            </footer>}

        </div>
    )
}

export default Article