"use client";
import { Location } from "@/app/models/location";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(
    null
  );
  const mapRef = useRef<L.Map | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (
      !isMounted ||
      !mapContainerRef.current ||
      mapRef.current
    )
      return;

    // Dynamically import Leaflet only on the client side
    const initMap = async () => {
      const L = (await import("leaflet")).default;

      // Configure Leaflet icon options
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        iconUrl: "/leaflet/marker-icon.png",
        shadowUrl: "/leaflet/marker-shadow.png",
      });

      const map = L.map(mapContainerRef.current!).setView(
        [10.762622, 106.660172],
        13
      );
      mapRef.current = map;

      L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "© OpenStreetMap contributors",
        }
      ).addTo(map);

      L.marker([10.762622, 106.660172])
        .addTo(map)
        .bindPopup("Hello from HCMC!")
        .openPopup();

      const fetchLocation = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_HOST}/locations`
          );
          const locations = await res.json();

          locations.forEach((location: Location) => {
            L.marker([
              location.latitude,
              location.longitude,
            ])
              .addTo(map)
              .bindPopup(location.name);
          });
        } catch (error) {
          console.error(
            "Failed to fetch locations:",
            error
          );
        }
      };

      fetchLocation();
    };

    initMap();

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="w-full h-full">
      <div
        ref={mapContainerRef}
        className="w-full h-full rounded-lg shadow-md"
      />
    </div>
  );
}
