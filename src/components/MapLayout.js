import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import LinearColor from "./LinearColor";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import * as api from "../auth.js";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import VisiteeCard from "./VisiteeCard";
import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeContext";
import useMediaQuery from "@mui/material/useMediaQuery";

const configLeaflet = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });
};

const MapLayout = () => {
  const matches = useMediaQuery("(min-width:600px)");

  const ourTheme = useContext(ThemeContext);
  configLeaflet();
  const [users, setUsers] = React.useState([]);
  const [clicked, setClicked] = React.useState(Boolean(false));
  const [border, setBorder] = React.useState(
    ourTheme.ourTheme.palette.secondary.main
  );
  const filterUsers = (users) => {
    return users.filter(
      (user) => user.latitude && user.longitude && user.userRole === "visitee"
    );
  };
  React.useEffect(() => {
    const fetchUsers = async () => {
      await api.getUsers().then((fetchedUsers) => {
        setUsers(filterUsers(fetchedUsers));
      });
    };
    fetchUsers().catch((error) => console.log(error));
  }, []);
  const styles = matches
    ? { paddingTop: "50px", paddingLeft: "40px" }
    : { paddingTop: "50px", paddingLeft: "0px" };
  return (
    <Grid container sx={styles}>
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        elevation={6}
        component={Paper}
        square
        sx={{
          height: "80vh",
          width: "40%",
          overflow: "scroll",
          margin: "0 auto",
        }}
      >
        {!users.length ? (
          <LinearColor />
        ) : (
          users.map((user, idx) => {
            return <VisiteeCard key={idx} border={border} user={user} />;
          })
        )}
      </Grid>

      {users.length === 0 ? (
        <LinearColor />
      ) : (
        <Grid item xs={false} sm={4} md={7} maxWidth="xl">
          <Box direction="row" justifyContent="end" display="flex">
            <MapContainer
              tap={Boolean(false)}
              center={[
                JSON.parse(users[0].latitude),
                JSON.parse(users[0].longitude),
              ]}
              style={{ height: "80vh", width: "90%" }}
              zoom={10}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {users.map((user, idx) => {
                return (
                  <Marker
                    key={idx}
                    position={[user.latitude, user.longitude]}
                    eventHandlers={{
                      click: () => {
                        setBorder(ourTheme.ourTheme.palette.primary.main);
                        setClicked(!clicked);
                      },
                    }}
                  >
                    <Popup>
                      Post Code: {user.postcode}
                      <br />
                      Latitude: {user.latitude} <br /> Longitude:{" "}
                      {user.longitude}
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default MapLayout;
