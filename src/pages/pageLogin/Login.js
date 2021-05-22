import styles from "./Login.module.css";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, TextField } from "@material-ui/core";
import { firebase } from "@firebase/app";

// TODO
// credential verification

export default function Login({setToken}) {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const history = useHistory();
    const onSubmit = async data => {
        firebase.auth().signInWithEmailAndPassword(data.Email, data.Password).then(history.push("/"));
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

                <TextField id="standard-basic" label="Email" {...register("Email", { required: true })} />
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