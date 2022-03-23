import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Box from "@mui/material/Box";

const AgeUk = () => {
  return (
    <Box
      sx={{
        border: "1px dashed grey",
        "&:hover": {
          backgroundColor: "primary.main",
          opacity: [0.9, 0.8, 0.7],
        },
      }}
    >
      <AccessibilityNewIcon />
      <SelfImprovementIcon />
      <SentimentVerySatisfiedIcon />
    </Box>
  );
};

export default AgeUk;
