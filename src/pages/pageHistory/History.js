import React, { useEffect } from "react";

export default function History() {
  /* useEffect(() => {
    fetch("https://easysearchcrawl.herokuapp.com/shoe/q100").then((response) =>
      console.log(response)
    );
  }, []); */
  useEffect(() => {
    var today = new Date();
    console.log(today.toISOString());
  }, []);

  return <p>This is the history page</p>;
}
