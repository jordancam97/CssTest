import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Container from "@mui/material/Container";

import { Grid } from "@mui/material";
import "./Header.css";

function Header() {
  return (
    <AppBar
      position="static"
      className="header"
      sx={{
        display: "flex !important",
        justifyContent: "center",
        padding: { xs: 0, md: "0 30px", lg: "0 127px" },
      }}
    >
      <Container
        sx={{ padding: "0px !important", maxWidth: "100% !important" }}
      >
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            height: "100%",
          }}
        >
          <Grid>
            <Typography
              className="header_text"
              sx={{
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
              }}
            >
              AllRun
            </Typography>
          </Grid>

          <Grid>
            <Typography
              className="header_text"
              sx={{
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                textDecoration: "none",
              }}
            >
              AllRun
            </Typography>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
