import { getCenter } from "geolib";
import React, { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import CurrencyFormat from "react-currency-format";
import MapCard from "./MapCard";

function Map({ searchResults, totalDays }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  const coordinates = searchResults.map((item) => ({
    longitude: item.long,
    latitude: item.lat,
  }));

  const center = getCenter(coordinates);
  const [viewport, setViewport] = useState({
    width: "100vh",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 9,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/saeed-et/cks12gw582z8m18ml59u4rg5p"
      mapboxApiAccessToken={process.env.mapbox_key}
      {...viewport}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {searchResults.map((item) => (
        <div key={item.lat}>
          <Marker
            longitude={item.long}
            latitude={item.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <CurrencyFormat
              decimalScale={2}
              value={item.price * totalDays}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
              renderText={(value) => (
                <p
                  onClick={() => setSelectedLocation(item)}
                  className="cursor-pointer text-md font-bold py-[1px] px-2 rounded-full bg-white"
                  aria-label="push-pin"
                  role="img"
                >
                  {value} AUD
                </p>
              )}
            />
          </Marker>

          {/* The popup div */}
          {selectedLocation.long === item.long ? (
            <Popup
              closeOnClick={true}
              onClose={() => setSelectedLocation({})}
              latitude={item.lat}
              longitude={item.long}
              sortByDepth={true}
            >
              <MapCard
                img={item.img}
                star={item.star}
                location={item.location}
                total={item.price * totalDays}
              />
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  );
}

export default Map;
