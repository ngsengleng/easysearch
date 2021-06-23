import React, { useState, useEffect } from "react";
import "firebase/database";
import "firebase/firestore";
import { firebase } from "@firebase/app";
import RenderHistory from "../../components/RenderHistory";

const db = firebase.firestore();

export default function History() {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // correct way to set title is with react-helmet (its a library, go look it up)
    document.title = "history";

    const fetchSearchHistory = async () => {
      const currentUser = firebase.auth().currentUser.uid;
      const allData = await db
        .collection("users")
        .doc(currentUser)
        .collection("searchHistory")
        .get();
      const arr = allData.docs.map((doc) => [doc.id, doc.data()]);
      arr.sort((a, b) => (a[1] < b[1] ? 1 : -1));
      setSearchHistory(arr);
    };

    fetchSearchHistory();
  }, []);

  /*   var indexOfLastItem = currentPage * itemsPerPage;
  var indexOfFirstItem = indexOfLastItem - itemsPerPage;
  var currentItems = searchHistory.slice(1, 5); */
  return (
    <div>
      <p>adasd</p>
      <p>asahsgdashdg</p>
      <RenderHistory items={searchHistory} />
    </div>
  );
}
