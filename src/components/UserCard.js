import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import Container from "@mui/material/Container";
import { useParams } from "react-router-dom";
import * as api from "../api.js";
import LinearColor from "./LinearColor";
import Visits from "./Visits";

const useStyles = makeStyles((theme) => ({
  text: {
    margin: theme.spacing(0, 0, 0.5),
  },
  avatar: {
    verticalAlign: "middle",
    marginRight: theme.spacing(0.5),
  },
  large: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    margin: theme.spacing(2, 2, 0),
  },
  card: {
    borderRadius: 15,
    maxWidth: "100vw",
    backgroundColor: theme.palette.background.card,
  },
  cardContent: {
    padding: theme.spacing(2, 0, 0, 0),
  },
}));

const UserCard = () => {
  const classes = useStyles();
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
        <Card
          variant="outlined"
          className={classes.card}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <CardMedia align="center">
            <Avatar alt="User" src="/a-broken-link" className={classes.large} />
          </CardMedia>
          <CardContent className={classes.cardContent}>
            <Typography
              className={classes.text}
              color="textSecondary"
              variant="h6"
              align="center"
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography
              className={classes.text}
              color="textSecondary"
              variant="subtitle1"
              align="center"
            >
              <AlternateEmailIcon className={classes.avatar} fontSize="small" />
              {user.email}
            </Typography>{" "}
            <Typography
              className={classes.text}
              color="textSecondary"
              variant="subtitle1"
              align="center"
            >
              <LocationOnIcon className={classes.avatar} fontSize="small" />
              {user.postcode}
            </Typography>{" "}
            <Visits visits={user.visits} id={visiteeId} />
            <Typography
              className={classes.text}
              color="textSecondary"
              variant="subtitle1"
              align="left"
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Typography>{" "}
          </CardContent>
        </Card>
      )}{" "}
    </Container>
  );
};

export default UserCard;
