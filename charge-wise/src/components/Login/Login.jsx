import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { REST_URL } from '../../apiUrl';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn
}
from 'mdb-react-ui-kit';
import './Login.css';
import Branding from '../Branding/Branding';
import Footer from '../Common/Footer';
import logo from '../../images/logo.PNG'

function Login() {
    const [role,setRole] = useState("User")
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
        if(email === "")
        {
            alert('Please Enter Email')
        }
        else if(password === "")
        {
            alert('Please Enter Password')
        }
        else
        {
            var body ={
                UserEmail: email,
                Password: password
            }
            let headers = new Headers();
            headers.append('Accept','application/json');
            headers.append('Content-Type','application/json');
            headers.append('POST','GET');
            fetch(`${REST_URL}/api/login/isuser`,{
                headers: headers,
                method: 'POST',
                body: JSON.stringify(body)
                })
                .then(response=>{return response.json()})
                .then(res=>{
                    if(res !== "No User Found")
                    {
                        setRole(res.UserRole)
                        localStorage.setItem("role",role)
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
    <div>
        <MDBContainer className="my-5 gradient-form">

            <MDBRow className="g-0">
        
                <MDBCol col='6' className="mb-5">
                    <div className="d-flex flex-column ms-5 justify-content-center bg-white h-100" style={{padding:'2rem'}}>

                        <div className="text-center">
                            <img src={logo}
                                style={{width: '8vw', borderRadius:'100px'}} alt="logo" />
                            <div>
                            <   Branding/>
                            </div>
                        </div>

                        <br/>
                        <h2 className="mt-1 md pb-5"><center>Login</center></h2>
                        <MDBInput wrapperClass='mb-4' placeholder='Email address' id='email' type='email' onChange={onChangeEmail} required/>
                        <MDBInput wrapperClass='mb-4' placeholder='Password' id='password' type= 'password' onChange={onChangePassword} required/>


                        <div className="text-center pt-1 mb-5 pb-1">
                            <button className="text-white mb-4 w-100 gradient-custom-2" onClick={signin}>Sign in</button>
                            <a className="text-muted" href="#!">Forgot password?</a>
                        </div>

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

export default Login;