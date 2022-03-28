import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const UserCard = (props) => {
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
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h6">
              firstName lastName
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              postCode
            </Typography>
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

export default UserCard;
