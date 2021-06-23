import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";

export default function RenderHistory({ items }) {
  return (
    <List>
      {items.map((item, i) => (
        <ListItem key={i}>
          <ListItemText primary={item[0]} />
        </ListItem>
      ))}
    </List>
  );
}
