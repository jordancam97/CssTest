import React from "react";

import { Modal, Fade, Grid, Slide } from "@mui/material";

import "./ModalOpen.css";
import "../../MediaQuery.css";
import PaymentDetails from "../Payment/PaymentDetails.tsx";

const ModalOpen = ({ open, handleClose, selectedSize, quantity }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      closeAfterTransition
    >
      <Fade in={open} timeout={500}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Grid
            style={{
              width: 680,
              height: 500,
              position: "relative",
            }}
            sx={{ padding: { xs: "26px", md: "0px" } }}
          >
            <Grid container sx={{ width: "100%", height: "100%" }}>
              <Fade in={open} timeout={1200}>
                <Grid
                  item
                  xs={12}
                  sm={5}
                  md={6}
                  className="columnLeft"
                  sx={{ display: { xs: "none", sm: "flex" } }}
                >
                  <Grid className="columnLeft_content">
                    <Grid sx={{ display: { xs: "none", sm: "flex" } }}>
                      <img
                        className="columnLeft_contentImg"
                        src="/assets/images/air-max-shadow.png"
                        alt="Air Max Shadow"
                      />
                    </Grid>
                    <Grid
                      className="columnLeft_contentText"
                      sx={{
                        marginTop: { xs: "0px", sm: "40px" },
                        padding: { xs: "22px", sm: "0px" },
                      }}
                    >
                      <span>Air Max Plus 3 IronMan</span>
                      <br />
                      <Grid sx={{ fontSize: 12, lineHeight: "14px" }}>
                        <span>
                          <strong>Size:</strong> {selectedSize}
                        </span>
                        <br />
                        <span>
                          <strong>Quantity:</strong> {quantity}
                        </span>
                        <br />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Fade>
              <Slide direction="right" in={true} timeout={500}>
                <Grid item xs={12} sm={7} md={6} className="columnRight">
                  <PaymentDetails
                    quantity={quantity}
                    handleClose={handleClose}
                    selectedSize={selectedSize}
                  />
                </Grid>
              </Slide>
            </Grid>
          </Grid>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalOpen;
