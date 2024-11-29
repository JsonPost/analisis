import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container, Box, CssBaseline, Drawer, List, ListItem, ListItemText } from "@mui/material";
import Layout from "./Layout";
import Jacobi from "../src/jacobi";
import Gauss from "../src/gauss";
import Newton from "../src/newton";
import Biseccion from "../src/biseccion";
import ReglaFalsaSimple from "../src/reglafalsa";
import MetodoPuntoFijo from "../src/puntofijo";
import DerivativeCalculator from "../src/derivada";

const App = () => {
  return (
    <Router>
      <CssBaseline />
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6">Métodos de Cálculo</Typography>
        </Toolbar>
      </AppBar>
      <Box display="flex">
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <List>
            <ListItem button component="a" href="/biseccion">
              <ListItemText primary="Bisección" />
            </ListItem>
            <ListItem button component="a" href="/reglafalsa">
              <ListItemText primary="Regla Falsa" />
            </ListItem>
            <ListItem button component="a" href="/puntofijo">
              <ListItemText primary="Punto Fijo" />
            </ListItem>
            <ListItem button component="a" href="/jacobi">
              <ListItemText primary="Jacobi" />
            </ListItem>
            <ListItem button component="a" href="/gauss">
              <ListItemText primary="Gauss-Seidel" />
            </ListItem>
            <ListItem button component="a" href="/newton">
              <ListItemText primary="Newton-Raphson" />
            </ListItem>
            <ListItem button component="a" href="/derivada">
              <ListItemText primary="Derivada" />
            </ListItem>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "#f5f5f5",
            padding: 4,
            marginLeft: 25,  // Ajuste para el espacio que deja el menú lateral
            minHeight: "100vh",
          }}
        >
          <Layout>
            <Routes>
              <Route path="/jacobi" element={<Jacobi />} />
              <Route path="/gauss" element={<Gauss />} />
              <Route path="/newton" element={<Newton />} />
              <Route path="/biseccion" element={<Biseccion />} />
              <Route path="/reglafalsa" element={<ReglaFalsaSimple />} />
              <Route path="/puntofijo" element={<MetodoPuntoFijo />} />
              <Route path="/derivada" element={<DerivativeCalculator />} />
            </Routes>
          </Layout>
        </Box>
      </Box>
    </Router>
  );
};

export default App;
