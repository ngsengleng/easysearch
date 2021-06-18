import React, { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import styles from "./Home.module.css";
import RenderResults from "../../components/RenderResults";

import "firebase/database";
import "firebase/firestore";
import { firebase } from "@firebase/app";

var db = firebase.firestore();

export default function Home() {
  var key = 0;

  const { control, handleSubmit } = useForm();
  const [value, setValue] = useState();
  const [bool, setBool] = useState(false);

  const onSubmit = (keyword) => {
    fetchData(keyword);
  };

  useEffect(() => {
    document.title = "Home";
  }, []);

  // submits user search history keyword to firestore
  const updateHistory = (keyword) => {
    const currentUser = firebase.auth().currentUser.uid;
    var searchHistory = db.collection("users").doc(currentUser);
    searchHistory.update({
      searchHistory: firebase.firestore.FieldValue.arrayUnion(keyword),
    });
  };

  // gets data from firebase realtime database
  // on successful return will save search keyword under user
  const fetchData = (data) => {
    const dbRef = firebase.database().ref("/" + data.searchValue);
    dbRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        const dataArr = [];
        snapshot.forEach((entry) => {
          dataArr.push([entry.key, entry.val()]);
        });
        setValue(dataArr);
        setBool(true);
        updateHistory(data.searchValue);
      } else {
        setValue();
      }
    });
  };

  return (
    <div>
      <h1 className={styles.title}>What do you want to buy today?</h1>
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
