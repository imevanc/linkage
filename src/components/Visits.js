import { makeStyles } from "@mui/styles";
import React from "react";
import HandshakeIcon from "@mui/icons-material/Handshake";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as api from "../api.js"; // eslint-disable-line
import { useContext, useState } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import * as auth from "../auth.js";
// import LinearColor from "./LinearColor";
import ErrorCard from "./ErrorCard";

const useStyles = makeStyles((theme) => ({
  text: {
    margin: theme.spacing(0, 0, 0.5),
  },
  avatar: {
    verticalAlign: "middle",
    marginRight: theme.spacing(0.5),
    textColor: theme.palette.background.card,
  },
}));

const Visits = ({ user }) => {
  const classes = useStyles();
  const ourTheme = useContext(ThemeContext);
  // const [visits, setVisits] = useState(visits); // eslint-disable-line
  const [loading, isLoading] = useState(false); // eslint-disable-line
  const [error, setError] = useState(null);
  const [body, setBody] = useState("");
  const currentUser = auth.getCurrentUser();
  const userObject = {
    volunteerId: currentUser.id,
    volunteerFirstName: currentUser.firstName,
    volunteerLastName: currentUser.lastName,
    visiteeId: user._id,
    visiteeFirstName: user.firstName,
    visiteeLastName: user.lastName,
    visitTime: new Date(),
  };

  const postNewVisit = async () => {
    console.log(userObject);
    isLoading(true);
    setError(null);
    setBody("");
    await api
      .postVisit(userObject)
      .then(() => {
        isLoading(false);
        setError(null);
        setBody("Visit Submitted");
      })
      .catch(
        ({
          response: {
            data: { message },
            status,
          },
        }) => {
          setError({ status, message });
          isLoading(false);
          setBody("");
        }
      );
  }; // eslint-disable-line

  return (
    <Box>
      <Typography
        className={classes.text}
        color="textSecondary"
        variant="subtitle1"
        align="center"
      >
        <Button
          sx={{
            color: `${ourTheme.ourTheme.palette.button.secondary.main}`,
            "&:hover": {
              opacity: [0.7, 0.7, 0.7],
            },
          }}
          fontSize="small"
          onClick={postNewVisit}
        >
          <HandshakeIcon />
          Click to Visit
        </Button>
      </Typography>
      {/* {isLoading && <LinearColor />} */}
      {error && <ErrorCard message={error} />}
      {body.length !== 0 && (
        <Typography
          className={classes.text}
          color="textSecondary"
          variant="subtitle1"
          align="center"
          paragraph={true}
          sx={{ paddingBottom: "50px" }}
        >
          {body}
        </Typography>
      )}
      {/* <Typography
        className={classes.text}
        color="textSecondary"
        variant="subtitle1"
        align="center"
      >
        Total Visits: 0
      </Typography> */}
    </Box>
  );
};

export default Visits;
