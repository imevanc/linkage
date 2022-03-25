import React, { useEffect, useState } from "react";
import axios from "axios";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import LinearColor from "./LinearColor";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

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
  const [coordinates, setCoordinates] = useState({ lon: "", lat: "" });
  const pcode = "L3+3AF";
  const url = `http://api.getthedata.com/postcode/${pcode}`;

  useEffect(() => {
    const fetchCoordinates = async () => {
      await axios.get(url).then((response) => {
        setCoordinates({
          lon: Number(response.data.data.longitude),
          lat: Number(response.data.data.latitude),
        });
      });
    };
    fetchCoordinates().catch((error) => console.log(error));
  }, [url]);

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{
          flexGrow: 1,
          display: { xs: "flex", md: "flex", sm: "block" },
        }}
      >
        {!(
          coordinates.lon.toString().length && coordinates.lat.toString().length
        ) ? (
          <LinearColor />
        ) : (
          <MapContainer
            tap={Boolean(false)}
            center={[coordinates.lat, coordinates.lon]}
            zoom={20}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[coordinates.lat, coordinates.lon]}>
              <Popup>
                Post Code: {pcode}
                <br />
                Latitude: {coordinates.lat} <br /> Longitude: {coordinates.lon}
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </Box>
    </Container>
  );
};

export default MapLayout;
