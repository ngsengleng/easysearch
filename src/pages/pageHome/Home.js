// this is the homepage
// TODO

import React from "react";
import { Button } from "@material-ui/core";
import { firebase } from "@firebase/app";

export default function Home() {
    const handleLogout = (firebase) => {
        firebase.auth().signOut();
      };
    return (
        <div>
            <p> this is the homepage.</p>
            <Button variant="contained" color="inherit" onClick={() => handleLogout(firebase)}>Logout</Button>
        </div>
    )
    
}