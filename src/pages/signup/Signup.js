import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { thunkSignUp } from "../../redux/actions";
import { connect } from "react-redux";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const SignUp = ({ registerUser }) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userRegister = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
    };
    console.log(userRegister);
    registerUser({ ...userRegister, from: "handleSubmit-SignUp" });
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid #eeeeee",
        marginTop: "50px",
        padding: "10px",
        width: { md: "40vw", xs: "90vw" },
      }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#FEC20C" }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5" fontWeight={"bold"}>
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="new-password"
                inputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  minLength: 6,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" />}
                label="Please accept our privacy policy"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#FEC20C",
              "&:hover": { backgroundColor: "#FCA510" },
            }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Box
                component={Link}
                to="/login"
                sx={{
                  color: "black",
                  textDecoration: "none",
                  "&:hover": { color: "#FEC20C" },
                  fontSize: "12px",
                }}
              >
                Already have an account? Sign in
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

const msp = ({ auth }) => ({
  user: auth.user,
});

const mdp = (dispatch) => ({
  registerUser: (name, email, password, from) =>
    dispatch(thunkSignUp(name, email, password, from)),
});

export default connect(msp, mdp)(SignUp);
