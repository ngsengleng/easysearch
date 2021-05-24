import { 
    AppBar, 
    Button, 
    IconButton, 
    Toolbar
} from "@material-ui/core";
import {
    FirebaseAuthConsumer,
    IfFirebaseAuthed,
} from "@react-firebase/auth";
import { firebase } from "@firebase/app";
import MenuIcon from '@material-ui/icons/Menu';
import styles from "./AppShell.module.css";



export default function AppShell() {
    const handleLogout = (firebase) => {
        firebase.auth().signOut();
    };
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton className={styles.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <FirebaseAuthConsumer>
                <IfFirebaseAuthed>
                    <Button color="inherit" onClick={() => handleLogout(firebase)}>Logout</Button>
                </IfFirebaseAuthed>
            </FirebaseAuthConsumer>
            </Toolbar>
        </AppBar>
    )
}

