import React, { useState, useEffect, useCallback } from "react";

import { Button, TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { useLocation } from "react-router";

import "firebase/database";
import "firebase/firestore";
import { firebase } from "@firebase/app";

import { Typography, makeStyles } from "@material-ui/core";

import ResultsHeader from "../../components/ResultsHeader";
import RenderResults from "../../components/RenderResults";
import TrendingCarousel from "../../components/TrendingCarousel";

const db = firebase.firestore();

const useStyles = makeStyles((theme) => ({
  title: {
    justifyContent: "center",
    textAlign: "center",
    display: "flex",
    marginBottom: "5px",
  },

  searchBox: {
    [theme.breakpoints.down("xs")]: {
      width: "70%",
    },

    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
    alignSelf: "center",
    paddingRight: "15px",
    paddingBottom: "15px",
  },

  searchComponents: {
    justifyContent: "center",
    alignContent: "center",
    textAlign: "center",
    flexDirection: "column",
  },
}));
export default function Home() {
  const classes = useStyles();
  const location = useLocation();

  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 500;

  // key for helping react keep track of map variables
  var key = 0;
  const { control, handleSubmit } = useForm();
  const [value, setValue] = useState([]);
  const [bool, setBool] = useState(false);
  const [apiSuccess, setApiSuccess] = useState(true);
  const [disableButton, setDisableButton] = useState();
  const [sortConfig, setSortConfig] = useState({
    price: "ascending",
    store: "ascending",
  });

  const onSubmit = (keyword) => {
    setDisableButton(false);
    fetchData(keyword);
  };

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
  };

  // to set state of which sorter to do what
  const requestSort = (key) => {
    if (sortConfig[key] === "ascending") {
      setSortConfig({ ...sortConfig, [key]: "descending" });
    } else {
      setSortConfig({ ...sortConfig, [key]: "ascending" });
    }
  };

  // function to sort returned results
  const sortResults = (key) => {
    requestSort(key);
    if (key === "price") {
      setValue(
        [...value].sort((a, b) => {
          const priceA = a[1]["price"].substring(1);
          const priceB = b[1]["price"].substring(1);
          return sortConfig[key] === "descending"
            ? priceA - priceB
            : priceB - priceA;
        })
      );
    } else if (key === "store") {
      setValue(
        sortConfig[key] === "descending"
          ? [...value].sort((a, b) => {
              if (a[0] === b[0]) {
                const priceA = a[1]["price"].substring(1);
                const priceB = b[1]["price"].substring(1);
                return priceA - priceB;
              } else if (a[0] < b[0]) {
                return -1;
              } else {
                return 1;
              }
            })
          : [...value].sort((a, b) => {
              if (a[0] === b[0]) {
                const priceA = a[1]["price"].substring(1);
                const priceB = b[1]["price"].substring(1);
                return priceA - priceB;
              } else if (a[0] < b[0]) {
                return 1;
              } else {
                return -1;
              }
            })
      );
    }
  };

  // gets data from firebase realtime database
  // on successful return will save search keyword under user
  const fetchData = useCallback((data) => {
    // shops in circulation
    const shops = ["ezbuy", "shopee", "amazon", "qoo10"];
    // update search history even if no results
    updateHistory(data.searchValue);
    const dbRef = firebase.database().ref("/" + data.searchValue);
    // function to get all the values
    // await all of them
    // process the data when they are all here
    let isRetrieving = false;
    dbRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        const dataArr = [];
        let leftoverShops = [];
        const availableShops = [];
        snapshot.forEach((entry) => {
          availableShops.push(entry.key);
          entry.val().forEach((x) => dataArr.push([entry.key, x]));
        });
        leftoverShops = shops.filter(
          (item) => !availableShops.some((item2) => item === item2)
        );
        if (leftoverShops.length !== 0 && !isRetrieving) {
          isRetrieving = true;
          runSearchAPI(data.searchValue, leftoverShops);
        }
        setValue(dataArr);
        setBool(true);
      } else {
        runSearchAPI(data.searchValue, shops);
        isRetrieving = true;
      }
    });
  }, []);
  useEffect(() => {
    if (location.state !== undefined) {
      fetchData({ searchValue: location.state.keyword });
    }
  }, [location, fetchData]);
  useEffect(() => {
    if (!apiSuccess) {
      console.log("error occured in fetching api data");
    }
  }, [apiSuccess]);
  useEffect(() => {
    document.title = "Home";
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div>
      <TrendingCarousel />
      {width < breakpoint ? (
        <Typography variant="h5" className={classes.title}>
          What do you want to buy today?
        </Typography>
      ) : (
        <Typography variant="h4" className={classes.title}>
          What do you want to buy today?
        </Typography>
      )}

      <form
        className={classes.searchComponents}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="searchValue"
          control={control}
          defaultValue=""
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <TextField
              className={classes.searchBox}
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
        <Button variant="contained" color="primary" type="submit">
          Search
        </Button>
      </form>
      <ResultsHeader sortConfig={sortConfig} sortResults={sortResults} />
      {value?.map((entry) => {
        key += 1;
        return (
          <RenderResults
            disableButton={disableButton}
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
