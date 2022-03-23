import * as React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";

const DonateNow = () => {
  const ourTheme = useContext(ThemeContext);

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      component={Link}
      to={`/donate`}
      color="success"
      sx={{
        mb: 2,
        fontSize: ourTheme.ourTheme.palette.button.smallFontSize,
        backgroundColor: ourTheme.ourTheme.palette.secondary.main,
      }}
      size="small"
    >
      Donate
    </Button>
  );
};

export default DonateNow;
