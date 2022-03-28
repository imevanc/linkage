import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import { Link } from "react-router-dom";

const VisiteeProfileCard = () => {
  const location = useLocation();
  const visitee = location.state.user;
  const ourTheme = useContext(ThemeContext);
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="h2">
            {visitee.firstName} {visitee.lastName}
          </Typography>
          <Typography sx={{ align: "right" }}>
            Member since:{" "}
            {visitee.createdAt.split("T")[0].split("-").reverse().join("-")}
          </Typography>
        </CardContent>
        {console.log(visitee)}
        <CardActions sx={{ display: "flex", justifycontent: "space-between" }}>
          <Button
            component={Link}
            state={{ article: props.article }}
            to={`/profile}`}
            variant="contained"
            type="submit"
            sx={{
              fontSize: ourTheme.ourTheme.palette.button.smallFontSize,
              backgroundColor: ourTheme.ourTheme.palette.button.secondary.main,
            }}
            size="small"
          >
            View
          </Button>
          <Button
            variant="contained"
            type="submit"
            sx={{
              fontSize: ourTheme.ourTheme.palette.button.smallFontSize,
              backgroundColor: ourTheme.ourTheme.palette.button.secondary.main,
            }}
            size="small"
          >
            Comments
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default VisiteeProfileCard;
