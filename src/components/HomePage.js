import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import DonateNow from "./DonateNow";
import * as api from "../api.js";
import { bake_cookie } from "sfcookies";
import LinearColor from "./LinearColor";
import ErrorCard from "./ErrorCard";
import { UserContext } from "../theme/UserContext"

const HomePage = () => {
  const ourTheme = useContext(ThemeContext);
  const {user, setUser} = useContext(UserContext);
  const cookie_key = "x-access-token";
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleLogin = (data) => {
    setError(null);
    setIsLoading(true);
    return api
      .loginUser({
        email: data.get("email"),
        password: data.get("password"),
      })
      .then((result) => {
        setUser(result);
        result.accessToken &&
          localStorage.setItem("user", JSON.stringify(result));
        bake_cookie(cookie_key, result.accessToken);
        setIsLoading(false);
        navigate("/map");
      })
      .catch((error) => {
        setIsLoading(false);
        setError("Invalid passport or email");
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    handleLogin(data);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: `${ourTheme.ourTheme.palette.primary.main}`,
            }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              onSubmit={handleSubmit}
              sx={{
                mt: 3,
                mb: 2,
                fontSize: ourTheme.ourTheme.palette.button.primary.main,
              }}
            >
              <Typography
                sx={{
                  fontSize: ourTheme.ourTheme.palette.button.primary.main,
                }}
              >
                Sign In
              </Typography>
            </Button>
            <DonateNow />
            {isLoading ? (
              <LinearColor />
            ) : error ? (
              <ErrorCard message={"Login Failed"} />
            ) : (
              " "
            )}
            <Grid container>
              <Grid item>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Typography
                    sx={{
                      color: ourTheme.ourTheme.palette.typography.primary.main,
                    }}
                  >
                    {"Don't have an account? Sign Up"}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Grid>
      <Card
        sx={{
          flexGrow: 1,
          height: "100%",
          width: "50%",
          display: { xs: "none", md: "flex", sm: "block" },
        }}
      >
        <CardMedia
          component="img"
          sx={{
            display: { xs: "none", md: "flex", sm: "block" },
          }}
          image={process.env.PUBLIC_URL + "two-women.jpg"}
          alt="two women"
        />
      </Card>
    </Grid>
  );
};

export default HomePage;
