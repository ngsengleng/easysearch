import React, { useState, useEffect } from "react";
import "firebase/database";
import "firebase/firestore";
import { firebase } from "@firebase/app";
import RenderHistory from "../../components/RenderHistory";
import { Typography, makeStyles, Paper, Divider } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
const db = firebase.firestore();

const useStyles = makeStyles({
  title: {
    margin: "auto",
    textAlign: "center",
  },
  tableBox: {
    width: "50%",
    margin: "auto",
    marginTop: "50px",
  },
});
export default function History() {
  const classes = useStyles();
  const [searchHistory, setSearchHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // correct way to set title is with react-helmet (its a library, go look it up)
    document.title = "History";

    const fetchSearchHistory = async () => {
      const currentUser = firebase.auth().currentUser.uid;
      const allData = await db
        .collection("users")
        .doc(currentUser)
        .collection("searchHistory")
        .get();
      const arr = allData.docs.map((doc) => [doc.id, doc.data()]);
      arr.sort((a, b) => (a[1]["timestamp"] < b[1]["timestamp"] ? 1 : -1));
      setSearchHistory(arr);
    };

    fetchSearchHistory();
  }, []);

  const handleChange = (e, value) => {
    setCurrentPage(value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchHistory.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div>
      <Paper className={classes.tableBox}>
        <Typography variant="h4" className={classes.title}>
          Showing {indexOfFirstItem + 1} -{" "}
          {indexOfLastItem > searchHistory.length
            ? searchHistory.length
            : indexOfLastItem}{" "}
          of {searchHistory.length} items
        </Typography>
        <Divider />
        <RenderHistory items={currentItems} />
        <Pagination
          onChange={handleChange}
          count={Math.ceil(searchHistory.length / itemsPerPage)}
          defaultPage={1}
        />
      </Paper>
    </div>
  );
}
