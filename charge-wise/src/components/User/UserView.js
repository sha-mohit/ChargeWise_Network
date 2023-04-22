import React from "react";
import Map from "../Map/Map"
import { ChakraProvider, theme } from '@chakra-ui/react'

const UserView = () => {
return (
	<div className="userview">
      <ChakraProvider theme={theme}> 
         <Map />
      </ChakraProvider>
	</div>
);
};

export default UserView;
