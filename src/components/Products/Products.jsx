import React from "react";
import { Grid } from "@material-ui/core";
import okamura1 from "../../images/okamura-1.jpeg";
import okamura2 from "../../images/okamura-2.jpeg";
import okamura3 from "../../images/okamura-3.jpeg";
import okamura4 from "../../images/okamura-4.jpeg";
import okamura5 from "../../images/okamura-5.jpeg";

import Product from "../Product/Product";
import useStyles from "./styles";

const products = [
  {
    id: 1,
    name: "Nurse Tracey",
    descripiton: "Oil on linen 60 X 40 in.",
    price: "$300.00",
    image: okamura1,
  },
  {
    id: 2,
    name: "Brooklyn Myth...",
    descripiton: "Oil, paint marker on canvas 64 x 64 in.",
    price: "$450.00",
    image: okamura2,
  },
];

const Products = () => {
  const classes = useStyles();
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="center" spacing={4}>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
