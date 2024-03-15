import { Button, Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import "./ProductPage.css";

const ProductPage = () => {
  return (
    <Grid container mt={0} className="container" spacing={2}>
      <Grid
        item
        xs={6}
        sx={{ textAlign: "left", padding: "60px 110px !important" }}
      >
        <Typography className="container_title">Summer</Typography>
        <Typography className="container_subTitle">Collections</Typography>
        <Typography className="container_text">
          Feel the difference of next-level comfort as you go head-to-head
          against some of the toughest runners around.
        </Typography>
        <Button size="large" className="container_button" variant="contained">
          Buy Now
        </Button>
        <Grid container className="container_info">
          <Grid
            xs={6}
            sx={{
              borderColor: "#a8a8a8 !important",
              borderRight: "solid",
              borderRightWidth: "0.2px",
              height: "46px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography className="container_infoOne">90k+</Typography>
            <Typography className="container_infoText">Colletions</Typography>
          </Grid>
          <Grid
            xs={6}
            sx={{
              borderColor: "#a8a8a8 !important",
              height: "46px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography className="container_infoTwo">100k+</Typography>
            <Typography className="container_infoText">Users</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <div>xs=4</div>
      </Grid>
    </Grid>
  );
};

export default ProductPage;
