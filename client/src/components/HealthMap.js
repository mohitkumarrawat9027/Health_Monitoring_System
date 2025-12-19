import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue in React
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const HealthMap = ({ latitude, longitude }) => {
  if (!latitude || !longitude) return null;

  const location = { lat: latitude, lng: longitude };

  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={5}
      style={{ height: "300px", width: "100%", borderRadius: "12px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Marker position={[location.lat, location.lng]}>
        <Popup>
          📍 Device Location <br />
          Lat: {location.lat} <br />
          Lng: {location.lng}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default HealthMap;
