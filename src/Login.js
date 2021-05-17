import "./Login.css";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

// TODO
// credential verification
// route to home page

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => alert(JSON.stringify(data));

    return (

        <div className="loginForm">
            <div className="loginTitle">
                <h1>
                    EasySearch
                </h1>
                <h3>
                    We get the best deals anywhere
                </h3>
            </div>
            
            <form className="loginBox" onSubmit={handleSubmit(onSubmit)}>

                <label> Username: </label>
                <input type="text" {...register("Username", { required: true })} />
                {errors.Username && <p className="error">This is required</p>}

                <label> Password: </label>
                <input type="text" {...register("Password", { required: true })} />
                {errors.Password && <p className="error">This is required</p>}
            
                <div className="loginButton">
                    <input type="submit" value="Login" /> 
                    <br/>
                    <Link to="/signup">
                        New user?
                    </Link>
                </div>     
            </form>
        </div>
    )
}