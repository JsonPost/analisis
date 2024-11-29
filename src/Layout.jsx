import React from "react";
import { Box } from "@mui/material";
import SidebarMenu from "./SidebarMenu";

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar Menu */}
      <SidebarMenu />
      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f5f5f5",
          padding: 3,
          marginLeft: "250px",  // Ajusta el espacio para el menú lateral
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
