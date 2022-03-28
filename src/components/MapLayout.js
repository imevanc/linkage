import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import LinearColor from "./LinearColor";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import coordinates from "../coord.json";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import UserCard from "./UserCard";

const configLeaflet = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });
};
const MapLayout = () => {
  configLeaflet();
  return (
    <Grid container sx={{ paddingTop: "50px" }}>
      <Grid item xs={12} sm={8} md={5} elevation={6}>
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
        <UserCard />
      </Grid>
      <Grid item sm={6}>
        <Box direction="row" justifyContent="end" display="flex">
          {!(
            coordinates.coordinates.length && coordinates.coordinates.length
          ) ? (
            <LinearColor />
          ) : (
            <MapContainer
              tap={Boolean(false)}
              center={[
                coordinates.coordinates[0].latitude,
                coordinates.coordinates[0].longitude,
              ]}
              zoom={10}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {coordinates.coordinates.map((coordinate, idx) => {
                return (
                  <Marker
                    key={idx}
                    position={[coordinate.latitude, coordinate.longitude]}
                  >
                    <Popup>
                      Post Code: {"postcode"}
                      <br />
                      Latitude: {coordinate.latitude} <br /> Longitude:{" "}
                      {coordinate.longitude}
                    </Popup>
                  </Marker>
                );
              })}
            </MapContainer>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default MapLayout;
