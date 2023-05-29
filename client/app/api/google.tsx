import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px",
  borderRadius: "10px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

interface Props {
  address: string;
}

export default function MyComponent(props: Props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyDlhi1_ddpjuT-w3Yoaqpex7JqXxHBLetI",
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [customerLocation, setCustomerLocation] =
    useState<google.maps.LatLngLiteral | null>(null);

  useEffect(() => {
    if (props.address) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: props.address }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const { lat, lng } = results[0].geometry.location;
          setCustomerLocation({ lat: lat(), lng: lng() });
          map?.setCenter({ lat: lat(), lng: lng() });
        }
      });
    }
  }, [props.address, map]);
  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {<Marker position={center} label={"Our shop"} />}
        {customerLocation && (
          <Marker position={customerLocation} label={props.address} />
        )}
      </GoogleMap>
    </div>
  ) : null;
}
