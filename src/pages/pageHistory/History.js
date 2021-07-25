import React, { useState, useEffect } from "react";

import RenderHistory from "../../components/RenderHistory";
import {
  Typography,
  makeStyles,
  Paper,
  Divider,
  Button,
  Box,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { db } from "../../config/firebase";
import { useAuth } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  title: {
    margin: "auto",
    textAlign: "center",
  },
  tableBox: {
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    [theme.breakpoints.up("sm")]: {
      width: "50%",
    },
    margin: "auto",
    marginTop: "50px",
  },

  buttonBox: {
    margin: "30px",
    textAlign: "center",
    marginTop: "10px",
  },
  button: {
    backgroundColor: "#f44336",
    color: "#ffebee",
  },
}));
export default function History() {
  const classes = useStyles();
  const [searchHistory, setSearchHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [width, setWidth] = useState(window.innerWidth);
  const breakpoint = 750;
  const { currentUser } = useAuth();
  const [toBeDeleted, setToBeDeleted] = useState([]);
  const [isDeletingItems, setIsDeletingItems] = useState(false);

  useEffect(() => {
    // correct way to set title is with react-helmet (its a library, go look it up)
    document.title = "History";
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);

    const fetchSearchHistory = async () => {
      const allData = await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("searchHistory")
        .get();
      const foodData = await db
        .collection("users")
        .doc(currentUser.uid)
        .collection("foodSearchHistory")
        .get();
      const shopArr = allData.docs.map((doc) => [doc.id, doc.data(), "shop"]);
      const foodArr = foodData.docs.map((doc) => [doc.id, doc.data(), "food"]);
      const arr = shopArr.concat(foodArr);
      arr.sort((a, b) => (a[1]["timestamp"] < b[1]["timestamp"] ? 1 : -1));
      setSearchHistory(arr);
    };

    fetchSearchHistory();
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [currentUser]);

  const handleChange = (e, value) => {
    setCurrentPage(value);
  };

  const addToDelete = (item, type) => {
    setToBeDeleted([...toBeDeleted, [item, type]]);
  };

  const removeFromDelete = (item, type) => {
    const newDelete = toBeDeleted.filter((x) =>
      x[0] !== item ? true : x[1] !== type
    );
    setToBeDeleted(newDelete);
  };

  const resetDelete = () => {
    setIsDeletingItems(false);
    setToBeDeleted([]);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchHistory.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div>
      <Paper className={classes.tableBox}>
        {width < breakpoint ? (
          <Typography variant="h6" className={classes.title}>
            Showing {indexOfFirstItem + 1} -{" "}
            {indexOfLastItem > searchHistory.length
              ? searchHistory.length
              : indexOfLastItem}{" "}
            of {searchHistory.length} items
          </Typography>
        ) : (
          <Typography variant="h4" className={classes.title}>
            Showing {indexOfFirstItem + 1} -{" "}
            {indexOfLastItem > searchHistory.length
              ? searchHistory.length
              : indexOfLastItem}{" "}
            of {searchHistory.length} items
          </Typography>
        )}

        <Divider />
        <RenderHistory
          items={currentItems}
          isDeletingItems={isDeletingItems}
          addToDelete={addToDelete}
          removeFromDelete={removeFromDelete}
        />
        <Pagination
          onChange={handleChange}
          count={Math.ceil(searchHistory.length / itemsPerPage)}
          defaultPage={1}
        />
      </Paper>
      <Box className={classes.buttonBox}>
        {isDeletingItems ? (
          <>
            <Button
              color="primary"
              variant="outlined"
              onClick={() => resetDelete()}
            >
              stop deleting
            </Button>
            <Button color="primary" variant="outlined">
              delete all
            </Button>
          </>
        ) : (
          <Button
            color="inherit"
            variant="contained"
            onClick={() => setIsDeletingItems(!isDeletingItems)}
            className={classes.button}
          >
            delete search history
          </Button>
        )}
      </Box>
    </div>
  );
}
