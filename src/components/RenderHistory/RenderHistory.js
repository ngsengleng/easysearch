import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  ListItemSecondaryAction,
  Button,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import moment from "moment";
const useStyles = makeStyles({
  list: {
    margin: "auto",
    maxWidth: "70%",
  },
});

export default function RenderHistory({ items }) {
  const classes = useStyles();
  const history = useHistory();
  const redirectToResults = (keyword) => {
    history.push({
      pathname: "/",
      state: { keyword: keyword },
    });
  };
  return (
    <List className={classes.list}>
      {items.map((item, i) => (
        <ListItem key={i}>
          <ListItemText primary={item[0]} />
          <ListItemText
            secondary={moment(item[1]["timestamp"].toDate()).fromNow()}
          />
          <ListItemSecondaryAction>
            <Button onClick={() => redirectToResults(item[0])}>results</Button>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}
