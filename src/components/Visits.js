import { makeStyles } from "@mui/styles";
import React from "react";
import HandshakeIcon from "@mui/icons-material/Handshake";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import * as api from "../api.js";
import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
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

const Visits = (props) => {
  const classes = useStyles();
  const ourTheme = useContext(ThemeContext);
  const [visits, setVisits] = React.useState(props.visits);
  const handleVisits = () => {
    console.log(props.visits, " + 1");
    // return api.setVisitsByID(props.id, 1);
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
        >
          <HandshakeIcon />
          Click to Visit
        </Button>
      </Typography>
      <Typography
        className={classes.text}
        color="textSecondary"
        variant="subtitle1"
        align="center"
      >
        Total Visits: 0
      </Typography>
    </Box>
  );
};

export default Visits;
