import styles from "./Signup.module.css";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";

import { firebase } from "@firebase/app";
// TODO

export default function Signup() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    // password comparing variables
    const repeatPassword = useRef({});
    repeatPassword.current = watch("Password", "");
        
    const history = useHistory();
    const signUp = async data => {
        await firebase.auth().createUserWithEmailAndPassword(data.Email, data.Password)
        .then(history.push("/"));
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
            <form className={styles.Boxes} onSubmit={handleSubmit(signUp)}>

                <TextField id="standard-basic" label="email" {...register("Email", { required: true})} />
                {errors.Username && <p className={styles.error}>this is required</p>}

                <TextField id="standard-basic" label="password" {...register("Password", { required: true, minLength: 6})} />
                {errors.Password && <p className={styles.error}>this is required</p>}

                <TextField id="standard-basic" label="retype password" {...register("pwdCheck", {minLength: 6,
                validate: value => value === repeatPassword.current})} />
                {errors.pwdCheck && <p className={styles.error}>passwords do not match</p>}
    
                <div className={styles.signupButton}>
                    <Button variant="contained" color="primary" type="submit">Sign Up</Button> 
                    <Link to="/"> 
                        Back to Login 
                    </Link>
                </div>     
            </form>
        </div>
    )
}