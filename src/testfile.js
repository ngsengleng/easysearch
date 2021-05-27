import React from "react";
import { Grid, Paper, makeStyles  } from "@material-ui/core";
import Data from "./dbtest";

// this is to render multiple objects on one page
// TODO

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      paddingTop: '2rem',
    },
    paper: {

    },
    control: {
      padding: theme.spacing(2),
    },
  }));



export default function Test() {
    const classes = useStyles();
    const str = "Lazada";


    function FormRow() {
        return (
          <React.Fragment>
            <Grid item xs={4}>
              <Paper className={classes.paper}>cow</Paper>
            </Grid>
           
          </React.Fragment>
        );
    }

    
    return (
        <div>
            <Grid container justify="center" spacing={2} className={classes.root}>
            {[0, 1, 2, 3, 4,5,6,7,8,9,10].map((value) => (
                <Grid key={value} item>
                    <Paper variant="outlined" className={classes.paper}> 
                    <img src="https://sg-test-11.slatic.net/p/740730bc26b1ea1f1fad471901865d7b.jpg_200x200q90.jpg_.webp" alt="some stuff" />
                    </Paper>
                </Grid>
            ))}
              <Grid container justify="center">
                  <FormRow />
              </Grid>
              <Data store={str}/>
            </Grid>
            
        </div>
            
        
            
        
    )
}