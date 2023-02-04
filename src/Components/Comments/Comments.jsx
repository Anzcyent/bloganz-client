import React, { useState, useEffect } from 'react'
import './Comments.css'

import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import { createComment } from '../../Redux/actions/comments'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Comments = ({ id, article }) => {
    const [data, setData] = useState({ description: "" });
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const access_token = localStorage.getItem('access_token');

    const dispatch = useDispatch();

    const onSubmit = () => {
        dispatch(createComment(id, data, access_token));
    }

    useEffect(() => {
        setData({ description: watch('description') })
    }, [watch('description')])


    return (
        <div className="comments-section">
            <h5>Comments</h5>

            {access_token && <form autoComplete="off" className='comments-form' onSubmit={handleSubmit(onSubmit)}>

                <input type="text" placeholder="What's your comment about this article?" name="description" {...register('description', {
                    required: "This field is required", minLength: {
                        value: 10,
                        message: "Please provide at least 10 characters."
                    }, maxLength: {
                        value: 100,
                        message: "Please don't exceed 100 characters."
                    }
                })} />

                <button type="submit">Submit</button>
            </form>}

            {access_token && errors.description && <span className="form-error">{errors.description.message}</span>}
            <br />

            <div className="comments">
                {article?.comments?.map(comment => (
                    <div key={comment._id} className="comment animate__animated animate__fadeIn">
                        <div className="comment-user-area">
                            <Link to={`/profile/${comment.user._id}`}>{comment.user.name}</Link>
                            <span className="reputation-badge">{comment.user.reputation}</span>
                        </div>
                        <div className="comment-description-area">
                            <p className="comment-description">{comment.description}</p>
                            <small className="comment-date"><i className="fa-regular fa-calendar" /> {moment(comment.createdAt).format("MMM Do YYYY")}</small>
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Comments