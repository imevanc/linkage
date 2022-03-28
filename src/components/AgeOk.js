import { Link } from "react-router-dom";
import { Card, CardMedia } from "@mui/material";

const AgeOk = () => {
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
        image={process.env.PUBLIC_URL + "age-ok.png"}
        alt="age-ok logo"
      />
    </Card>
  );
};

export default AgeOk;
