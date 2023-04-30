import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  MDBCol,
  MDBInput,
  MDBValidationItem,
  MDBValidation,
  MDBRow,
  MDBContainer,
  MDBCard,
  MDBRadio,
  MDBCheckbox,
  MDBModal
}
from 'mdb-react-ui-kit';
import './Register.css';
import Footer from '../Common/Footer';
import Branding from '../Branding/Branding';
import logo from '../../images/logo.PNG'
import {motion} from 'framer-motion'
import { REST_URL } from '../../apiUrl';
import background from '../../images/landing2.jpg'

function ChargeStationForm(props) {
  //const [selectedLocation, setSelectedLocation] = useState(null);
  const [renewableEnergy,setRenewableEnergy] = useState("Hydro");
  const [chargeStationName,setChargeStationName] = useState("");
  const [address,setAddress] = useState("");
  const [lalitude,setlalitude] = useState(props.lat);
  const [longitude,setlongitude] = useState(props.lng);
  const [cost,setCost] = useState("");
  const [icon,setIcon] = useState([]);
  const [open247,setopen247] = useState(true);
  const [reviews,setReviews] = useState("");
  const [plugInTypes,setplugInTypes] = useState([])
  const [totalNumerofPorts,setTotalNoofPorts] = useState(0);
  const [selectedPlugin, setSelectedPlugin] = useState("");

  
  const onChangeChargeStationName=(e)=>{
    setChargeStationName(e.target.value)
  }

  const onChangeReviews=(e)=>{
    setReviews(e.target.value)
  }

  const onChangePlugInTypes=(e)=>{
    setplugInTypes(e.target.value)
  }

  const onChangeAddress=(e)=>{
    setAddress(e.target.value)
  }

  const onChangeIcon=(e)=>{
    setIcon(e.target.value)
  }

  const onChangelalitude=(e)=>{
    setlalitude(e.target.value)
  }

  const onChangelongitude=(e)=>{
    setlongitude(e.target.value)
  }

  const onChangecost=(e)=>{
    setCost(e.target.value)
  }
  const onChangeopen247=(e)=>{
    setopen247(e.target.value==="True")
  }
  const onChangetotalNumerofPorts=(e)=>{
    setTotalNoofPorts(e.target.value)
  }

  const onChangeRenewableEnergy=(e)=>{
    setRenewableEnergy(e.target.value)
}

const onChangeOtherenewableEnergy=(e)=>{
    setRenewableEnergy(e.target.value)
}
const handlePluginChange=(e)=>{
    var options = [...e.target.selectedOptions];
    const values = options.map(option => option.value);
    setSelectedPlugin(values.join(", "));
}

const fetchPluginTypes=()=>{
    let headers = new Headers();
	headers.append('Accept','application/json');
	headers.append('Content-Type','application/json');
	headers.append('POST','GET');
    fetch(`${REST_URL}/api/PlugInImages`,{
    headers:headers,
        method: 'GET'
    })
    .then(response=>{return response.json()})
    .then(res=>{setplugInTypes(res)
    })
}




  const CSRegister = () => {
    if(chargeStationName !== "" && address !== "" && lalitude !== "" && longitude !=="" && cost!=="")
    {
        var body = {
            ChargeStationName:chargeStationName,
            Address:address,
            Latitude:lalitude,
            Longitude:longitude,
            Cost:cost,
            Open247:open247,
            Icon:icon,
            Total_Number_of_Ports:totalNumerofPorts,
            Plugin_Types:selectedPlugin,
            Reviews:reviews,
            Renewable_Energy:renewableEnergy
        }
        let headers = new Headers();
        headers.append('Accept','application/json');
        headers.append('Content-Type','application/json');
        headers.append('POST','GET');
        const requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body)
        };

        fetch(`${REST_URL}/api/ChargeStations/AddChargeStation`,requestOptions)
            .then(response=>response.json())
            .then(res=>
                {
                    alert('Registerd successfully!') 
                        window.location.reload();
                })
    }
  }
  useEffect(() => {
    fetchPluginTypes();
},[])

  return (
        <MDBContainer style={{ width:'500px', marginInlineEnd:'0', overflowY:'scroll'}}>
            <MDBRow>
                <MDBCol>
                    <MDBCard style={{padding:'0rem 1rem 0rem 1rem'}}>
                <center><p>Charge Station Register</p></center> 
                <MDBValidation>
                    <MDBValidationItem invalid feedback="Name cannot be empty">
                        <MDBInput wrapperClass='mb-2'  placeholder='Charge station name' id='name' type='name' autoComplete="false" onChange={onChangeChargeStationName} required/>
                    </MDBValidationItem>
                    <MDBValidationItem invalid feedback="Address cannot be empty">
                        <MDBInput wrapperClass='mb-2' placeholder='Address' id='address' type='text' autoComplete="false" onChange={onChangeAddress} required/>
                    </MDBValidationItem>
                    <MDBValidationItem invalid feedback="Latitude cannot be empty">
                        <MDBInput wrapperClass='mb-2' placeholder='Latitude' id='latitude' type='float' value={lalitude} autoComplete="false" onChange={onChangelalitude} required disabled/>
                    </MDBValidationItem>
                    <MDBValidationItem invalid feedback="Longitude cannot be empty">
                        <MDBInput wrapperClass='mb-2' placeholder='Longitude' id='longitude' type= 'float' value={longitude} autoComplete="false" onChange={onChangelongitude} required disabled/>
                    </MDBValidationItem>
                    <MDBValidationItem invalid feedback="Field cannot be empty">
                        <MDBInput placeholder='Cost' id='cost' type= 'text' autoComplete="false" onChangeCapture={onChangecost} required/>
                    </MDBValidationItem>
                    <div className="d-flex flex-row" style={{color:'gray'}}>
                    <div className="d-flex flex-row justify-content-center" style={{padding:`0rem 0rem 0.5rem 1rem`}}>
                        <br/>
                            <MDBCheckbox name='open' value='' id='flexCheckChecked' defaultChecked inline onChangeCapture={onChangeopen247} />
                     </div>
                    <label type='label' value='Open 24/7'>Open 24/7</label>
                     </div>
                    <MDBValidationItem invalid feedback="Field cannot be empty">
                        <MDBInput wrapperClass='mb-4' placeholder='Total number of ports' id='noofports' type= 'text' autoComplete="false" onChangeCapture={onChangetotalNumerofPorts} required/>
                    </MDBValidationItem>
                    <div className="d-flex flex-row" style={{color:'gray'}}>
                    <label type='label' value='Renewable Energy'>Renewable Energy</label>
                    <div className="d-flex flex-row justify-content-center" style={{padding:`0rem 0rem 0.5rem 1rem`}}>
                        <br/>
                            <MDBRadio name='renewableEnergy' id='hydro' value='Hydro' label='Hydro' inline onChangeCapture={onChangeRenewableEnergy}/>
                            <MDBRadio name='renewableEnergy' id='wind' value='Wind' label='Wind' inline onChangeCapture={onChangeRenewableEnergy}/>
                            <MDBRadio name='renewableEnergy' id='solar' value='Solar' label='Solar' inline onChangeCapture={onChangeRenewableEnergy}/>
                            <MDBRadio name='renewableEnergy' id='other' value='Other' label='Other' inline onChangeCapture={onChangeRenewableEnergy}/>
                     </div>
                     </div>
                     {renewableEnergy.includes("Hydro") || renewableEnergy.includes("Wind") || renewableEnergy.includes("Solar")? 
                     <></>:<MDBValidationItem invalid feedback="Field cannot be empty">
                     <MDBInput wrapperClass='mb-4' placeholder='Please Specify' id='otherType' type= 'text' onChange={onChangeOtherenewableEnergy} required/>
                     </MDBValidationItem>}
                     <MDBValidationItem>
                     <div className="d-flex flex-row" style={{color:'gray'}}>
                     <label type='label' value='PlugIn Type'>PlugIn Types</label>
                        <div className="d-flex flex-row justify-content-center" style={{padding:`0rem 0rem 1rem 1rem`}}>
                            <select className="select" onChange={handlePluginChange} style={{width: '250px',height:'auto',borderRadius: '10px'}} multiple = {true}>
                                {plugInTypes.map(arrayItem => <option value={arrayItem.Plugin_Image_Name}>{arrayItem.PlugIn_Image_Name}</option>)}
                            </select>
                        </div>
                     </div>
                     </MDBValidationItem>
                    <div className="text-center">
                        <button className="text-white mb-4 w-100 gradient-custom-2" onClick={CSRegister}>Register</button>
                    </div>
                </MDBValidation>
                    </MDBCard>  
                    </MDBCol>      
            </MDBRow> 
        </MDBContainer>
  );
}

export default ChargeStationForm;
