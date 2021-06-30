import React, { useState, useEffect } from "react";

import {
  Grid,
  Button,
  makeStyles,
  Typography,
  IconButton,
} from "@material-ui/core";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import IndeterminateCheckBoxIcon from "@material-ui/icons/IndeterminateCheckBox";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import "firebase/database";
import "firebase/firestore";
import { firebase } from "@firebase/app";

const db = firebase.firestore();

const useStyles = makeStyles((theme) => ({
  displayGrid: {
    marginTop: "10px",
    textAlign: "center",
    justify: "center",
  },

  image: {
    width: "70%",
    height: "auto",
    maxHeight: "250px",
  },

  title: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.5rem",
    },
  },
}));
// receive an array of items in format [storeName, itemDetails]
export default function RenderResults(props) {
  const classes = useStyles();
  const currentUser = firebase.auth().currentUser.uid;
  const a = db.collection("users").doc(currentUser).collection("wishlist");
  const [disableButton, setDisableButton] = useState();
  const num = 0;
  const url = props.itemData?.url.includes("https://")
    ? props.itemData?.url
    : "https://" + props.itemData?.url;

  // find out how to set the disableButton state back to false if no results present
  useEffect(() => {
    const newField = { store: props.store };
    const newItemData = { ...props.itemData, ...newField };

    const unsubscribe = a
      .where("items", "array-contains", newItemData)
      .onSnapshot((snapshot) => {
        snapshot.forEach((userSnapshot) => {
          setDisableButton(true);
        });
      });
    return () => {
      unsubscribe();
    };
  }, [a, props.itemData, props.store]);

  if (props.bool) {
    return (
      <Grid container className={classes.displayGrid}>
        <RenderLink
          name={props.name}
          key={num}
          bool={props.bool}
          url={url}
          itemData={props.itemData}
          store={props.store}
          disable={disableButton}
          setDisableButton={setDisableButton}
        />
      </Grid>
    );
  } else {
    return <p>no items</p>;
  }
}

function RenderLink(props) {
  const classes = useStyles();
  const currentUser = firebase.auth().currentUser.uid;
  const a = db.collection("users").doc(currentUser).collection("wishlist");
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  const [width, setWidth] = useState(window.innerWidth);
  const lg = 1000;
  const sm = 750;

  const addToWishlist = (product) => {
    const unsubscribe = a.get().then((doc) => {
      if (!doc.exists) {
        a.doc("arrayOfItems").set(
          {
            items: firebase.firestore.FieldValue.arrayUnion({
              store: props.store,
              image: product.image,
              title: product.title,
              price: product.price,
              url: product.url,
              ratings: product.ratings,
            }),
          },
          { merge: true }
        );
      }
      return () => {
        unsubscribe();
      };
    });
  };

  const removeFromWishlist = (product) => {
    props.setDisableButton(false);
    a.doc("arrayOfItems").update({
      items: firebase.firestore.FieldValue.arrayRemove({
        store: props.store,
        image: product.image,
        title: product.title,
        price: product.price,
        url: product.url,
        ratings: product.ratings,
      }),
    });
  };
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    // Return a function from the effect that removes the event listener
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <Grid container item>
      <Grid item xs={width < lg ? false : 1}></Grid>

      <Grid item xs={2}>
        <img
          src={props.itemData?.image}
          alt="product"
          className={classes.image}
        />
      </Grid>

      <Grid item xs={width < lg ? 2 : 3}>
        <Typography
          variant="body2"
          display="block"
          gutterBottom
          className={classes.title}
        >
          {props.itemData?.title}
        </Typography>
      </Grid>

      <Grid item xs={width < lg ? 2 : 1}>
        <p>{props.itemData?.price}</p>
      </Grid>

      <Grid item xs={width < lg ? 2 : 1}>
        <p>{props.store}</p>
      </Grid>

      {width < sm ? null : (
        <Grid item xs={1}>
          <p>
            {props.itemData?.ratings === undefined
              ? "NA"
              : props.itemData.ratings}{" "}
            out of 5
          </p>
        </Grid>
      )}

      <Grid item xs={width < sm ? 2 : 1}>
        {!props.disable ? (
          <IconButton
            color="primary"
            style={{ color: "#212121" }}
            onClick={() => addToWishlist(props.itemData)}
          >
            <AddBoxRoundedIcon />
          </IconButton>
        ) : (
          <IconButton
            variant="outlined"
            color="primary"
            style={{ color: "#212121" }}
            onClick={() => removeFromWishlist(props.itemData)}
          >
            <IndeterminateCheckBoxIcon />
          </IconButton>
        )}
      </Grid>
      <Grid item xs={width < sm ? 2 : 1}>
        {width < lg ? (
          <IconButton
            variant="outlined"
            color="primary"
            style={{ color: "#212121" }}
            onClick={() => openInNewTab(props.url)}
          >
            <ExitToAppRoundedIcon />
          </IconButton>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            style={{ color: "#212121" }}
            onClick={() => openInNewTab(props.url)}
          >
            go to site
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
