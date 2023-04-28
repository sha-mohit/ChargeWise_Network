import {Box,Flex,HStack,IconButton,SkeletonText,} from '@chakra-ui/react'
import React,{ useState, useMemo, useCallback, useRef } from "react";
import { FaLocationArrow } from 'react-icons/fa'
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";
import { MDBCard } from 'mdb-react-ui-kit'
import { MDBBox } from 'mdbreact'
import Places from "./Places";
import Distance from "./Distance";
import "./Map.css";
import MapTheme from "./MapTheme";

function Map() {

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  })

  const [directions, setDirections] = useState(null);
    //const [map, setMap] = useState(/** @type google.maps.Map */ (null))
    const mapRef = useRef();
    const [currentLocation, setCurrentLocation] = useState(/** @type google.maps.LatLng */({ lat: 17.4442, lng: 78.3932 }))
    const [searchLocation, setSearchLocation] = useState(null);

   
  React.useEffect(()=>{
   navigator.geolocation.getCurrentPosition((position)=>{
    setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
   })

  },[])
  

  const fetchEVStations = (position) => {
    if(mapRef.current===null || mapRef.current===undefined){
      return;
    }
    if(searchLocation===null){
      setSearchLocation(currentLocation);
    }
    const _stations = [];
    const request = {
      location: position,
      radius: '5000',
      query: ['Electric Vehicle Charging Station']
    };
    // eslint-disable-next-line no-undef
    const service = new google.maps.places.PlacesService(mapRef.current);
    service.textSearch(request, (results, status) => {
      console.log(results);
      // eslint-disable-next-line no-undef
    if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      for (let i = 0; i < results.length; i++) {
        _stations.push({
          lat: results[i].geometry.location.lat(),
          lng: results[i].geometry.location.lng(),
        });
      }

      //mapRef.current.setCenter(results[0].geometry.location);
    }
    }); 
    return _stations;
  };
  const fetchDirections = (station) => {
    if (!searchLocation) return;
    clearRoute();
    // eslint-disable-next-line no-undef
    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: station,
        destination: searchLocation,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setDirections(result);
        }
      }
    );
  }; 
  function clearRoute() {
    //setDirections(null)
  };
/*   const options = useMemo(
    () => ({
      mapId: "b181cac70f27f5e6",
      disableDefaultUI: true,
      clickableIcons: false,
    }),
    []
  ); */
  const onLoad = useCallback((map) => (mapRef.current = map), []);
  const stations = useMemo(() => fetchEVStations(currentLocation), [currentLocation]);
  if (!isLoaded) {
    return <SkeletonText />
  }
  return (
    <Flex
      position='relative'
      flexDirection='column'
      alignItems='center'
      h='80vh'
      w='98vw'
    >
      <MDBBox>
        <Box position='absolute' left={0} top={0} h='100%' w='100%'>
          {/* Google Map Box */}
          <GoogleMap
            defaultZoom={1}
            //defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
            defaultOptions={{ styles: MapTheme }}
            center={currentLocation}
            zoom={12}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: true,
              streetViewControl: true,
              mapTypeControl: true,
              fullscreenControl: true,
              styles:MapTheme,
            }}
            onLoad={onLoad}
          >
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    zIndex: 50,
                    strokeColor: "#1976D2",
                    strokeWeight: 5,
                  },
                }}
              />
            )}
  
            {searchLocation && (
              <>
                <Marker
                  position={searchLocation}
                  icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
                />
  
                <MarkerClusterer>
                  {(clusterer) =>
                    stations.map((station) => (
                      <Marker
                        key={station.lat}
                        position={station}
                        clusterer={clusterer}
                        onClick={() => {
                          fetchDirections(station);
                        }}
                      />
                    ))
                  }
                </MarkerClusterer>
  
                <Circle center={searchLocation} radius={15000} options={closeOptions} />
                <Circle center={searchLocation} radius={30000} options={middleOptions} />
                <Circle center={searchLocation} radius={45000} options={farOptions} />
              </>
            )}
            <Marker key={1} position={currentLocation} />
            
          </GoogleMap>
        </Box>
      </MDBBox>
      
      <MDBCard background='white'>
      <Box
        p={4}
        borderRadius='lg'
        m={4}
        bgColor='white'
        shadow='base'
        zIndex='1'
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Box flexGrow={1}>
          <h1>Ev Station?</h1>
           <Places
            setOffice={(position) => {
              setSearchLocation(position);
              mapRef.current?.panTo(position);
            }}
          />
          {!searchLocation && <p>Enter the address of EV station.</p>}
          {directions && <Distance leg={directions.routes[0].legs[0]} />} 
          </Box>
          <IconButton
            aria-label='center back'
            icon={<FaLocationArrow />}
            isRound
            onClick={() => {
              mapRef.current.panTo(currentLocation)
              mapRef.current.setZoom(15)
            }}
          />
        </HStack>
        </Box>
      </MDBCard>
    </Flex>
  )
}
const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
const middleOptions = {
  ...defaultOptions,
  zIndex: 2,
  fillOpacity: 0.05,
  strokeColor: "#FBC02D",
  fillColor: "#FBC02D",
};
const farOptions = {
  ...defaultOptions,
  zIndex: 1,
  fillOpacity: 0.05,
  strokeColor: "#FF5252",
  fillColor: "#FF5252",
};
export default Map

