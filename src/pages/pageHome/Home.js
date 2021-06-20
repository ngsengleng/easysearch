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
  // key for helping react keep track of map variables
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
  // name of product is saved as the document name
  const updateHistory = (keyword) => {
    const currentUser = firebase.auth().currentUser.uid;
    var searchHistory = db
      .collection("users")
      .doc(currentUser)
      .collection("searchHistory")
      .doc(keyword);
    searchHistory
      .set(
        {
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      )
      .then(() => console.log("successfully updated database"))
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };

  // gets data from firebase realtime database
  // on successful return will save search keyword under user
  const fetchData = (data) => {
    const dbRef = firebase.database().ref("/" + data.searchValue);
    dbRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        const dataArr = [];
        const test = [];
        snapshot.forEach((entry) => {
          dataArr.push([entry.key, entry.val()]);
          entry.val().forEach((x) => test.push([entry.key, x]));
        });
        // sort by price from low to high
        test.sort((a, b) => {
          const priceA = a[1]["price"].substring(1);
          const priceB = b[1]["price"].substring(1);
          return priceA - priceB;
        });
        // sort by store name from a to z
        //test.sort((a, b) => (a[0] < b[0] ? -1 : 1));
        setValue(test);
        setBool(true);
        // add word to search history of user
        updateHistory(data.searchValue);
      } else {
        setValue();
        alert("no results found");
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
