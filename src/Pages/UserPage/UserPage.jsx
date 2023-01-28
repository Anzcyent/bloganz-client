import React, { useEffect } from 'react'
import "./UserPage.css"

import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUserById } from '../../Redux/actions/user'

const UserPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const {current_user} = useSelector(state => state.userReducer); 
    useEffect(() => {
        dispatch(getUserById(id));
    }, [dispatch])

    return (
        <main className="user-page">
            <h2>User Page</h2>
        </main>
    )
}

export default UserPage