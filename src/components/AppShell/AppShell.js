import {
  AppBar,
  Button,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { FirebaseAuthConsumer, IfFirebaseAuthed } from "@react-firebase/auth";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import styles from "./AppShell.module.css";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function AppShell() {
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
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" className={styles.title}>
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
                  <MenuItem onClick={handleSignout}>My account</MenuItem>
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
