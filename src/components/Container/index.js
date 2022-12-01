import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material";

const ContainerBox = styled(Box)((theme) => ({
  width: "80%",
}));

const Container = ({ children, sx = {} }) => {
  return (
    <ContainerBox sx={{ ...sx, m: "0 auto", fontSize: "20px" }}>
      {children}
    </ContainerBox>
  );
};

export default Container;
