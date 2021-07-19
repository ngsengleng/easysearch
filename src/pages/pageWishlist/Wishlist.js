import React, { useEffect, useState } from "react";
import RenderResults from "../../components/RenderResults";
import "firebase/database";
import "firebase/firestore";
import { firebase } from "@firebase/app";
import { Typography, makeStyles, Link, Button, Box } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import GeneralHeader from "../../components/GeneralHeader";

const db = firebase.firestore();

const useStyles = makeStyles({
  pageHeader: {
    margin: "30px",
    textAlign: "center",
    marginTop: "10px",
    borderSpacing: "",
  },

  homeLink: {
    color: "black",
    margin: "auto",
    textAlign: "center",
    marginTop: "10px",
  },
});

export default function Wishlist() {
  const history = useHistory();
  const classes = useStyles();
  const [wishlist, setWishlist] = useState([]);
  const [bool, setBool] = useState();
  const [subscribed, setSubscribed] = useState(false);
  const goToHome = () => history.push("/");
  // fetch data from firestore on page render
  useEffect(() => {
    document.title = "Wishlist";
    let unsubscribe = "";
    let unsub = "";

    const fetchWishlist = async () => {
      const currentUser = firebase.auth().currentUser.uid;
      const mailingList = await db.collection("users").doc(currentUser);
      unsub = mailingList.onSnapshot((doc) => {
        if (doc.exists) {
          setSubscribed(doc.data()["mailing_list"]);
        }
      });
      const data = await db
        .collection("users")
        .doc(currentUser)
        .collection("wishlist")
        .doc("arrayOfItems");
      unsubscribe = data.onSnapshot((doc) => {
        if (doc.exists) {
          setWishlist(doc.data().items);
          setBool(true);
        } else {
          console.log("no such document");
        }
      });
    };
    fetchWishlist();
    return () => {
      unsubscribe();
      unsub();
    };
  }, []);
  const subscribeToWishlist = async () => {
    const currentUser = firebase.auth().currentUser.uid;
    setSubscribed(true);
    db.collection("users").doc(currentUser).set(
      {
        mailing_list: true,
      },
      { merge: true }
    );
  };
  const unsubscribeFromWishlist = async () => {
    const currentUser = firebase.auth().currentUser.uid;
    setSubscribed(false);
    db.collection("users").doc(currentUser).set(
      {
        mailing_list: false,
      },
      { merge: true }
    );
  };
  return (
    <div>
      <Box className={classes.pageHeader}>
        <Typography
          variant="h3"
          display="block"
          gutterBottom
          className={classes.pageHeader}
        >
          Wishlist
        </Typography>

        {!subscribed ? (
          <Button
            variant="outlined"
            color="inherit"
            onClick={subscribeToWishlist}
          >
            Subcribe to notifications now!
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="inherit"
            onClick={unsubscribeFromWishlist}
          >
            Unsubscribe
          </Button>
        )}
      </Box>

      <GeneralHeader />
      {wishlist === undefined || wishlist.length === 0 ? (
        <div>
          <Typography
            variant="h5"
            display="block"
            gutterBottom
            className={classes.pageHeader}
          >
            Your wishlist is empty
          </Typography>
          <Typography variant="subtitle1" className={classes.homeLink}>
            <Link href="/" onClick={goToHome} color="inherit">
              Search for some items now!
            </Link>
          </Typography>
        </div>
      ) : (
        wishlist?.map((entry, idx) => {
          return (
            <RenderResults
              type={"shops"}
              key={idx}
              itemData={entry}
              bool={bool}
              store={entry.store}
            />
          );
        })
      )}
    </div>
  );
}
