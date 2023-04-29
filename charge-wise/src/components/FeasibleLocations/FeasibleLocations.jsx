import React from "react";
import Map from "../Map/Map"
import { ChakraProvider, theme } from '@chakra-ui/react'

import { useJsApiLoader } from "@react-google-maps/api";
const FeasibleLocations = () => {
      const { isLoaded } = useJsApiLoader({
            googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
            libraries: ['places'],
          })
          if (!isLoaded) return <div>Loading...</div>;
          
return (
	<div className="userview">
      <ChakraProvider theme={theme}> 
      <Map />
         {/*  need to write feasible locations map */}
      </ChakraProvider>
	</div>
);
};

export default FeasibleLocations;
