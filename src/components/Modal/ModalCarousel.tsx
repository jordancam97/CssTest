import React from "react";
import { Button, Grid, Modal, Fade, IconButton } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Close } from "@mui/icons-material";

const ModalCarousel = ({ open, handleClose, images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    adaptiveHeight: true,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      closeAfterTransition
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Fade in={open} timeout={500}>
        <div
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item xs={10} sm={8} md={4}>
            <div style={{ backgroundColor: "black", padding: "50px", position: "relative"}}>
              <IconButton
                onClick={handleClose}
                style={{ position: "absolute", top: "10px", right: "10px", color: "white", zIndex: 1000 }}
                aria-label="close"
              >
                <Close />
              </IconButton>
              <Slider {...settings} sx={{ overflow: "hidden" }}>
                {images.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Image ${index}`}
                      style={{ width:"100%",maxHeight: "400px", objectFit:"contain" }}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalCarousel;
