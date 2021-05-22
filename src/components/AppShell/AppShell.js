import { 
    AppBar, 
    Button, 
    IconButton, 
    Toolbar,
    Typography 
} from "@material-ui/core";
import { MenuIcon } from "@material-ui/icons/Menu";
import styles from "./AppShell.module.css";

export default function AppShell() {
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={styles.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={styles.title}>
                News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>
    )
}

