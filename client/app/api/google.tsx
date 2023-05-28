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
  const [markerPosition, setMarkerPosition] =
    useState<google.maps.LatLngLiteral | null>({
      lat: -3.745,
      lng: -38.523,
    });
  const [inputAddress, setInputAddress] = useState("");

  useEffect(() => {
    if (props.address) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: props.address }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const { lat, lng } = results[0].geometry.location;
          setMarkerPosition({ lat: lat(), lng: lng() });
        }
      });
    }
  }, [props.address]);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    const { latLng } = event;
    if (latLng) {
      const lat = latLng.lat();
      const lng = latLng.lng();
      setMarkerPosition({ lat, lng });
    }
  };
  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputAddress(event.target.value);
  };
  console.log(inputAddress);
  const handleAddressSearch = () => {
    if (inputAddress) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: inputAddress }, (results, status) => {
        if (status === "OK" && results && results.length > 0) {
          const { lat, lng } = results[0].geometry.location;
          setMarkerPosition({ lat: lat(), lng: lng() });
        }
      });
    }
  };

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <div>
      <div>
        <input
          type="text"
          value={inputAddress}
          onChange={handleAddressChange}
          placeholder="Enter address"
        />
        <button onClick={handleAddressSearch}>Search</button>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            draggable
            onDragEnd={onMarkerDragEnd}
          />
        )}
      </GoogleMap>
    </div>
  ) : null;
}
