import React from "react";

import { Grid } from "@material-ui/core";
import styles from "./RenderResults.module.css";
import { Button } from "@material-ui/core";

// receive an array of items in format [storeName, itemDetails]
export default function RenderResults(props) {
  var num = 0;
  const url = props.itemData?.url.includes("https://")
    ? props.itemData?.url
    : "https://" + props.itemData?.url;
  if (props.bool) {
    return (
      <Grid container justify="center" className={styles.displayGrid}>
        <RenderLink
          key={num}
          bool={props.bool}
          url={url}
          itemData={props.itemData}
          store={props.store}
        />
      </Grid>
    );
  } else {
    return <p>no items</p>;
  }
}

function RenderLink(props) {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Grid container item className={styles.itemBox}>
      <Grid item xs={1}></Grid>
      <Grid item xs={2}>
        <img
          className={styles.photo}
          src={props.itemData?.image}
          alt="product"
        />
      </Grid>
      <Grid item xs={3}>
        <p>{props.itemData?.title}</p>
      </Grid>
      <Grid item xs={2}>
        <p>{props.itemData?.price}</p>
      </Grid>
      <Grid item xs={2}>
        <p>{props.store}</p>
      </Grid>
      <Grid item xs={2}>
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
