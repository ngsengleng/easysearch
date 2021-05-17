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
        <div>
            <h1>
                EasySearch
            </h1>
            <p>
                We get the best deals anywhere
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label> New username: </label>
                <input type="text" {...register("Username", { required: true})} />
                {errors.Username && <p className="error">this is required</p>}

                <label> New password: </label>
                <input type="text" {...register("Password", { required: true})} />
                {errors.Password && <p className="error">this is required</p>}

                <label> Retype password: </label>
                <input type="text" {...register("pwdCheck", { required: true})} />
                {errors.pwdCheck && <p className="error">this is required</p>}
    
                <div>
                    <Link to="/"> Back to Login </Link>
                    <input type="submit" value="Create new account" /> 
                </div>     
            </form>
        </div>
    )
}