import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Import marker images explicitly
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const HealthMap = ({ latitude, longitude }) => {
  if (!latitude || !longitude) return null;

  const location = { lat: latitude, lng: longitude };

  return (
    <MapContainer
      center={[location.lat, location.lng]}
      zoom={5}
      style={{ height: "300px", width: "100%", borderRadius: "12px" }}
      scrollWheelZoom={false}
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
