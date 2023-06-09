import {Box,Flex,HStack,IconButton,} from '@chakra-ui/react'
import React,{ useState, useMemo, useCallback, useRef, useEffect } from "react";
import { FaLocationArrow } from 'react-icons/fa'
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import { MDBCard } from 'mdb-react-ui-kit'
import { MDBBox } from 'mdbreact'
import Places from "./Places";
import MapTheme from "./MapTheme";
import List from '../Tiles/List';
import DetailInfo from '../Common/DetailInfo';
import { REST_URL } from '../../apiUrl';
import ChargeStationForm from '../Register/ChargeStationsRegister'

function Map() {

    const [directions, setDirections] = useState(null);
    const [selectedStation, setSelectedStation] = useState([]);
    const mapRef = useRef();
    const [currentLocation, setCurrentLocation] = useState(/** @type google.maps.LatLng */({ lat: 17.4442, lng: 78.3932 }))
    const [searchLocation, setSearchLocation] = useState(null);
    const [isShown, setIsShown] = useState(true)
    const [locations,setLocations] = useState([])
	  const [currentStations, setCurrentStations] = useState([])
    const [stationsInDB,setStationsInDB] = useState([])
    const [showDetail,setShowDetail] = useState(false)
    const [registerStation, setRegisterStation] = useState(null)

   
  React.useEffect(()=>{
   navigator.geolocation.getCurrentPosition((position)=>{
    setCurrentLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
    console.log("Hiiii")
    fetchEVStationsInDB();
   })
  },[])
  function fetchEVStationsInDB(){
    let headers = new Headers();
        headers.append('Accept','application/json');
        headers.append('Content-Type','application/json');
        headers.append('POST','GET');
        const requestOptions = {
                method: 'GET',
                headers: headers,
        };
        fetch(`${REST_URL}/api/ChargeStations`,requestOptions)
        .then(response=>{return response.json()})
        .then(res=>{stationsInDB.length==0?setStationsInDB(res):console.log("Hi"+res)})
        console.log("DB---->"+stationsInDB)
  };

  const fetchEVStations = (position) => {
    if(mapRef.current===null || mapRef.current===undefined ||position===null){
      return;
    }
    const _stations = [];
    //fetchEVStationsInDB();
    const request = {
      location: position,
      radius: '5000',
      query: ['Electric Vehicle Charging Station']
    };
    // eslint-disable-next-line no-undef
    const service = new google.maps.places.PlacesService(mapRef.current);
    service.textSearch(request, (results, status) => {
      // eslint-disable-next-line no-undef
     if (status === google.maps.places.PlacesServiceStatus.OK && results) {
      var temp =[]
      results.map((result)=>(temp.push({"id":result.place_id,"name":result.name,"status":result.business_status,"rating":result.rating,"address":result.formatted_address,"photos":result.icon,"RenewableEnergy":"","PlugInTypes":"","TotalPorts":0})))
      stationsInDB.map((result)=>(temp.push({"id":result.ChargeStationID,"name":result.ChargeStationName,"status":result.Open247,"rating":result.Reviews.length,"address":result.Address,"photos":result.Icon,"RenewableEnergy":result.Renewable_Energy,"PlugInTypes":result.Plugin_Types,"TotalPorts":result.Total_Number_of_Ports})))
      console.log(stationsInDB)
      setLocations(temp)
      for (let i = 0; i < results.length; i++) {
        _stations.push({
          lat: results[i].geometry.location.lat(),
          lng: results[i].geometry.location.lng(),
          chargingStation: results[i]});
        
        //createMarker(results[i]);
      }
      for(let i=0;i<stationsInDB.length;i++){
        _stations.push({
          lat: Number(stationsInDB[i].Latitude),
          lng: Number(stationsInDB[i].Longitude),
          chargingStation: stationsInDB[i]})
      }
      setCurrentStations(_stations);
      console.log("_stations"+_stations.lat);
      //mapRef.current.setCenter(results[0].geometry.location);
       }
    }); 
    //console.log("_stations"+_stations);
    return _stations;
  };
  function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;
  
    let map = mapRef.current;
    // eslint-disable-next-line no-undef
    const marker = new google.maps.Marker({
      map,
      position: place.geometry.location,
      icon:"https://cdn1.vectorstock.com/i/1000x1000/62/80/map-pointer-location-icon-blue-pin-on-white-vector-21666280.jpg"
    });
    
    /* google.maps.event.addListener(marker, "click", () => {
      infowindow.setContent(place.name || "");
      infowindow.open(map);
    }); */
  }
  const fetchDirections = (station) => {
    
    if (!searchLocation) return;
    setShowDetail(true);
    clearRoute();
    // eslint-disable-next-line no-undef
    const service = new google.maps.DirectionsService();
    let stationInfo = station.chargingStation;
    service.route(
      {
        origin: {lat:station.lat,lng:station.lng},
        destination: searchLocation,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          setIsShown(!isShown)
          var temp = {"id":stationInfo.place_id!=null?stationInfo.place_id:stationInfo.ChargeStationID,
          "name":stationInfo.name!=null?stationInfo.name:stationInfo.ChargeStationName,
          "status":stationInfo.business_status!=null?stationInfo.business_status:stationInfo.Open247,
          "rating":stationInfo.rating!=null?stationInfo.rating:stationInfo.Reviews.length,
          "address":stationInfo.formatted_address!=null?stationInfo.formatted_address:stationInfo.Address,
          "photos":result.icon!=null?result.icon:result.Icon,
          "RenewableEnergy":result.Renewable_Energy!=null?result.Renewable_Energy:"",
          "PlugInTypes":result.Plugin_Types!=null?result.Plugin_Types:"",
          "TotalPorts":result.Total_Number_of_Ports!=null?result.Total_Number_of_Ports:0}
          setSelectedStation(temp);
          setDirections(result);
          console.log(selectedStation)
        }
      }
    );
  }; 
  function clearRoute() {
    setDirections(null)
  };

  async function getAllPathCoordinate (){
    const routes = [];
    //for (let i = 0; i < currentStations.length; i++) {  
      for (let i = 0; i < 10; i++) {  
     // eslint-disable-next-line no-undef
     const service = new google.maps.DirectionsService();
      
        service.route(
        {
          origin: searchLocation,
          destination: currentStations[i].chargingStation.geometry.location,
          // eslint-disable-next-line no-undef
          travelMode: google.maps.TravelMode.DRIVING,
         },
         (result, status) => {
          console.log(status)
           if (status === "OK" && result) {
            
            routes.push(result);
            }
          }
        );
        await timeout(1000); //for 1 sec delay
        
    }
    console.log(routes)
    filterByRouteDistance (routes);
  }
  function filterByRouteDistance (routes){

    const filteredRoutes = [];
    for (let i = 0; i < routes.length; i++) { 
      if(routes[i].routes[0].legs[0].distance.value>6000){//6km
        filteredRoutes.push(routes[i])
      }
    }
    identifySuitableLocationOnPath(filteredRoutes)
  }
  function identifySuitableLocationOnPath (filteredRoutes){

    const suitableLocations = [];
    for (let i = 0; i < filteredRoutes.length; i++) { 
      let distribution =( Math.floor(
        (filteredRoutes[i].routes[0].legs[0].distance.value) / 3000 )
      );
      let pathDistribution =( Math.floor(
        (filteredRoutes[i].routes[0].overview_path.length) / distribution )
      );
      //console.log("pathDistribution-->"+pathDistribution+"--lenth-->"+filteredRoutes[i].routes[0].overview_path.length)
      for (let j = 1; j < distribution; j++) { 
        var fesibleLocation = filteredRoutes[i].routes[0].overview_path[pathDistribution*(j)];
        //console.log("fesibleLocation----->"+fesibleLocation.lat())
        suitableLocations.push({lat:fesibleLocation.lat(),lng:fesibleLocation.lng(),chargingStation:""})
      }
    }
    setCurrentStations([...currentStations,...suitableLocations]);
  }
  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
  }
  async function handleFeasibleLocations()
  {
    if(!currentStations) return;
    
    getAllPathCoordinate();
  
  }

  const onLoad = useCallback((map) => {(mapRef.current = map)}, []);
  const stations = useMemo(() =>fetchEVStations(searchLocation), [searchLocation]);

  return (
    <Flex
      position='relative'
      flexDirection='column'
      h='90vh'
      w='98vw'
    >
      <MDBBox>
        <Box position='absolute' left={0} top={0} h='100%' w='100%'>
          {/* Google Map Box */}
          <GoogleMap
            defaultZoom={10}
            defaultCenter={currentLocation}
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
                  key={searchLocation.lat}
                  position={searchLocation}
                  options={
                    {
                     icon: {//current
                        url: "https://cdn3.iconfinder.com/data/icons/maps-33/32/Human_location_person_user_icon-512.png",
                        scaledSize: new window.google.maps.Size(50, 50),
                      },
                    }
                  }
                />
  
                <MarkerClusterer>
                  {(clusterer) =>
                    currentStations.map((station) => (
                      <Marker
                        //key={station.chargingStation.place_id!=null?station.chargingStation.place_id:station.chargingStation.ChargeStationID}
                        position={{lat:station.lat,lng:station.lng}}
                        clusterer={clusterer}
                        onClick={() => {
                          {station.chargingStation===""?setRegisterStation(station):fetchDirections(station)}
                        }}
                        options={
                          {
                           icon: {
                              url: station.chargingStation===""?"https://cdn1.iconfinder.com/data/icons/social-messaging-ui-color/254000/66-512.png":( (station.chargingStation.place_id!=null ?"https://pngimg.com/d/google_maps_pin_PNG76.png":"https://icon-library.com/images/a2e6cf209c.svg.svg")),
                              scaledSize: new window.google.maps.Size(40, 40),
                            },
                          }
                        }
                      />
                    ))
                  }
                </MarkerClusterer>
  
                <Circle  key={searchLocation.lat} center={searchLocation} radius={15000} options={closeOptions} />
                <Circle center={searchLocation} radius={30000} options={middleOptions} />
                <Circle center={searchLocation} radius={45000} options={farOptions} />
              </>
            )}
            <Marker position={currentLocation} />
          </GoogleMap>
        </Box>
      </MDBBox>
      
      <span style={{padding:'5rem 5rem 0rem 0rem', width:'30rem'}} >
        <MDBCard>
        {localStorage.getItem("role")!== null && localStorage.getItem("role").includes("Provider")?
            <div style={{padding:'1rem'}}>
                <button className="text-dark" style={{padding:'1rem', backgroundColor:'#5dd8e9'}} onClick={handleFeasibleLocations}>Get Feasible Locations for Charging Station</button>
            </div>
            :null}
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
                setIsShown(!isShown)
                setDirections(null)
                setSearchLocation(position);
                mapRef.current?.panTo(position);
              }}
            />
            {/* {!searchLocation && <p>Enter the address of EV station.</p>} */}
            </Box>
            <IconButton
              aria-label='center back'
              icon={<FaLocationArrow />}
              isRound
              onClick={() => {
                mapRef.current.panTo(currentLocation)
                fetchEVStationsInDB();
              //mapRef.current.setZoom(15)
              searchLocation === null?setSearchLocation(currentLocation):setSearchLocation(searchLocation);
              }}
            />
          </HStack>
          </Box>
        </MDBCard>
        {directions && selectedStation && <DetailInfo chargingstation={selectedStation} show={showDetail} close = {()=>{setShowDetail(false)}}/>} 
      </span>
      <span>
      {!directions && isShown&&(<List locations={locations}/>)}
      </span>
      {registerStation && <ChargeStationForm lat={registerStation.lat} lng={registerStation.lng}/>}
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

