import React from "react";

import { Grid } from "@material-ui/core";
import styles from "./RenderResults.module.css";

// this is able to render object onClick

export default function RenderResults(props) {
  if (props.bool) {
    return (
      <Grid container justify="center">
        <RenderLink
          bool={props.bool}
          url={"https://" + props.itemData?.url}
          itemData={props.itemData}
        />
      </Grid>
    );
  } else {
    return null;
  }
}

function RenderLink(props) {
  return (
    <Grid item>
      <Grid item>
        <img
          className={styles.photo}
          src={props.itemData?.image}
          alt="product"
        />
      </Grid>
      <Grid item>
        <p>{props.itemData?.title}</p>
      </Grid>
      <Grid item>
        <p>{props.itemData?.price}</p>
      </Grid>
      <Grid item>
        <a href={props.url}>Go to product</a>
      </Grid>
    </Grid>
  );
}
