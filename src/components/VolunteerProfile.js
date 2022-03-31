import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { makeStyles } from "@mui/styles";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { getCurrentUser } from "../auth.js";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import UserDatePicker from "./UserDatePicker.js";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import * as api from "../api";

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: 15,
    maxWidth: "100vw",
    backgroundColor: theme.palette.background.card,
  },
  cardContent: {
    padding: theme.spacing(2, 0, 0, 0),
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: theme.spacing(2, 2, 0),
  },
}));

const VolunteerProfile = () => {
  const [visit1, setVisit1] = React.useState("");
  const [visit2, setVisit2] = React.useState("");
  const [visit3, setVisit3] = React.useState("");
  const currentUser = getCurrentUser();
  const defaultGravatar =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000";

  React.useEffect(() => {
    api.getVisitsByUser(currentUser.id).then((visits) => {
      const lastVisit = visits[visits.length - 1];
      setVisit1(lastVisit);
    });
  }, [currentUser.id]);

  React.useEffect(() => {
    api.getVisitsByUser(currentUser.id).then((visits) => {
      const lastVisit = visits[visits.length - 2];
      setVisit2(lastVisit);
    });
  }, [currentUser.id]);

  React.useEffect(() => {
    api.getVisitsByUser(currentUser.id).then((visits) => {
      const lastVisit = visits[visits.length - 3];
      setVisit3(lastVisit);
    });
  }, [currentUser.id]);

  const visitees = [visit1, visit2, visit3];

  const [user, setUser] = React.useState({});

  React.useEffect(() => {
    api.getUsersByID(currentUser.id).then((response) => {
      setUser(response);
    });
  }, [currentUser.id]);

  return (
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
          ></Typography>
          <Typography
            component="h6"
            variant="h6"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {currentUser.email}
          </Typography>
          <Typography
            component="h6"
            variant="h6"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {currentUser.postcode}
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
        <Grid container spacing={4}>
          {visitees.map((card) => (
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
                  {/* <Button size="small">Do Something</Button> */}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

export default VolunteerProfile;
