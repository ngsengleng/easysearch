import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import { FirebaseAuthConsumer, IfFirebaseAuthed } from "@react-firebase/auth";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import React, { useState } from "react";
import { useHistory, withRouter } from "react-router-dom";

const useStyles = makeStyles({
  title: {
    flexGrow: "1",
  },
});
function AppShell() {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    setAnchorEl(null);
    firebase.auth().signOut();
    history.push("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" className={classes.title}>
          EasySearch
        </Typography>
        <FirebaseAuthConsumer>
          <IfFirebaseAuthed>
            {() => (
              <div>
                <Button
                  color="inherit"
                  aria-describedby="home"
                  onClick={() => history.push("/")}
                >
                  home
                </Button>
                <Button
                  color="inherit"
                  aria-describedby="search-history"
                  onClick={() => history.push("/history")}
                >
                  history
                </Button>
                <Button
                  color="inherit"
                  aria-describedby="wishlist"
                  onClick={() => history.push("/wishlist")}
                >
                  wishlist
                </Button>
                <Button
                  color="inherit"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  User
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleSignout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
          </IfFirebaseAuthed>
        </FirebaseAuthConsumer>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(AppShell);
