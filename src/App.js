import Header from "./components/Header";
import Theme from "./theme/Theme";
import { useState } from "react";
import { ThemeContext } from "./theme/ThemeContext";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import DonatePage from "./components/DonatePage";
import SignUpPage from "./components/SignupPage";
import MapLayout from "./components/MapLayout";
import UserCard from "./components/UserCard";
import VolunteerProfile from "./components/VolunteerProfile";

const App = () => {
  const [ourMode, setOurMode] = useState("light");
  const ourTheme = Theme(ourMode);
  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ ourTheme }}>
        <ThemeProvider theme={ourTheme}>
          <CssBaseline />
          <Header ourMode={ourMode} setOurMode={setOurMode} />
          <Routes>
            <Route path="/" element={<HomePage />} ourMode={ourMode} />
            <Route
              path="/users/:_id"
              element={<UserCard />}
              ourMode={ourMode}
            />
            <Route
              path="/volunteer"
              element={<VolunteerProfile />}
              ourMode={ourMode}
            />
            <Route path="/map" element={<MapLayout />} ourMode={ourMode} />
            <Route path="/donate" element={<DonatePage />} />
            <Route path="/signup" element={<SignUpPage />} ourMode={ourMode} />
          </Routes>
        </ThemeProvider>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
};

export default App;
