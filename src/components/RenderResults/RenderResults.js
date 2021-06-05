import React from "react";

import { Grid } from "@material-ui/core";
import styles from "./RenderResults.module.css";
import { Button } from "@material-ui/core";

// this is able to render object onClick

export default function RenderResults(props) {
  var num = 0;

  if (props.bool) {
    return (
      <Grid container justify="center" className={styles.displayGrid}>
        {props.itemData.map((data) => {
          num += 1;
          const url = data?.url.includes("https://")
            ? data?.url
            : "https://" + data?.url;
          return (
            <RenderLink
              key={num}
              bool={props.bool}
              url={url}
              itemData={data}
              store={props.store}
            />
          );
        })}
      </Grid>
    );
  } else {
    return null;
  }
}

function RenderLink(props) {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Grid container item className={styles.itemBox}>
      <Grid item xs={3}>
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
          onClick={() => openInNewTab(props.url)}
        >
          Go to site
        </Button>
      </Grid>
    </Grid>
  );
}
