import {Box,Flex,HStack,IconButton,} from '@chakra-ui/react'
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
import MapTheme from "./MapTheme";
import List from '../Tiles/List';

function Map() {

    const [directions, setDirections] = useState(null);
    const mapRef = useRef();
    const [currentLocation, setCurrentLocation] = useState(/** @type google.maps.LatLng */({ lat: 17.4442, lng: 78.3932 }))
    const [searchLocation, setSearchLocation] = useState(/** @type google.maps.LatLng */({ lat: 17.443421, lng: 78.374511 }));
    const [isShown, setIsShown] = useState(true)
    const [names,setNames] = useState(['Hyderabad','Banglore','delhi','Chennai'])
    const [isLoaded, setIsLoaded] = useState(0)

   
  React.useEffect(()=>{
   navigator.geolocation.getCurrentPosition((position)=>{
    setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
   })

  },[])
  

  const fetchEVStations = (position) => {
    if(mapRef.current===null || mapRef.current===undefined){
      return;
    }
    console.log("fetchEVStations"+position.lat)
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
        //createMarker(results[i]);
      }

      //mapRef.current.setCenter(results[0].geometry.location);
    }
    }); 
    return _stations;
  };
  function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;
  
    let map = mapRef.current;
    // eslint-disable-next-line no-undef
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      icon:"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
    });
    
    /* google.maps.event.addListener(marker, "click", () => {
      infowindow.setContent(place.name || "");
      infowindow.open(map);
    }); */
  }
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
    setDirections(null)
  };

  const onLoad = useCallback((map) => {(mapRef.current = map)
                              //console.log("inside load")
                              setSearchLocation(currentLocation)
                              
                            }, []);
  const stations = useMemo(() => fetchEVStations(searchLocation), [searchLocation]);
  return (
    <Flex
      position='relative'
      flexDirection='column'
      h='80vh'
      w='98vw'
    >
      <MDBBox>
        <Box position='absolute' left={0} top={0} h='100%' w='100%'>
          {/* Google Map Box */}
          <GoogleMap
            defaultZoom={10}
            defaultCenter={currentLocation}
            defaultOptions={{ styles: MapTheme }}
            center={searchLocation}
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
            <Marker position={currentLocation} />
          </GoogleMap>
        </Box>
      </MDBBox>
      
      <div style={{padding:'5rem 5rem 5rem 0rem', width:'30rem'}} >
      <MDBCard background='tranparent'>
        <Box
        p={4}
        borderRadius='lg'
        bgColor='white'
      >
        <HStack spacing={2} justifyContent='space-between'>
          <Box>
          <h3>Search for EV station</h3>
           <Places
            setStation={(position) => {
              //setIsShown(!isShown)
              setSearchLocation(position);
              mapRef.current?.panTo(position);
            }}
          />
          {/* {!searchLocation && <p>Enter the address of EV station.</p>} */}
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
      {isShown&&(<List names={names}/>)}
      </div>
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

