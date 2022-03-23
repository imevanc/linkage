import { Link } from "react-router-dom";
import { Card, CardMedia } from "@mui/material";

const AgeUk = () => {
  return (
    <Card
      component={Link}
      to={"/"}
      sx={{
        flexGrow: 1,
        height: "50%",
        width: "100%",
        display: { xs: "flex", md: "flex", sm: "block" },
      }}
    >
      <CardMedia
        component="img"
        sx={{
          display: { xs: "flex", md: "flex", sm: "block" },
        }}
        image={process.env.PUBLIC_URL + "logo.png"}
        alt="ageuk logo"
      />
    </Card>
  );
};

export default AgeUk;
