import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";

const VisiteeCard = (props) => {
  const ourTheme = useContext(ThemeContext);
  return (
    <Box
      sx={{
        my: 2,
        mx: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          display: "flex",
          border: `5px solid ${props.border}`,
          "&:hover": {
            border: `5px solid ${ourTheme.ourTheme.palette.primary.main}`,
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h6">
              {props.user.firstName}
            </Typography>
            <Typography component="div" variant="h6">
              {props.user.lastName}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {props.user.postcode}
            </Typography>
            <Button
              component={Link}
              state={{ user: props.user }}
              to={`/visitee`}
              variant="contained"
              type="submit"
              sx={{
                fontSize: ourTheme.ourTheme.palette.button.smallFontSize,
                backgroundColor:
                  ourTheme.ourTheme.palette.button.secondary.main,
                "&:hover": { opacity: [0.9, 0.9, 0.8] },
              }}
              size="small"
            >
              <Typography sx={{ align: "right" }}>View</Typography>
            </Button>
          </CardContent>

          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            Traffic Light Icon
          </Box>
        </Box>

        <CardMedia
          component="img"
          sx={{ width: "150px", height: "100px", paddingTop: "15px" }}
          variant="rounded"
          alt="Random Image"
          src="https://source.unsplash.com/random"
        />
      </Card>
    </Box>
  );
};

export default VisiteeCard;
