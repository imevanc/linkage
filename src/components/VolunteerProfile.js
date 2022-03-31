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
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

const VolunteerProfile = () => {
  const [user, setUser] = React.useState({});
  const [visits, setVisits] = React.useState([]);

  const currentUser = getCurrentUser();
  const defaultGravatar =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000";

  const handleEditProfileButton = () => {};

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

  return (
    <React.Fragment>
      {Object.keys(user).length === 0 ? (
        <LinearColor />
      ) : (
        <Container>
          <Box
            component={Paper}
            elevation={15}
            bgcolor="grey"
            sx={{
              pb: 6,
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Container maxWidth="sm">
              <CardMedia align="center">
                <IconButton>
                  <Avatar
                    src={user.avatar_url || defaultGravatar}
                    style={{
                      margin: "10px",
                      width: "100px",
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
                {user.postcode}
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
              <Stack
                sx={{ pt: 2 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button
                  component={Link}
                  to={"/edit-profile"}
                  variant="contained"
                  onClick={handleEditProfileButton}
                >
                  Edit Profile
                </Button>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {visits.length === 0 ? (
                <LinearColor />
              ) : (
                visits.map((card) => (
                  <Grid item key={card._id} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.visiteeFirstName} {card.visiteeLastName}
                        </Typography>
                        <Typography>Last Visit: {card.visitTime}</Typography>
                      </CardContent>
                      <CardMedia
                        component="img"
                        image="https://source.unsplash.com/random"
                        alt="a random image"
                      />
                      <CardActions>
                        <Button size="small">View Profile</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Container>
        </Container>
      )}
    </React.Fragment>
  );
};

export default VolunteerProfile;
