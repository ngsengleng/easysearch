import styles from "./Login.module.css";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Button, TextField } from "@material-ui/core";
import { firebase } from "@firebase/app";

// TODO
// credential verification

export default function Login() {

    const { control, handleSubmit } = useForm();
    const history = useHistory();
    const onSubmit = async data => {
        firebase.auth().signInWithEmailAndPassword(data.Email, data.Password)
            .then(history.push("/"))
            .catch(error => {
                var errorCode = error.code;
                if (errorCode === 'auth/wrong-password') {
                    alert('Wrong password.');
                } else if (errorCode === 'auth/user-not-found'){
                    alert("This user does not exist.");
                }
            });
            
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
                
                <Controller
                    name="Email"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                        label="Email"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                    />
                    )}
                    rules={{ required: 'Email required' }}
                />
            
                <Controller
                    name="Password"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                        label="Password"
                        value={value}
                        onChange={onChange}
                        error={!!error}
                        helperText={error ? error.message : null}
                    />
                    )}
                    rules={{ required: 'Password required' }}
                />

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