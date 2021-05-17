import "./Signup.css";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

// TODO

export default function Signup() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // password comparing variables
    const repeatPassword = useRef({});
    repeatPassword.current = watch("Password", "");

    // routing after successful submission
    const history = useHistory();
    const backToLogin = () => history.push("/");
    
    return (
        <div className="signupForm">
            <h1>
                EasySearch
            </h1>
            <h3>
                We get the best deals anywhere
            </h3>
            <form className="signupBox" onSubmit={handleSubmit(backToLogin)}>

                <label> New username: </label>
                <input type="text" {...register("Username", { required: true})} />
                {errors.Username && <p className="error">this is required</p>}

                <label> New password: </label>
                <input type="text" {...register("Password", { required: true})} />
                {errors.Password && <p className="error">this is required</p>}

                <label> Retype password: </label>
                <input type="text" {...register("pwdCheck", {
                validate: value => value === repeatPassword.current})} />
                {errors.pwdCheck && <p className="error">passwords do not match</p>}
    
                <div className="signupButton">
                    <Link to="/"> Back to Login </Link>
                    <br/>
                    <input type="submit" value="Create new account" /> 
                </div>     
            </form>
        </div>
    )
}