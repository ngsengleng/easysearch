import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { FirebaseAuthConsumer, IfFirebaseAuthed } from "@react-firebase/auth";
import { firebase } from "@firebase/app";
import "@firebase/auth";
import MenuIcon from "@material-ui/icons/Menu";
import styles from "./AppShell.module.css";
import React, { useState } from "react";
export default function AppShell() {
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
        <IconButton
          className={styles.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={styles.title}>
          EasySearch
        </Typography>
        <FirebaseAuthConsumer>
          <IfFirebaseAuthed>
            {() => (
              <div>
                <Button
                  color="inherit"
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  Username
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
