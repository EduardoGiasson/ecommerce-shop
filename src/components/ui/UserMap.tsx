import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import type { LatLngTuple } from "leaflet";
import eletropostoImg from "../../assets/images/Eletroposto.png";
import { EletroPostoService } from "@/cases/eletroposto/services/eletropostos.service";

const eletropostoIcon = new L.Icon({
  iconUrl: eletropostoImg,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

type Props = {
  onCityChange?: (city: string) => void;
};

type MarkerData = {
  id: string;
  name: string;
  endereco: string;
  position: LatLngTuple;
};

export function UserMap({ onCityChange }: Props) {
  const [position, setPosition] = useState<LatLngTuple | null>(null);
  const [city, setCity] = useState("");
  const [postos, setPostos] = useState<MarkerData[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;

      setPosition([lat, lon]);

      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`,
      );

      const data = await response.json();

      const cidade =
        data.address.city ||
        data.address.town ||
        data.address.village ||
        data.address.municipality ||
        "";

      const estado = data.address.state || "";

      const cityState = `${cidade} - ${estado}`;

      setCity(cityState);

      if (onCityChange) {
        onCityChange(cityState);
      }

      loadEletropostos();
    });
  }, []);

  async function geocodeAddress(address: string): Promise<LatLngTuple | null> {
    try {
      // remove número da rua (ex: ", 1")
      const addressWithoutNumber = address.replace(/,\s*\d+/, "");

      const query = `${addressWithoutNumber}, Brasil`;

      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query,
        )}&format=json&limit=1`,
      );

      const data = await response.json();

      if (!data.length) {
        console.warn("Endereço não encontrado:", query);
        return null;
      }

      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    } catch (err) {
      console.error("Erro ao buscar coordenadas:", err);
      return null;
    }
  }

  async function loadEletropostos() {
    const list = await EletroPostoService.list();

    const markers: MarkerData[] = [];

    for (const posto of list) {
      if (!posto.endereco) continue;

      const coords = await geocodeAddress(posto.endereco);

      if (!coords) continue;

      markers.push({
        id: posto.id,
        name: posto.name,
        endereco: posto.endereco,
        position: coords,
      });
    }

    setPostos(markers);
  }

  if (!position) return <div>Carregando mapa...</div>;

  return (
    <MapContainer
      center={position}
      zoom={14}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {postos.map((posto) => (
        <Marker key={posto.id} position={posto.position} icon={eletropostoIcon}>
          <Popup>
            ⚡ <b>{posto.name}</b>
            <br />
            {posto.endereco}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
