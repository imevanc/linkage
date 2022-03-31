import { Link } from "react-router-dom";
import { CardMedia, CardActionArea } from "@mui/material";

const AgeOk = () => {
  return (
  <CardActionArea>
    <Link to="/">
      <CardMedia
        component="img"
        sx={{
          marginTop: 1.5,
          width: 100,          
          display: { xs: "flex", md: "flex", sm: "block" },
        }}
        image={process.env.PUBLIC_URL + "linkage-logo.png"}
        alt="linkage logo"
      />
    </Link>
  </CardActionArea>
 
  );
};

export default AgeOk;
