import { makeStyles } from "@mui/styles";
import React from "react";
import HandshakeIcon from "@mui/icons-material/Handshake";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as api from "../api.js";
import { useContext, useState } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import * as auth from "../auth.js";
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
  const [, isLoading] = useState(false);
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
  };

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
    </Box>
  );
};

export default Visits;
