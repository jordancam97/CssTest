import React, { useEffect, useState } from "react";
import { Button, Grid, Slide, Zoom, Typography } from "@mui/material";
import ModalCarousel from "../Modal/ModalCarousel.tsx";
import "./ProductPage.css";
import "../../MediaQuery.css"
import ModalOpen from "../Modal/ModalOpen.tsx";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {
  setSelectedSize,
  setQuantity,
  selectState,
  setModalOpen
} from "../Payment/Actions/store.js";
import { useDispatch, useSelector } from "react-redux";

const ProductPage = () => {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [statePay, setStatePay] = useState(false);

  const images = [
    "/assets/images/air-max-1.png",
    "/assets/images/air-max-2.png",
    "/assets/images/air-max-3.png",
    "/assets/images/air-max-4.png",
    "/assets/images/air-max-5.png",
    "/assets/images/air-max-6.png",
    "/assets/images/air-max-7.png",
  ];

  const dispatch = useDispatch();
  const {
    selectedSize,
    quantity,
    modalOpen
  } = useSelector(selectState);

  console.log("selectedSize", quantity);

  useEffect(() => {
    const storedData = localStorage.getItem("allState");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      dispatch(setSelectedSize(parsedData.selectedSize));
      dispatch(setQuantity(parsedData.quantity));
      dispatch(setModalOpen(parsedData.modalOpen));

    }
  }, [dispatch]);

  useEffect(() => {
    const dataToStore = JSON.stringify({
      selectedSize,
      quantity,
      modalOpen
    });
    localStorage.setItem("allState", dataToStore);
  }, [
    selectedSize,
    quantity,
    modalOpen
  ]);

  

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: number
  ) => {
    dispatch(setSelectedSize(newAlignment));
  };

  const handleIncrement = () => {
    if (quantity < 12) {
      const newValue = quantity + 1;
      dispatch(setQuantity(newValue));
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newValue = quantity - 1;
      dispatch(setQuantity(newValue));
    }
  };

  const totalAmount = quantity * 275;

  const handleOpenModal = () => {
    if (selectedSize === null || quantity === 0) {
      setStatePay(true);
    } else {
      setStatePay(false);
      dispatch(setModalOpen(true));
    }
  };

  return (
    <Grid
      container
      mt={0}
      className="container"
      spacing={2}
      sx={{ height: { sm:"calc(100vh + 250px)",md: "calc(100vh - 70px)" } }}
    >
      <ModalOpen
        open={modalOpen}
        handleClose={() => dispatch(setModalOpen(false))}
        selectedSize={selectedSize}
        quantity={quantity}
      />
      <ModalCarousel
        open={carouselOpen}
        handleClose={() => setCarouselOpen(false)}
        images={images}
      />
      <Grid
        item
        xs={12}
        sm={5}
        sx={{
          textAlign: "left",
          paddingLeft: {
            sm: "30px !important",
            md: "40px !important",
            lg: "137px !important",
          },
          display: { xs: "none", sm: "flex" },
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
          <Typography
            className="container_subTitle"
            sx={{ lineHeight: { xs: "50px", lg: "75px" } }}
          >
            Plus 3 IronMan
          </Typography>
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
        <Typography
          sx={{
            fontWeight: "bold",
            color: "white",
            fontSize: "25px",
            marginTop: "15px",
          }}
        >
          US$ {quantity === 0 ? 275 : totalAmount}
        </Typography>
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

      {/* Responsive mobile */}
      <Grid
        item
        xs={12}
        sm={5}
        sx={{
          textAlign: "left",
          padding: "30px !important",
          display: { xs: "flex", sm: "none" },
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
          <Typography
            className="container_subTitle"
            sx={{ lineHeight: { xs: "50px", lg: "75px" } }}
          >
            Plus 3 IronMan
          </Typography>
        </Slide>
      </Grid>

      <Grid
        item
        xs={12}
        sm={7}
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
            fontSize: { xs: "35vw", sm: "22vw", lg: "262px" },
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
        <Grid
          container
          className="container_stars"
          sx={{ marginTop: { xs: "-7vw", lg: "-79px" } }}
        >
          <Grid
            sx={{
              textAlign: "left",
            }}
          >
            <Typography
              className="container_starsText"
              style={{
                color: statePay && selectedSize === null ? "red" : "#a8a8a8",
              }}
            >
              Sizes
            </Typography>
            <ToggleButtonGroup
              size="small"
              color="primary"
              value={selectedSize}
              exclusive
              onChange={handleChange}
              aria-label="Sizes"
              style={{
                border:
                  statePay && selectedSize === null
                    ? "1px solid red"
                    : "1px solid white",
              }}
              className={
                statePay && selectedSize === null ? "increasing-border" : ""
              }
            >
              <ToggleButton
                value={38}
                style={{
                  backgroundColor: selectedSize === 38 ? "#ffd030" : "inherit",
                  color: selectedSize === 38 ? "black" : "white",
                  borderRight: "1px solid white",
                  width: 40,
                }}
              >
                38
              </ToggleButton>
              <ToggleButton
                value={39}
                style={{
                  backgroundColor: selectedSize === 39 ? "#ffd030" : "inherit",
                  color: selectedSize === 39 ? "black" : "white",
                  borderRight: "1px solid white",
                  borderLeft: "1px solid white",
                  width: 40,
                  textDecoration: "line-through",
                }}
                disabled
              >
                39
              </ToggleButton>
              <ToggleButton
                value={40}
                style={{
                  backgroundColor: selectedSize === 40 ? "#ffd030" : "inherit",
                  color: selectedSize === 40 ? "black" : "white",
                  borderRight: "1px solid white",
                  borderLeft: "1px solid white",
                  width: 40,
                }}
              >
                40
              </ToggleButton>
              <ToggleButton
                value={41}
                style={{
                  backgroundColor: selectedSize === 41 ? "#ffd030" : "inherit",
                  color: selectedSize === 41 ? "black" : "white",
                  borderLeft: "1px solid white",
                  width: 40,
                }}
              >
                41
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid
            sx={{
              textAlign: "left",
              marginTop: 1,
            }}
          >
            <Typography
              className="container_starsText"
              style={{
                color: statePay && quantity === 0 ? "red" : "#a8a8a8",
              }}
            >
              Quantity
            </Typography>
            <ToggleButtonGroup
              size="small"
              value={quantity}
              exclusive
              style={{
                border:
                  statePay && quantity === 0
                    ? "1px solid red"
                    : "1px solid white",
              }}
              className={statePay && quantity === 0 ? "increasing-border" : ""}
            >
              <ToggleButton
                value={0}
                onClick={handleDecrement}
                style={{
                  borderRight: "1px solid white",
                  width: 30,
                  color: "white",
                }}
              >
                <RemoveIcon />
              </ToggleButton>
              <ToggleButton
                value={quantity}
                disabled
                style={{ width: 40, color: "white" }}
              >
                {quantity}
              </ToggleButton>
              <ToggleButton
                value={quantity + 1}
                onClick={handleIncrement}
                style={{
                  borderLeft: "1px solid white",
                  width: 30,
                  color: "white",
                }}
              >
                <AddIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>

        {/* Responsive mobile */}
        <Grid
          sx={{
            display: { xs: "flex", sm: "none" },
            flexDirection: "column",
            padding: "30px",
          }}
        >
          <Typography
            sx={{
              fontWeight: "bold",
              color: "white",
              fontSize: "25px",
              marginTop: "15px",
            }}
          >
            US$ {quantity === 0 ? 275 : totalAmount}
          </Typography>
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
          <Grid>
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
          </Grid>

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
              <Typography className="container_infoText">
                Collections
              </Typography>
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
      </Grid>
    </Grid>
  );
};

export default ProductPage;
