import React from "react";
import { Link } from "react-router-dom";
import { List, ListItem, ListItemText, ListItemButton } from "@mui/material";

const SidebarMenu = () => {
  return (
    <div className="sidebar">
      <h2>Menú</h2>
      <nav>
        <List>
          <ListItem>
            <ListItemButton component={Link} to="/biseccion">
              <ListItemText primary="Bisección" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link} to="/reglafalsa">
              <ListItemText primary="Regla Falsa" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link} to="/puntofijo">
              <ListItemText primary="Punto Fijo" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link} to="/jacobi">
              <ListItemText primary="Jacobi" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link} to="/gauss">
              <ListItemText primary="Gauss-Seidel" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link} to="/newton">
              <ListItemText primary="Newton-Raphson" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link} to="/derivada">
              <ListItemText primary="Derivada" />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>

      <style jsx>{`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 250px;
          height: 100%;
          background-color: #2c3e50;
          color: white;
          padding: 20px;
          box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
        }
        h2 {
          margin-bottom: 20px;
          font-size: 22px;
        }
      `}</style>
    </div>
  );
};

export default SidebarMenu;
