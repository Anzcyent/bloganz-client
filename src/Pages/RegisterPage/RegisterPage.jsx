import React, { useState } from 'react'
import "./RegisterPage.css"
import { useDispatch } from "react-redux"
import { useForm } from "react-hook-form";
import { authRegister } from '../../Redux/actions/auth';
import { useNavigate } from 'react-router-dom';


const RegisterPage = ({ error }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const onSubmit = (data) => {
        dispatch(authRegister(data, navigate));
    }

    return (
        <main className="register-page container">
            <h1 className='register-page-title animate__animated animate__backInDown'>Register</h1>

            <form className='register-page-form animate__animated animate__zoomIn' onSubmit={handleSubmit(onSubmit)}>
                <input name="name" placeholder="Name" {...register("name", { required: "This field is required" })} />
                {errors.name && <span className="form-error">{errors.name.message}</span>}
                <input type="email" placeholder="E-Mail" {...register("email", { required: "This field is required" })} />
                {errors.email && <span className="form-error">{errors.email.message}</span>}
                <input type="password" placeholder="Password" {...register("password", { required: "This field is required" })} />
                {errors.password && <span className="form-error">{errors.password.message}</span>}
                <input type="password" placeholder="Confirm Your Password" {...register("confirm_password", {
                    required: "This field is required",
                    validate: (val) => {
                        if (watch('password') != val) {
                            return <span className="form-error">"Your passwords do not match"</span>;
                        }
                    }
                })} />
                {errors.confirm_password && <span className="form-error">{errors.confirm_password.message}</span>}

                {error && error.name === "register" && <span className="form-error">{error.message}</span>}
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default RegisterPage