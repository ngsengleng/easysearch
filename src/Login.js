import "./Login.css";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";

// TODO
// credential verification

async function userLogin(credentials) {
    return fetch('http://localhost:8080/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}


export default function Login({setToken}) {

    const history = useHistory();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        // replace this token with token from database to compare with 
        // login information, if true then proceed to homepage else try again
        // TODO
        const token = await userLogin(data);
        if (true) {
           setToken(token);
            history.push("/home"); 
        }
    }
    

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

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}