import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { REST_URL } from '../../apiUrl';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBValidation,
  MDBValidationItem
}
from 'mdb-react-ui-kit';
import './Login.css';
import Branding from '../Branding/Branding';
import Footer from '../Common/Footer';
import logo from '../../images/logo.PNG'
import { motion } from "framer-motion";
import { Image } from '@chakra-ui/react';
import background from '../../images/landing2.jpg'
import ev from '../../images/ev.gif'

function Login() {
    const [role,setRole] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const onChangeEmail=(e)=>{
        setEmail(e.target.value)
    }
    const onChangePassword=(e)=>{
        setPassword(e.target.value)
    }

    const register=()=>{
        window.location.href = "/register"
    }
    const signin=()=>{
        if(email!=="" && password!=="")
        {
            var body ={
                UserEmail: email,
                Password: password
            }
            let headers = new Headers();
            headers.append('Accept','application/json');
            headers.append('Content-Type','application/json');
            headers.append('POST','GET');
            fetch(`${REST_URL}/api/Login/IsUser`,{
                headers: headers,
                method: 'POST',
                body: JSON.stringify(body)
                })
                .then(response=>{return response.json()})
                .then(res=>{
                    if(res !== "No User Found")
                    {
                        setRole(res)
                        localStorage.setItem("role",res[0].UserRole)
                        window.location.href = "/home"
                    }
                    else
                    {
                        alert("Please check your credentials")
                    }}
            )
        }
    }

  return (
    <div  style={{ 
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        overflow:'auto',
		minHeight:'100%',
      }}>
        <MDBContainer className="my-5 gradient-form">

            <MDBRow className="g-0">
        
                <MDBCol col='6' className="mb-5">
                    <div className="d-flex flex-column ms-5 justify-content-center bg-white h-100" style={{padding:'1rem'}}>

                        <div className="text-center">
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                whileTap={{scale:2}}
                                transition={{ duration: 3 }}
                            >
                                <img src={logo}
                                    style={{width: '8vw', borderRadius:'100px'}} alt="logo" />
                            </motion.div>
                            <div>
                            <   Branding/>
                            </div>
                        </div>

                        <br/>
                         
                        <motion.h2 whileHover={{scale:1.1}} className="mt-1 md pb-5"><center>Login</center></motion.h2>
                        <MDBValidation>
                            <MDBValidationItem invalid feedback="Email address cannot be empty">
                                <MDBInput wrapperClass='mb-4' placeholder='Email address' id='email' type='email' onChange={onChangeEmail} required/>
                            </MDBValidationItem>
                            <MDBValidationItem invalid feedback="Password cannot be empty">
                                <MDBInput wrapperClass='mb-4' placeholder='Password' id='password' type= 'password' onChange={onChangePassword} required/>
                            </MDBValidationItem>

                            <div className="text-center pt-1 mb-5 pb-1">
                                <button className="text-white mb-4 w-100 gradient-custom-2" onClick={signin}>Sign in</button>
                                <a className="text-muted" href="#!">Forgot password?</a>
                            </div>
                        </MDBValidation>

                        <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
                            <p className="mb-0">Don't have an account?</p>
                            <button className="text-white mx-2 gradient-custom-2" onClick={register}>
                                Register
                            </button>
                        </div>

                    </div>
                </MDBCol>
                <MDBCol col='6' className="mb-5">
                    <div className="d-flex flex-column  justify-content-center gradient-custom-2 h-100 mb-4">

                        <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                        <motion.h3
                            animate={{ x: [0, 100, 0], opacity: 1, scale: 1 }}
                            transition={{
                                duration: 5,
                                 delay: 0.3,
                                 ease: [0.5, 0.71, 1, 1.5],
                            }}
                            initial={{ opacity: 0, scale: 0.5 }}
                            whileHover={{ scale: 1.2 }}
                            style = {{color:'white'}}
                        >
                            We are more than just a company
                        </motion.h3>
                            <p className="large mb-1">A network of electric vehicle charging stations powered by renewable energy, promoting sustainable transportation and reducing carbon emissions.
                            </p>
                            <div style={{paddingTop:'3rem'}}>
                                <center>
                                    <MDBCard style={{width:'23rem', height:'20rem'}}>
                                        <Image
                                            src={ev}
                                            type="video/gif"
                                            delay={3}
                                            allowFullScreen
                                            width='23rem'
                                            height='20rem'
                                        />
                                    </MDBCard>
                                </center>
                            </div>
                        </div>

                    </div>           
                </MDBCol>
        
            </MDBRow> 
        </MDBContainer>
        <Footer/>
    </div>
  );
}

export default Login;