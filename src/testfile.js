import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    margin: "auto",
    maxWidth: "50%",
  },

  item: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },
});

export default function TrendingCarousel() {
  const classes = useStyles();
  const items = [
    {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      name: "Random Name #2",
      description: "Hello World!",
    },
  ];

  return (
    <div>
      <Carousel animation="slide" className={classes.root}>
        {items.map((item, i) => (
          <Item key={i} item={item} />
        ))}
      </Carousel>
    </div>
  );
}

function Item({ item }) {
  const classes = useStyles();

  return (
    <Paper className={classes.item}>
      <h2>{item.name}</h2>
      <p>{item.description}</p>

      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  );
}
