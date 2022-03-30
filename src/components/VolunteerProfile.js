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

const VolunteerProfile = () => {
  const classes = useStyles();
  const handleAvatarClick = () => {
    console.log("clicked");
  };
  return (
    <Container>
      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
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
                  className={classes.large}
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
            Volunteer Full Name
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            Volunteer Information
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained">Do Something</Button>
            <Button variant="outlined">Do Something</Button>
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

export default VolunteerProfile;
