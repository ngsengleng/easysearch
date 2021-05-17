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

        <div>
            <h1>
                EasySearch
            </h1>
            <p>
                We get the best deals anywhere
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label> Username: </label>
                <input type="text" {...register("Username", { required: true })} />
                {errors.Username && <p className="error">this is required</p>}

                <label> Password: </label>
                <input type="text" {...register("Password", { required: true })} />
                {errors.Password && <p className="error">this is required</p>}
            
                <div>
                    <Link to="/signup">
                        New user?
                    </Link>
                    <input type="submit" value="Login" /> 
                </div>     
            </form>
        </div>
    )
}