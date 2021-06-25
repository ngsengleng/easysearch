import React from "react";
import Carousel from "react-material-ui-carousel";
import {
  Button,
  makeStyles,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Typography,
} from "@material-ui/core";
import tech from "../../photos/tech.jpeg";
import home from "../../photos/home.jpeg";
import beauty from "../../photos/beauty.jpeg";
import fashion from "../../photos/fashion.jpeg";
import food from "../../photos/food.jpeg";
const useStyles = makeStyles({
  root: {
    margin: "auto",
    maxWidth: "30%",
  },

  item: {
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },

  photo: {
    display: "flex",
    justifyContent: "center",
  },
});

export default function TrendingCarousel() {
  const classes = useStyles();
  const items = [
    {
      image: tech,
      name: "Technology",
    },
    {
      image: home,
      name: "Home & Health",
    },
    {
      image: beauty,
      name: "Beauty",
    },
    {
      image: fashion,
      name: "Fashion",
    },
    {
      image: food,
      name: "Food",
    },
  ];

  return (
    <Carousel animation="slide" autoPlay={true} className={classes.root}>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item({ item }) {
  const classes = useStyles();
  return (
    <Card className={classes.item}>
      <CardActionArea>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="h2"
            className={classes.text}
          >
            {item.name}
          </Typography>
        </CardContent>
        <CardMedia className={classes.photo}>
          <img src={item.image} alt="house" width="200px" height="150px"></img>
        </CardMedia>
        <CardContent>
          <Button variant="outlined" className="CheckButton">
            Trending {item.name} Products
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
