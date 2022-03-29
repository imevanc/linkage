import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import Paper from "@mui/material/Paper";
import React from "react";
import { useParams } from "react-router-dom";
import * as api from "../api.js";
import LinearColor from "./LinearColor";
import Container from "@mui/material/Container";

const VisiteeProfileCard = () => {
  const ourTheme = useContext(ThemeContext);
  const visiteeId = useParams();
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    const fetchUserById = async (id) => {
      await api
        .getUsersByID(id)
        .then((response) => {
          return response;
        })
        .then((fetchedUser) => setUser(fetchedUser));
    };
    fetchUserById(visiteeId._id);
  }, [visiteeId]);
  const handleLoadingUser = Object.keys(user).length;
  return (
    <Container maxWidth="xl" sx={{ paddingTop: "50px" }}>
      {handleLoadingUser === 0 ? (
        <LinearColor />
      ) : (
        <Grid item xs={12} sm={6} md={4} component={Paper} square>
          <Card
            sx={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h6" component="h2" align="left">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography
                align="right"
                sx={{ fontSize: ourTheme.ourTheme.palette.typography.fontSize }}
              >
                Member since:{" "}
                {user.createdAt.split("T")[0].split("-").reverse().join("-")}
              </Typography>
            </CardContent>
            <CardActions
              sx={{ display: "flex", justifycontent: "space-between" }}
            >
              <Button
                variant="contained"
                type="submit"
                sx={{
                  fontSize: ourTheme.ourTheme.palette.button.smallFontSize,
                  backgroundColor:
                    ourTheme.ourTheme.palette.button.secondary.main,
                }}
                size="small"
              >
                View
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )}
    </Container>
  );
};

export default VisiteeProfileCard;
