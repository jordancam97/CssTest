import React, { useState } from "react";
import { Button, Grid, Slide, Zoom, Typography } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import ModalCarousel from "../Modal/ModalCarousel.tsx";
import "./ProductPage.css";
import ModalOpen from "../Modal/ModalOpen.tsx";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ButtonGroup from "@mui/material/ButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";

const ProductPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [carouselOpen, setCarouselOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const images = [
    "/assets/images/air-max-1.png",
    "/assets/images/air-max-2.png",
    "/assets/images/air-max-3.png",
    "/assets/images/air-max-4.png",
    "/assets/images/air-max-5.png",
    "/assets/images/air-max-6.png",
    "/assets/images/air-max-7.png",
  ];

  const [selectedSize, setSelectedSize] = useState<number | null>(null);

  return (
    <Grid container mt={0} className="container" spacing={2}>
      <Grid
        item
        xs={5}
        sx={{
          textAlign: "left",
          paddingLeft: "137px !important",
          display: "flex",
          flexDirection: "column",
          paddingTop: "0px !important",
          justifyContent: "center",
        }}
      >
        <Slide
          direction="right"
          in={true}
          mountOnEnter
          unmountOnExit
          timeout={100}
        >
          <Typography className="container_title">Air Max</Typography>
        </Slide>
        <Slide
          direction="right"
          in={true}
          mountOnEnter
          unmountOnExit
          timeout={300}
        >
          <Typography className="container_subTitle">Plus 3 IronMan</Typography>
        </Slide>

        <Zoom in={true} timeout={800}>
          <Typography className="container_text">
            The Nike Air Max, crafted by Tinker Hatfield, made its debut in
            1987, introducing a revolutionary cushioning system that forever
            altered the trajectory of athletic footwear. Inspired by the
            inside-out architecture of the Pompidou Centre in Paris, Hatfield
            created the first-ever visible Air unit, delivering not just
            exceptional comfort but a design element that was unlike anything
            seen before
          </Typography>
        </Zoom>
        <Typography className="container_text">US$275</Typography>
        <Button
          size="large"
          className="container_button"
          variant="contained"
          onClick={handleOpenModal}
          startIcon={<CreditCardOutlinedIcon />}
        >
          Pay with <br />
          credit card
        </Button>
        {/* Modal para otros detalles del producto */}
        <ModalOpen open={modalOpen} handleClose={() => setModalOpen(false)} />
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
            <Typography className="container_infoText">Collections</Typography>
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
      <Grid
        item
        xs={7}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            display: "flex",
            position: "relative",
          }}
          className="img_letter"
        >
          NIKE
          <img
            className="img_nike"
            src="/assets/images/air-max.png"
            alt="Air Max"
            onClick={() => setCarouselOpen(true)}
          />
        </Typography>
        <ModalCarousel
          open={carouselOpen}
          handleClose={() => setCarouselOpen(false)}
          images={images}
        />

        <Grid container className="container_stars">
          <Grid
            xs={3}
            sx={{
              textAlign: "left",
            }}
          >
            <Typography className="container_starsText">Sizes</Typography>
          </Grid>
          <ButtonGroup color="inherit">
            <Button
              aria-label="38"
              style={{
                backgroundColor: selectedSize === 38 ? "#ffd030" : "inherit",
                color: "white",
              }}
              onClick={() => setSelectedSize(38)}
            >
              38
            </Button>
            <Button
              aria-label="39"
              style={{
                backgroundColor: selectedSize === 39 ? "#ffd030" : "inherit",
                color: "white",
              }}
              onClick={() => setSelectedSize(39)}
            >
              39
            </Button>
            <Button
              aria-label="40"
              style={{
                backgroundColor: selectedSize === 40 ? "#ffd030" : "inherit",
                color: "white",
              }}
              onClick={() => setSelectedSize(40)}
            >
              40
            </Button>
            <Button
              aria-label="41"
              style={{
                backgroundColor: selectedSize === 41 ? "#ffd030" : "inherit",
                color: "white",
              }}
              onClick={() => setSelectedSize(41)}
            >
              41
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProductPage;
