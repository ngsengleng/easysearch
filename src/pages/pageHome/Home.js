import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import styles from "./Home.module.css";
import RenderResults from "../../components/RenderResults";

import "firebase/database";
import "firebase/firestore";
import { firebase } from "@firebase/app";

var db = firebase.firestore();

const useStyles = makeStyles({
  sortButton: {
    color: "#212121",
    backgroundColor: "#80d8ff",
  },

  divider: {
    height: "5px",
    backgroundColor: "#212121",
  },

  resultHeader: {
    paddingTop: "5px",
  },

  headerText: {
    padding: "5px",
  },
});

export default function Home() {
  // shops in circulation
  const shops = ["ezbuy", "shopee", "amazon", "qoo10"];
  // key for helping react keep track of map variables
  var key = 0;

  const classes = useStyles();
  const { control, handleSubmit } = useForm();
  const [value, setValue] = useState([]);
  const [bool, setBool] = useState(false);
  const [apiSuccess, setApiSuccess] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: "price",
    direction: null,
  });

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

  // https://easysearchserver.herokuapp.com/<insert keyword>/ezbuy
  // https://easysearchserver.herokuapp.com/<insert keyword>/shopee
  // https://easysearchcrawl.herokuapp.com/<insert keyword>/q100
  // "https://easysearchcrawl.herokuapp.com/<insert>/amazon"
  const runSearchAPI = async (keyword, shop) => {
    const hyperlinks = {
      shopee: "https://easysearchserver.herokuapp.com/" + keyword + "/shopee",
      ezbuy: "https://easysearchserver.herokuapp.com/" + keyword + "/ezbuy",
      amazon: "https://easysearchcrawl.herokuapp.com/" + keyword + "/amazon",
      qoo10: "https://easysearchcrawl2.herokuapp.com/" + keyword + "/q100",
    };

    await Promise.all(
      shop.map((x) =>
        fetch(hyperlinks[x]).catch((error) => setApiSuccess(false))
      )
    );

    return true;
  };
  // gets data from firebase realtime database
  // on successful return will save search keyword under user

  // to set state of which sorter to do what
  const requestSort = (key) => {
    console.log(key);
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // function to sort returned results
  const sortResults = (key) => {
    requestSort(key);
    if (key === "price") {
      value.sort((a, b) => {
        const priceA = a[1]["price"].substring(1);
        const priceB = b[1]["price"].substring(1);
        return sortConfig.direction === "descending"
          ? priceA - priceB
          : priceB - priceA;
      });
    } else if (key === "store") {
      return sortConfig.direction === "descending"
        ? value.sort((a, b) => (a[0] < b[0] ? -1 : 1))
        : value.sort((a, b) => (a[0] < b[0] ? 1 : -1));
    }
  };

  const fetchData = (data) => {
    const dbRef = firebase.database().ref("/" + data.searchValue);
    dbRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        const dataArr = [];
        const availableShops = [];

        snapshot.forEach((entry) => {
          availableShops.push(entry.key);
          entry.val().forEach((x) => dataArr.push([entry.key, x]));
        });
        console.log(availableShops);
        var leftoverShops = shops.filter(
          (item) => !availableShops.some((item2) => item === item2)
        );
        console.log(leftoverShops);
        if (leftoverShops.length !== 0) {
          runSearchAPI(data.searchValue, leftoverShops);
        } else {
          setValue(dataArr);
          setBool(true);
          updateHistory(data.searchValue);
        }
      } else {
        if (runSearchAPI(data.searchValue, shops)) {
          console.log("successfully searched");
        } else {
          console.log("you fucked up");
        }
      }
    });
  };

  if (!apiSuccess) {
    console.log("failed api");
  }

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

      <div>
        <Grid container className={classes.resultHeader}>
          <Grid item xs={1}></Grid>
          <Grid item xs={2} className={classes.headerText}>
            <Typography variant="button" display="block" gutterBottom>
              IMAGE
            </Typography>
          </Grid>
          <Grid item xs={3} className={classes.headerText}>
            <Typography variant="button" display="block" gutterBottom>
              ITEM NAME
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Button
              size="medium"
              color="primary"
              className={classes.sortButton}
              onClick={() => sortResults("price")}
            >
              price {sortConfig.key === "price" && sortConfig.direction}
            </Button>
          </Grid>
          <Grid item xs={2}>
            <Button
              size="medium"
              className={classes.sortButton}
              onClick={() => sortResults("store")}
            >
              store {sortConfig.key === "store" && sortConfig.direction}
            </Button>
          </Grid>
          <Grid item xs={2} className={classes.headerText}>
            <Typography variant="button" display="block" gutterBottom>
              LINK TO SITE
            </Typography>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
      </div>

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
