import React from "react";
import { Typography, Grid, makeStyles, Divider } from "@material-ui/core";

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

  pageHeader: {
    margin: "auto",
  },
});

export default function WishlistHeader() {
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.resultHeader}>
        <Grid item xs={1}></Grid>
        <Grid item xs={2} className={classes.headerText}>
          <Typography variant="button" display="block" gutterBottom>
            IMAGE
          </Typography>
        </Grid>
        <Grid item xs={1} className={classes.headerText}>
          <Typography variant="button" display="block" gutterBottom>
            ITEM NAME
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="button" display="block" gutterBottom>
            price
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="button" display="block" gutterBottom>
            store
          </Typography>
        </Grid>
        <Grid item xs={1} className={classes.headerText}>
          <Typography variant="button" display="block" gutterBottom>
            RATING
          </Typography>
        </Grid>
        <Grid item xs={1} className={classes.headerText}>
          <Typography variant="button" display="block" gutterBottom>
            WISHLIST
          </Typography>
        </Grid>
        <Grid item xs={1} className={classes.headerText}>
          <Typography variant="button" display="block" gutterBottom>
            LINK TO SITE
          </Typography>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
    </div>
  );
}
