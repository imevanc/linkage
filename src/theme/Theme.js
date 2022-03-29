import { createTheme } from "@mui/material/styles";

const Theme = (ourMode) => {
  return createTheme({
    palette: {
      mode: ourMode,
      primary: {
        main: "#4caf50",
      },
      secondary: {
        main: "#ff9100",
      },
      text: {
        main: "white",
      },
      typography: {
        fontSize: "0.9rem",
        primary: {
          main: "#4caf50",
        },
      },
      action: {
        active: "#001E3C",
      },
      button: {
        fontSize: "1.4rem",
        smallFontSize: "1rem",
        color: {
          main: "#4caf50",
        },
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
      lockIcon: {
        main: "#ff1744",
      },
    },
  });
};
export default Theme;
