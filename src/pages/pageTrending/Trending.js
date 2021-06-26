import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Divider, makeStyles } from "@material-ui/core";
import RenderResults from "../../components/RenderResults/NewRenderResults";
import TrendingCarousel from "../../components/TrendingCarousel";
import GeneralHeader from "../../components/GeneralHeader";

import "firebase/database";
import { firebase } from "@firebase/app";

const useStyles = makeStyles({
  title: {
    textAlign: "center",
  },
});
export default function Trending() {
  const classes = useStyles();
  const location = useLocation();
  const [results, setResults] = useState();
  const [bool, setBool] = useState(false);
  let key = 0;
  useEffect(() => {
    window.scrollTo(0, 0);
    if (location.keyword !== undefined) {
      const dbRef = firebase.database().ref("/trending/" + location.keyword);
      dbRef.on("value", (snapshot) => {
        if (snapshot.exists()) {
          const arr = [];
          snapshot.forEach((entry) =>
            entry.val().forEach((x) => arr.push([entry.key, x]))
          );
          setResults(arr);
          setBool(true);
        } else {
          console.log("no data available");
        }
      });
    }
  }, [location]);
  return (
    <div>
      {results !== undefined ? (
        <div>
          <Typography variant="h4" className={classes.title}>
            Top {results?.length / 3} trending products from each store
          </Typography>
          <GeneralHeader />
          <Divider />
        </div>
      ) : (
        <Typography variant="h5" className={classes.title}>
          Click on one of the images below to view trending products
        </Typography>
      )}

      {results?.map((entry) => {
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
      <TrendingCarousel />
    </div>
  );
}
