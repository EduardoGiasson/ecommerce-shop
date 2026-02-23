import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { LatLngTuple } from "leaflet";
import eletropostoImg from "../../assets/images/Eletroposto.png";

// 📍 Coordenada do eletroposto
const eletroposto: LatLngTuple = [-26.208108, -52.679078];

// ⚡ Ícone personalizado usando arquivo local
const eletropostoIcon = new L.Icon({
  iconUrl: eletropostoImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export function UserMap() {
  const [position, setPosition] = useState<LatLngTuple | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (error) => {
        console.error(error);
      },
    );
  }, []);

  if (!position) return <div>Carregando...</div>;

  return (
    <MapContainer
      center={position}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* 📍 Usuário */}
      <Marker position={position}>
        <Popup>Você está aqui 📍</Popup>
      </Marker>

      {/* ⚡ Eletroposto */}
      <Marker position={eletroposto} icon={eletropostoIcon}>
        <Popup>
          ⚡ Eletroposto <br />
          Pato Branco - PR
        </Popup>
      </Marker>
    </MapContainer>
  );
}
