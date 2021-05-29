import styles from "./Signup.module.css";
import React, { useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { firebase } from "@firebase/app";

export default function Signup() {
  const { control, handleSubmit, watch } = useForm();

  // password comparing variables
  const repeatPassword = useRef({});
  repeatPassword.current = watch("Password", "");

  const history = useHistory();
  const signUp = async (data) => {
    await firebase
      .auth()
      .createUserWithEmailAndPassword(data.Email, data.Password)
      .then(history.push("/"))
      .catch((error) => {
        var errorCode = error.code;
        if (errorCode === "auth/invalid-email") {
          alert("This is not a valid email.");
          history.push("/signup");
        }
      });
  };

  return (
    <div className={styles.Form}>
      <form className={styles.Boxes} onSubmit={handleSubmit(signUp)}>
        <Controller
          className={styles.textBox}
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
          rules={{ required: "Email required" }}
        />
        <br />
        <Controller
          name="Password"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              type="password"
              label="New password"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? "Password required" : null}
            />
          )}
          rules={{ required: true, minLength: 6 }}
        />
        <br />
        <Controller
          name="pwdCheck"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              type="password"
              label="Retype password"
              value={value}
              onChange={onChange}
              error={!!error}
              helperText={error ? "Passwords do not match" : null}
            />
          )}
          rules={{
            required: true,
            minLength: 6,
            validate: (value) => value === repeatPassword.current,
          }}
        />

        <div className={styles.signupButton}>
          <Button variant="contained" color="primary" type="submit">
            Sign Up
          </Button>
          <Link to="/">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}
