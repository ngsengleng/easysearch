import React, { useEffect, useState } from "react";
import RenderResults from "../../components/RenderResults";
import "firebase/database";
import "firebase/firestore";
import { firebase } from "@firebase/app";

const db = firebase.firestore();

export default function Wishlist() {
  const [wishlist, setWishlist] = useState();
  const [bool, setBool] = useState();

  // fetch data from firestore on page render
  useEffect(() => {
    document.title = "wishlist";
    const fetchWishlist = async () => {
      const currentUser = firebase.auth().currentUser.uid;
      const data = await db
        .collection("users")
        .doc(currentUser)
        .collection("wishlist")
        .doc("arrayOfItems");
      data.get().then((doc) => {
        if (doc.exists) {
          setWishlist(doc.data().items);
          setBool(true);
        } else {
          console.log("no such document");
        }
      });
    };
    fetchWishlist();
  }, []);
  return (
    <div>
      {wishlist?.map((entry, idx) => {
        return (
          <RenderResults
            key={idx}
            itemData={entry}
            bool={bool}
            store={entry.store}
          />
        );
      })}
    </div>
  );
}
