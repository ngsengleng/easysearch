import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Divider,
  Typography,
  makeStyles,
} from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";

const useStyles = makeStyles({
  sortButton: {
    color: "#212121",
    backgroundColor: "#80d8ff",
  },

  buttonGrid: { textAlign: "center" },

  divider: {
    height: "5px",
    backgroundColor: "#212121",
  },

  resultHeader: {
    paddingTop: "5px",
  },

  headerText: {
    padding: "5px",
    textAlign: "center",
    alignItems: "center",
  },
});

export default function ResultsHeader({ sortConfig, sortResults }) {
  const classes = useStyles();

  const [width, setWidth] = useState(window.innerWidth);
  const lg = 1000;
  const sm = 750;
  const xs = 400;
  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <div>
      <Grid container className={classes.resultHeader}>
        <Grid item xs={width < lg ? false : 1}></Grid>

        <Grid item xs={2} className={classes.headerText}>
          <Typography variant="button" display="block" gutterBottom>
            IMAGE
          </Typography>
        </Grid>

        {width < lg ? (
          <Grid item xs={2} className={classes.headerText}>
            <Typography variant="button" display="block" gutterBottom>
              ITEM
            </Typography>
          </Grid>
        ) : (
          <Grid item xs={3} className={classes.headerText}>
            <Typography variant="button" display="block" gutterBottom>
              ITEM NAME
            </Typography>
          </Grid>
        )}

        <Grid item xs={width < lg ? 2 : 1} className={classes.buttonGrid}>
          <Button
            size="medium"
            color="primary"
            className={classes.sortButton}
            onClick={() => sortResults("price")}
          >
            price {sortConfig["price"] === "ascending" ? "↑" : "↓"}
          </Button>
        </Grid>

        <Grid item xs={width < lg ? 2 : 1} className={classes.buttonGrid}>
          <Button
            size="medium"
            className={classes.sortButton}
            onClick={() => sortResults("store")}
          >
            store {sortConfig["store"] === "ascending" ? "↑" : "↓"}
          </Button>
        </Grid>

        {width < sm ? null : (
          <Grid item xs={1} className={classes.headerText}>
            <Typography variant="button" display="block" gutterBottom>
              RATING
            </Typography>
          </Grid>
        )}

        <Grid item xs={width < sm ? 2 : 1} className={classes.headerText}>
          <Typography variant="button" display="block" gutterBottom>
            WISHLIST
          </Typography>
        </Grid>

        <Grid item xs={width < xs ? 2 : 1} className={classes.headerText}>
          {width < lg ? (
            <LinkIcon />
          ) : (
            <Typography variant="button" display="block" gutterBottom>
              link to site
            </Typography>
          )}
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
    </div>
  );
}
