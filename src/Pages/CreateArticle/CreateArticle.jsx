import React, { useState } from 'react'
import './CreateArticle.css'
import parse from "html-react-parser"
import { Link } from "react-router-dom"
import { useNavigate } from 'react-router-dom'
import { createArticle } from "../../Redux/actions/articles"
import { useDispatch } from "react-redux"
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const editorConfig = {
    toolbar: [
        [{ header: [1, 2, 3, 4, 5, false] }],
        [{ size: ['small', 'normal', 'large'] }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ list: "ordered" }],
        ['link']
    ]
}

const CreateArticle = () => {
    const [data, setData] = useState({ title: "", description: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const access_token = localStorage.getItem('access_token');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!/^(<p|<h[1-6])><br><\/(p|h[1-6])>$/.test(data.description)) {
            dispatch(createArticle(data, access_token, navigate))
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setData({ ...data, [name]: value })
    }

    return (
        <main className="create-article-page">
            <h2 className='create-article-page-title animate__animated animate__backInDown'>Create Article</h2>

            <form method="POST" className="create-article-form animate__animated animate__zoomIn">
                <div className="create-article-title">
                    <label htmlFor="title"><h4>Title</h4></label>
                    <input type="text" name="title" id="title" onChange={handleChange} />
                </div>

                <ReactQuill theme="snow" onChange={e => setData({ ...data, description: e })} className='create-article-editor' modules={editorConfig} />

                <button onClick={handleSubmit} className='create-article-submit' type="submit">Create</button>
            </form>


            {
                !/^(<p|<h[1-6])><br><\/(p|h[1-6])>$/.test(data.description) && data.description !== "" && <section className="create-article-preview animate__animated animate__fadeIn">
                    <h5>Preview</h5>
                    {parse(data.description)}
                </section>}


            <Link to="/dashboard">
                <button className="return-button animate__animated animate__fadeInUp"><i className="fas fa-arrow-left"></i> Return to dashboard</button>
            </Link>
        </main>
    )
}


export default CreateArticle