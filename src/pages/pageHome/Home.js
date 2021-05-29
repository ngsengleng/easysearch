// this is the homepage
// TODO

import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import styles from "./Home.module.css";
import RenderResults from "../../components/RenderResults";

import firebase from "firebase/app";
import "firebase/database";

export default function Home() {
  const store = "ezbuy";

  const { control, handleSubmit } = useForm();

  const [value, setValue] = useState();
  const [bool, setBool] = useState(false);

  const onSubmit = (keyword) => {
    fetchData(keyword, store);
  };

  const fetchData = (data, store) => {
    const dbRef = firebase.database().ref("/" + data.searchValue + "/" + store);
    dbRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setValue(data);
      setBool(true);
    });
  };

  return (
    <div>
      <form className={styles.home} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="searchValue"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              className={styles.searchBox}
              variant="outlined"
              label="Search an item..."
              size="small"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Button
          variant="contained"
          color="primary"
          className={styles.searchButton}
          type="submit"
        >
          Search
        </Button>
      </form>
      <RenderResults itemData={value} bool={bool} />
    </div>
  );
}
