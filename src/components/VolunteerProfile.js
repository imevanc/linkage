import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { getCurrentUser } from "../auth.js";
import Paper from "@mui/material/Paper";
import * as api from "../api";
import LinearColor from "./LinearColor";

const VolunteerProfile = () => {
  const [user, setUser] = React.useState({});
  const [visits, setVisits] = React.useState([]);

  const currentUser = getCurrentUser();
  const defaultGravatar =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000";

  React.useEffect(() => {
    const fetchVisits = async () => {
      await api.getVisitsByUser(currentUser.id).then((fetchedVisits) => {
        setVisits(fetchedVisits);
      });
    };
    const fetchUsersByID = async () => {
      await api.getUsersByID(currentUser.id).then((fetchedUser) => {
        setUser(fetchedUser);
      });
    };
    fetchVisits().catch((error) => console.log(error));
    fetchUsersByID().catch((error) => console.log(error));
  }, [currentUser.id]);
  const transformedStartPC = currentUser.postcode
    .split("")
    .slice(0, -3)
    .join("")
    .toUpperCase();

  const transformedEndPC = currentUser.postcode
    .split("")
    .slice(-3)
    .join("")
    .toUpperCase();

  const newPostCode = `${transformedStartPC} ${transformedEndPC}`;
  return (
    <>
      {Object.keys(user).length === 0 ? (
        <LinearColor />
      ) : (
        <Container sx={{ width: "100%" }}>
          <Box
            component={Paper}
            elevation={15}
            bgcolor="grey"
            sx={{
              borderRadius: "15px",
              marginTop: "50px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Container maxWidth="sm">
              <CardMedia align="center">
                <IconButton>
                  <Avatar
                    src={user.avatar_url || defaultGravatar}
                    style={{
                      margin: "10px",
                      width: "100%",
                      height: "100px",
                    }}
                  />
                </IconButton>
              </CardMedia>

              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                {user.firstName} {user.lastName}
              </Typography>
              <Typography
                component="h6"
                variant="h6"
                align="center"
                color="text.primary"
                gutterBottom
              >
                {user.email}
              </Typography>
              <Typography
                component="h6"
                variant="h6"
                align="center"
                color="text.primary"
                gutterBottom
              >
                {newPostCode}
              </Typography>
              <Typography
                component="h6"
                variant="h6"
                align="left"
                color="text.primary"
                gutterBottom
              >
                <strong>Interests: </strong>
                {user.interests}
              </Typography>
              <Typography
                component="h6"
                variant="h6"
                align="left"
                color="text.primary"
                gutterBottom
              >
                <strong>Age: </strong>
                {user.age}
              </Typography>
              <Typography
                component="h6"
                variant="h6"
                align="left"
                color="text.primary"
                gutterBottom
              >
                <strong>About Me: </strong>
                {user.bio}
              </Typography>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Typography gutterBottom variant="h5" component="h2">
              My Visits
            </Typography>
            <Grid container spacing={4}>
              {visits.map((card) => (
                <Grid item key={card._id} xs={12} sm={6} md={4}>
                  <Card
                    elevation={10}
                    component={Paper}
                    square
                    bgcolor={"grey"}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      borderRadius: "15px",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.visiteeFirstName} {card.visiteeLastName}
                      </Typography>
                      <Typography>Last Visit: {card.visitTime}</Typography>
                    </CardContent>
                    <CardMedia
                      sx={{
                        height: "200px",
                        width: "200px",
                        borderRadius: "50%",
                      }}
                      component="img"
                      image="https://source.unsplash.com/random"
                      alt="a random image"
                    />
                    <CardActions>
                      <Button size="small">View Profile</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Container>
      )}
    </>
  );
};

export default VolunteerProfile;
