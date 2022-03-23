import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const AgeUk = () => {
  return (
    <Link to="/">
      <Box
        sx={{ paddingTop: "15px" }}
        component="img"
        alt="AgeUK Logo."
        src={process.env.PUBLIC_URL + "logo.png"}
      />
    </Link>
  );
};

export default AgeUk;
