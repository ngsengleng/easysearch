import React from "react";
import {
  Button,
  Grid,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";

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

export default function ResultsHeader({ sortConfig, sortResults }) {
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
          <Button
            size="medium"
            color="primary"
            className={classes.sortButton}
            onClick={() => sortResults("price")}
          >
            price {sortConfig["price"]}
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            size="medium"
            className={classes.sortButton}
            onClick={() => sortResults("store")}
          >
            store {sortConfig["store"]}
          </Button>
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
