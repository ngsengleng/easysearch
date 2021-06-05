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
  var key = 0;
  const store = "ezbuy";

  const { control, handleSubmit } = useForm();
  const [value, setValue] = useState();
  const [bool, setBool] = useState(false);

  const onSubmit = (keyword) => {
    fetchData(keyword, store);
  };

  const fetchData = (data, store) => {
    const dbRef = firebase.database().ref("/" + data.searchValue);
    dbRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        const dataArr = [];
        snapshot.forEach((entry) => {
          dataArr.push([entry.key, entry.val()]);
        });
        setValue(dataArr);
        setBool(true);
      } else {
        alert("no product available");
      }
    });
  };
  console.log(value);
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
              error={!!error}
              helperText={error ? error.message : null}
            />
          )}
          rules={{ required: "Please type something" }}
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
      {value?.map((entry) => {
        key += 1;
        return (
          <RenderResults
            key={key}
            itemData={entry[1]}
            bool={bool}
            store={entry[0]}
          />
        );
      })}
    </div>
  );
}
