import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio
}
from 'mdb-react-ui-kit';
import './Register.css';
import background from "../../images/background.jpg"
import Branding from '../Branding/Branding';
import Footer from '../Common/Footer';

function Register() {
    const [customer,setCustomer] = useState("user");
    const register=()=>{
        console.log("Registered")
        console.log(customer);
    }
    const signin=()=>{
        window.location.href = "./"
    }
    const onChangeCustomer=(e)=>{
        setCustomer(e.target.value);
    }
  return (
    <div  style={{ 
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        overflow:'auto'
      }}>

        <MDBContainer className="my-5 gradient-form">

            <MDBRow className="g-0">
        
                <MDBCol col='6' className="mb-5">
                    <div className="d-flex flex-column ms-5 justify-content-center bg-white h-100" style={{padding:`2rem`}}>

                        <div className="text-center">
                            <img src="https://images-eu.ssl-images-amazon.com/images/I/51hImFSpM9L.png"
                                style={{width: '8vw', borderRadius:'100px'}} alt="logo" />
                            <div>
                            <   Branding/>
                            </div>
                        </div>

                        <h2 className="mt-1 md pb-5"><center>Register</center></h2>

                        <div className='d-flex flex-row justify-content-center' style={{padding:`0rem 0rem 1rem 1rem`}}>
                            <MDBRadio name='customer' id='user' value='user' label='User' inline defaultChecked color='success' onChange={onChangeCustomer}/>
                            <MDBRadio name='customer' id='provider' value='provider' label='Provider' inline onChange={onChangeCustomer}/>
                        </div>
                        {customer.includes("user")?<MDBInput wrapperClass='mb-4' placeholder='User name' id='name' type='name'/>:<MDBInput wrapperClass='mb-4' placeholder='Organization name' id='name' type='name'/>}
                        <MDBInput wrapperClass='mb-4' placeholder='Email address' id='email' type='email'/>
                        <MDBInput wrapperClass='mb-4' placeholder='Password' id='password' type= 'password'/>
                        <MDBInput wrapperClass='mb-4' placeholder='Confirm password' id='confirm' type= 'password'/>


                        <div className="text-center pt-1 mb-5 pb-1">
                            <button className="text-white mb-4 w-100 gradient-custom-2" onClick={register}>Sign Up</button>
                        </div>

                        <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                            <p className="mb-0">Already a user?</p>
                            <button className="text-white mx-2 gradient-custom-2" onClick={signin}>
                                Sign In
                            </button>
                        </div>

                    </div>
                </MDBCol>
                <MDBCol col='6' className="mb-5">
                    <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                            <h4 className="mb-4">We are more than just a company</h4>
                            <p className="large mb-1">A network of electric vehicle charging stations powered by renewable energy, promoting sustainable transportation and reducing carbon emissions.
                            </p>
                        </div>

                    </div>           
                </MDBCol>
        
            </MDBRow> 
        </MDBContainer>
        <Footer/>
    </div>
  );
}

export default Register;