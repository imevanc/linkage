import React from "react";
import { Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  text: {
    margin: theme.spacing(0, 0, 0.5),
    padding: theme.spacing(3),
  },
}));

const ErrorCard = (props) => {
  const classes = useStyles();

  return (
    <Box>
      <Typography
        data-testid="error"
        color="textSecondary"
        variant="subtitle1"
        align="center"
        className={classes.text}
      >
        {props.message}
      </Typography>
    </Box>
  );
};

export default ErrorCard;
