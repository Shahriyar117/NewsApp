import React from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { navItems } from "./NavItemsData";

const NavDrawer = ({ handleDrawerToggle, mobileOpen }) => {
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center", paddingX: "10px" }}
    >
      <Typography variant="h6" sx={{ my: 2, color: "rgb(255, 192, 1)" }}>
        NewsApp
      </Typography>
      <Divider sx={{ marginY: "10px" }} />
      <List>
        {navItems.map((item) => (
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              style={{
                paddingTop: 0,
                paddingBottom: 0,
              }}
            >
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "14px",
                }}
                primary={item.name}
              />
            </ListItemButton>
          </ListItem>
        ))}
        <Divider sx={{ marginY: "10px" }} />

        <>
          <ListItem key="Login" disablePadding>
            <ListItemButton
              component={Link}
              to="/auth/login"
              style={{
                paddingTop: 0,
                paddingBottom: 0,
              }}
            >
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "14px",
                }}
                primary={"Login"}
              />
            </ListItemButton>
          </ListItem>
          <ListItem key="Signup" disablePadding>
            <ListItemButton
              component={Link}
              to="/auth/signup"
              style={{
                paddingTop: 0,
                paddingBottom: 0,
              }}
            >
              <ListItemText
                primaryTypographyProps={{
                  fontSize: "14px",
                }}
                primary={"Sign Up"}
              />
            </ListItemButton>
          </ListItem>
        </>
      </List>
    </Box>
  );
  return (
    <Box component="nav">
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "block", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default NavDrawer;
