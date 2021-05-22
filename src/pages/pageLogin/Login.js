import styles from "./Login.module.css";
import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, TextField } from "@material-ui/core";

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

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        // replace this token with token from database to compare with 
        // login information, if true then proceed to homepage else try again
        // TODO
        const token = await userLogin(data);
        if (true) {
           setToken(token);
        }
    }
    

    return (

        <div className={styles.Form}>
            <div className={styles.Title}>
                <h1>
                    EasySearch
                </h1>
                <h3>
                    We get the best deals anywhere
                </h3>
            </div>
            
            <form className={styles.Boxes} onSubmit={handleSubmit(onSubmit)}>

                <TextField id="standard-basic" label="Email" {...register("Username", { required: true })} />
                {errors.Username && <p className="error">This is required</p>}


                <TextField id="standard-basic" label="Password" {...register("Password", { required: true })} />
                {errors.Password && <p className="error">This is required</p>}
            
                <div className={styles.loginButton}>
                    <Button variant="contained" color="primary" type="submit">login</Button> 
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