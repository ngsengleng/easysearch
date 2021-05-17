import "./Signup.css";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

// TODO
// password validation
// route to home page?

export default function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => alert(JSON.stringify(data));

    return (
        <div className="formBox">
            <h1 className="titleText">
                EasySearch
            </h1>
            <p className="titleText">
                We get the best deals anywhere
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label> New username: </label>
                <input className="formField" type="text" {...register("Username", { required: true})} />
                {errors.Username && <p className="error">this is required</p>}

                <label> New password: </label>
                <input className="formField" type="text" {...register("Password", { required: true})} />
                {errors.Password && <p className="error">this is required</p>}

                <label> Retype password: </label>
                <input className="formField" type="text" {...register("pwdCheck", { required: true})} />
                {errors.pwdCheck && <p className="error">this is required</p>}
    
                <div className="submitRow">
                    <Link to="/"> Back to Login </Link>
                    <input className="submitButton" type="submit" value="Create new account" /> 
                </div>     
            </form>
        </div>
    )
}