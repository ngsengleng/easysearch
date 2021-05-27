import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/database";
import { Button, Grid } from "@material-ui/core";

// this is able to render object onClick

export default function Data(props) {
    const dbRef = firebase.database().ref("/airpods/" + props.store);
    const [value, setValue] = useState();
    const [bool, setBool] = useState();

    const fetchData = () => dbRef.on('value', (snapshot) => {
        const data = snapshot.val();
        setValue(data);
        setBool(true);
      })


    return (
        <Grid container justify="center">
            <Button variant="contained" color="primary" onClick={fetchData} >get something</Button>
            <RenderLink 
                bool={bool}
                url={value?.url} />
        </Grid>
            
    )
}

function RenderLink(props) {
    if (props.bool) {
        return (
            <Grid item>
                <a href={props.url}>go to product</a>
            </Grid>
        )
    } else {
        return null;
    }
}