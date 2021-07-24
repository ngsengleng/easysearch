import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
} from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";

import { useHistory } from "react-router-dom";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  list: {
    [theme.breakpoints.down("xs")]: {
      maxWidth: "90%",
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "70%",
    },
    margin: "auto",
  },
}));

export default function RenderHistory({
  items,
  isDeletingItems,
  addToDelete,
  removeFromDelete,
}) {
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
        <HistoryElement
          key={i}
          item={item}
          isDeletingItems={isDeletingItems}
          redirectToResults={redirectToResults}
          addToDelete={addToDelete}
          removeFromDelete={removeFromDelete}
        />
      ))}
    </List>
  );
}

function HistoryElement({
  item,
  isDeletingItems,
  redirectToResults,
  addToDelete,
  removeFromDelete,
}) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isDeletingItems) {
      setChecked(false);
    }
    setChecked(false);
  }, [isDeletingItems, item]);

  const handleCheck = (item, type) => {
    if (checked) {
      removeFromDelete(item, type);
    } else {
      addToDelete(item, type);
    }
    setChecked(!checked);
  };
  return (
    <ListItem>
      <ListItemText primary={item[0] + "(" + item[2] + ")"} />
      <ListItemText
        secondary={moment(item[1]["timestamp"].toDate()).fromNow()}
      />
      <ListItemSecondaryAction>
        {isDeletingItems ? (
          <Checkbox
            checked={checked}
            onChange={() => handleCheck(item[0], item[2])}
          />
        ) : null}
        <IconButton onClick={() => redirectToResults(item[0], item[2])}>
          <LinkIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
