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

        <div className="formBox">
            <h1 className="titleText">
                EasySearch
            </h1>
            <p className="titleText">
                We get the best deals anywhere
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label> Username: </label>
                <input className="formField" type="text" {...register("Username", { required: true})} />
                {errors.Username && <p className="error">this is required</p>}

                <label> Password: </label>
                <input className="formField" type="text" {...register("Password", { required: true})} />
                {errors.Password && <p className="error">this is required</p>}
            
                <div className="submitRow">
                    <Link to="/signup">
                        New user?
                    </Link>
                    <input className="submitButton" type="submit" value="Login" /> 
                </div>     
            </form>
        </div>
    )
}