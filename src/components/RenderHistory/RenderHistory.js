import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";

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
  const redirectToResults = (keyword, type) => {
    if (type === "shop") {
      history.push({
        pathname: "/",
        state: { keyword: keyword },
      });
    } else if (type === "food") {
      history.push({
        pathname: "/food",
        state: { keyword: keyword },
      });
    }
  };
  return (
    <List className={classes.list}>
      {items.map((item, i) => (
        <ListItem key={i}>
          <ListItemText primary={item[0] + "(" + item[2] + ")"} />
          <ListItemText
            secondary={moment(item[1]["timestamp"].toDate()).fromNow()}
          />
          <ListItemSecondaryAction>
            <IconButton onClick={() => redirectToResults(item[0], item[2])}>
              <LinkIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}
