import Header from "./components/Header";
import Theme from "./theme/Theme";
import { useState, useEffect } from "react";
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
import { getCurrentUser } from "./auth";

const App = () => {
  const [ourMode, setOurMode] = useState("light");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      const loggedInUser = getCurrentUser();
      setUser(loggedInUser);
    }
  }, [user]);

  const ourTheme = Theme(ourMode);
  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ ourTheme }}>
        <ThemeProvider theme={ourTheme}>
          <CssBaseline />
          <Header ourMode={ourMode} setOurMode={setOurMode} />
          <Routes>
            <Route path="/signup" element={<SignUpPage />} ourMode={ourMode} />
            <Route
              path="/"
              element={
                user ? (
                  <MapLayout ourMode={ourMode} />
                ) : (
                  <HomePage ourMode={ourMode} />
                )
              }
            />
            <Route
              path="/users/:_id"
              element={
                user ? (
                  <UserCard ourMode={ourMode} />
                ) : (
                  <HomePage ourMode={ourMode} />
                )
              }
            />
            <Route
              path="/volunteer"
              element={
                user ? (
                  <VolunteerProfile ourMode={ourMode} />
                ) : (
                  <HomePage ourMode={ourMode} />
                )
              }
            />
            <Route
              path="/map"
              element={
                user ? (
                  <MapLayout ourMode={ourMode} />
                ) : (
                  <HomePage ourMode={ourMode} />
                )
              }
            />
            <Route
              path="/donate"
              element={
                user ? (
                  <DonatePage ourMode={ourMode} />
                ) : (
                  <HomePage ourMode={ourMode} />
                )
              }
            />
            {/* <Route path="*" element={<PageNotFound ourMode={ourMode} /> */}
          </Routes>
        </ThemeProvider>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
};

export default App;
