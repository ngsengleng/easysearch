import React, { useState, useEffect } from "react";

import { Grid } from "@material-ui/core";
import styles from "./RenderResults.module.css";
import { Button } from "@material-ui/core";

import "firebase/database";
import "firebase/firestore";
import { firebase } from "@firebase/app";

const db = firebase.firestore();

// receive an array of items in format [storeName, itemDetails]
export default function RenderResults(props) {
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
      <Grid container justify="center" className={styles.displayGrid}>
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
  //const [inWishlist, setInWishlist] = useState();
  const currentUser = firebase.auth().currentUser.uid;
  const a = db.collection("users").doc(currentUser).collection("wishlist");

  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const addToWishlist = (product) => {
    a.doc("arrayOfItems").update({
      items: firebase.firestore.FieldValue.arrayUnion({
        store: props.store,
        image: product.image,
        title: product.title,
        price: product.price,
        url: product.url,
        ratings: product.ratings,
      }),
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
  // then check which items on display are already in wihslist, disable the add button
  // TODO
  return (
    <Grid container item>
      <Grid item xs={1}></Grid>
      <Grid item xs={2}>
        <img
          className={styles.photo}
          src={props.itemData?.image}
          alt="product"
          width="200px"
          height="200px"
        />
      </Grid>
      <Grid item xs={1}>
        <p>{props.itemData?.title}</p>
      </Grid>
      <Grid item xs={2}>
        <p>{props.itemData?.price}</p>
      </Grid>
      <Grid item xs={2}>
        <p>{props.store}</p>
      </Grid>
      <Grid item xs={1}>
        <p>
          {props.itemData?.ratings === undefined
            ? "NA"
            : props.itemData.ratings}{" "}
          out of 5
        </p>
      </Grid>
      <Grid item xs={1}>
        {!props.disable ? (
          <Button
            variant="outlined"
            color="primary"
            style={{ color: "#212121" }}
            onClick={() => addToWishlist(props.itemData)}
          >
            add
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="primary"
            style={{ color: "#212121" }}
            onClick={() => removeFromWishlist(props.itemData)}
          >
            remove
          </Button>
        )}
      </Grid>
      <Grid item xs={1}>
        <Button
          variant="outlined"
          color="primary"
          style={{ color: "#212121" }}
          onClick={() => openInNewTab(props.url)}
        >
          Go to site
        </Button>
      </Grid>
    </Grid>
  );
}
