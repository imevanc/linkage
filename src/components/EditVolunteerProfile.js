import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
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
import SelectAge from "./SelectAge.js";
import LinearColor from "./LinearColor.js";
import * as api from "../api";
import md5 from "md5";
import { Link, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [age, setAge] = React.useState(null);
  const [user, setUser] = React.useState({});
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentForm = document.getElementById("form1");
    const elementsForm = new FormData(currentForm);
    const updatedData = {
      bio: elementsForm.get("Bio"),
      interests: elementsForm.get("Interests"),
      needs: elementsForm.get("Needs"),
    };
    const updateVolunteer = async () => {
      await api
        .patchVolunteer(user._id, {
          bio: updatedData.bio,
          interests: updatedData.interests,
          needs: updatedData.needs,
          age: age,
        })
        .then((response) => console.log(response));
    };

    updateVolunteer().catch((error) => {
      console.log(error);
    });
    navigate("/volunteer");
  };

  const handleAvatarClick = () => {
    console.log("avatar-clicked");
  };
  const gravatarBaseUrl = "http://www.gravatar.com/avatar/";
  let userHashedEmail = Object.keys(user).length
    ? gravatarBaseUrl + md5(user.email)
    : " ";
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
              <Card
                variant="contained"
                className={classes.card}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <CardMedia align="center">
                  <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                    {!user ? (
                      <Avatar
                        src={defaultGravatar}
                        style={{
                          margin: "10px",
                          width: "60px",
                          height: "60px",
                        }}
                      />
                    ) : (
                      <Avatar
                        src={userHashedEmail}
                        style={{
                          margin: "10px",
                          width: "60px",
                          height: "60px",
                        }}
                      />
                    )}
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
              <Grid
                component="form"
                noValidate
                id="form1"
                container
                spacing={3}
              >
                <Grid item xs={12}>
                  <TextField
                    name="Bio"
                    multiline
                    rows={5}
                    variant="outlined"
                    required
                    id="Bio"
                    label="Bio"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <TextField
                    name="Interests"
                    variant="outlined"
                    required
                    id="Interests"
                    label="Interests"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={9}>
                  <TextField
                    name="Needs"
                    variant="outlined"
                    required
                    id="Needs"
                    label="Needs"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <SelectAge age={age} setAge={setAge} />
                </Grid>
                <Grid item xs={12} md={6}></Grid>
              </Grid>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="success"
                >
                  Submit
                </Button>

                <Button
                  component={Link}
                  to={"/volunteer"}
                  variant="outlined"
                  color="error"
                >
                  Cancel
                </Button>
              </Stack>
            </Container>
          </Box>
        </Container>
      )}
    </React.Fragment>
  );
};

export default EditVolunteerProfile;
