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
import * as api from "../api";

const visitees = [1, 2, 3];

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

const EditVolunteerProfile = () => {
  const [bio, setBio] = React.useState("");
  const [interests, setInterests] = React.useState([]);
  const [needs, setNeeds] = React.useState([]);
  const [age, setAge] = React.useState(null);
  const [user, setUser] = React.useState({});
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const currentUser = getCurrentUser();
  const classes = useStyles();

  const defaultGravatar =
    "https://www.gravatar.com/avatar/00000000000000000000000000000000";

  React.useEffect(() => {
    const fetchUsersByID = async () => {
      await api.getUsersByID(currentUser.id).then((fetchedUser) => {
        setUser(fetchedUser);
      });
    };
    fetchUsersByID().catch((error) => console.log(error));
  }, [currentUser.id]);
  console.log(currentUser);
  console.log(user);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleAvatarClick = () => {
    console.log("clicked");
  };

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
          <Card
            variant="contained"
            className={classes.card}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <CardMedia align="center">
              <IconButton onClick={handleAvatarClick}>
                <Avatar
                  src={currentUser.avatar_url || defaultGravatar}
                  style={{
                    margin: "10px",
                    width: "60px",
                    height: "60px",
                  }}
                />
              </IconButton>
            </CardMedia>
          </Card>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            {currentUser.firstName} {currentUser.lastName}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField required id="Bio" label="Edit Bio" fullWidth />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                required
                id="Interests"
                label="Edit Interests"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <UserDatePicker />
            </Grid>
            <Grid item xs={12} md={6}></Grid>
          </Grid>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained">Submit</Button>
            <Button variant="outlined">Cancel</Button>
          </Stack>
        </Container>
      </Box>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {visitees.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Visitee Full Name
                  </Typography>
                  <Typography>Visitee Information</Typography>
                </CardContent>
                <CardMedia
                  component="img"
                  image="https://source.unsplash.com/random"
                  alt="a random image"
                />
                <CardActions>
                  <Button size="small">Do Something</Button>
                  <Button size="small">Do Something</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

export default EditVolunteerProfile;
