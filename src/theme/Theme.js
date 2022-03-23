import { createTheme } from "@mui/material/styles";

const Theme = (ourMode) => {
  return createTheme({
    palette: {
      mode: ourMode,
      primary: {
        main: "#4caf50",
      },
      secondary: {
        main: "#14a37f",
      },
      text: {
        main: "white",
      },
      typography: {
        fontSize: "1.4rem",
      },
      action: {
        active: "#001E3C",
      },
      button: {
        fontSize: "1.4rem",
        smallFontSize: "1rem",
        primary: {
          main: "white",
        },
        secondary: {
          main: "2e40a6",
        },
      },
      expansionPanel: {
        primary: {
          main: "#F7F7F7",
        },
      },
      progressBar: {
        primary: {
          main: "#2e40a6",
        },
        secondary: {
          main: "#5f70c9",
        },
      },
    },
  });
};
export default Theme;
