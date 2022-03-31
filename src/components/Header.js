import * as React from "react";
import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CustomSwitch from "./CustomSwitch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { ThemeContext } from "../theme/ThemeContext";
import AgeOk from "./AgeOk";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Avatar, Button } from "@mui/material";
import { getCurrentUser } from "../auth";

//import Logout from './Logout.js';
const md5 = require("md5");

const defaultGravatar =
  "https://www.gravatar.com/avatar/00000000000000000000000000000000";
const gravatarBaseUrl = "http://www.gravatar.com/avatar/";

//import logout from "../auth";
const account = ["Profile", "Logout"];

const Header = (props) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const user = getCurrentUser();
  const matches = useMediaQuery("(min-width:600px)");

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const ourTheme = useContext(ThemeContext);

  let userHashedEmail;
  if (user) {
    userHashedEmail = gravatarBaseUrl + md5(user.email);
  }

  const styles = matches
    ? { xs: false, md: "flex" }
    : { xs: "flex", md: "none" };
  const stylesBar = matches
    ? {
        zIndex: "tooltip",
        position: "fixed",
        alignItems: "center",
        left: 0,
        top: 0,
        right: 0,
        backgroundColor: ourTheme.ourTheme.palette.primary.main,
        height: "8vh",
        padding: "0 50px",
      }
    : {
        zIndex: "tooltip",
        position: "fixed",
        alignItems: "center",
        left: 0,
        top: 0,
        right: 0,
        backgroundColor: ourTheme.ourTheme.palette.primary.main,
        height: "8vh",
        padding: "0",
      };

  return (
    <Container
      sx={{
        paddingTop: "40px",
        display: "flex",
        alignItems: "center",
        // margin: "30px 0",
      }}
    >
      <AppBar position="static" sx={stylesBar}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 0.01, display: styles }}
            >
              <AgeOk />
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "soace-between",
                alignItems: "center",
              }}
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <CustomSwitch
                      sx={{ m: 1 }}
                      defaultChecked
                      onChange={() =>
                        props.setOurMode(
                          props.ourMode === "light" ? "dark" : "light"
                        )
                      }
                    />
                  }
                  // label={props.ourMode + " mode"}
                />
              </FormGroup>


            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open account">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {!user ? (
                    <Avatar src={defaultGravatar} />
                  ) : (
                    <Avatar src={userHashedEmail} />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {account.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    {setting === "Profile" ? (
                      <Button
                        component={Link}
                        to={"/volunteer"}
                        style={{ textDecoration: "none" }}
                        sx={{
                          "&:hover": {
                            border: "1px dashed grey",
                            opacity: [0.7, 0.7, 0.7],
                          },
                        }}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </Button>
                    ) : (
                      <Button
                        component={Link}
                        to={"/logout"}
                        //                         onClick={() => {
                        //                           logout();
                        //                         }}

                        sx={{
                          "&:hover": {
                            border: "1px dashed grey",
                            opacity: [0.7, 0.7, 0.7],
                          },
                        }}
                      >
                        <Typography textAlign="center">{setting}</Typography>
                      </Button>
                    )}
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {account.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      {setting === "Profile" ? (
                        <Button
                          component={Link}
                          to={"/volunteer"}
                          style={{ textDecoration: "none" }}
                          sx={{
                            "&:hover": {
                              border: "1px dashed grey",
                              opacity: [0.7, 0.7, 0.7],
                            },
                          }}
                        >
                          <Typography textAlign="center">{setting}</Typography>
                        </Button>
                      ) : (
                        <Button
                          component={Link}
                          to={"/logout"}
                          //                         onClick={() => {
                          //                           logout();
                          //                         }}

                          sx={{
                            "&:hover": {
                              border: "1px dashed grey",
                              opacity: [0.7, 0.7, 0.7],
                            },
                          }}
                        >
                          <Typography textAlign="center">{setting}</Typography>
                        </Button>
                      )}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Container>
  );
};
export default Header;
