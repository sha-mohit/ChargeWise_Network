import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { REST_URL } from '../../apiUrl';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
  MDBValidationItem,
  MDBValidation
}
from 'mdb-react-ui-kit';
import './Register.css';
import Branding from '../Branding/Branding';
import Footer from '../Common/Footer';
import logo from '../../images/logo.PNG'

function Register() {
    const [role,setRole] = useState("User");
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmPassword,setConfirmPassword] = useState("");

    const onChangeRole=(e)=>{
        setRole(e.target.value)
        console.log(e.target.value)
    }
    const onChangeName=(e)=>{
        e.preventDefault()
        setName(e.target.value)
    }
    const onChangeEmail=(e)=>{
        e.preventDefault()
        setEmail(e.target.value)
    }
    const onChangePassword=(e)=>{
        e.preventDefault()
        setPassword(e.target.value)
    }
    const onChangeConfirmPassword=(e)=>{
        e.preventDefault()
        if(password === e.target.value)
        {
            setConfirmPassword(e.target.value)
        }
        else
        {
            console.error('Password and Confirm password does not match')
        }
    }

    const register=(e)=>{
        e.preventDefault()
        if(name !== "" && email !== "" && password !== "" && confirmPassword !=="")
        {
            var body = {
                UserName:name,
                UserEmail:email,
                Password:password,
                UserRole:role
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
            fetch(`${REST_URL}/api/Login/IsExistingUser`,requestOptions)
            .then(response=>response.json())
            .then(res=>
                {
                    if(res==="No User Found")
                    {
                        fetch(`${REST_URL}/api/Login`,requestOptions).then(response => response.json()).then(data => console.log(data));
                        alert('Registerd successfully!') 
                        window.location.href = "/"
                    }
                    else if(res==="User Already Exists")
                    {
                        alert('User already Exists!!')
                        window.location.reload();
                    }
                })
        }
      }
    const signin=()=>{
        window.location.href = "/"
    }

  return (
    <div>

        <MDBContainer className="form my-5 gradient-form">

            <MDBRow className="g-0">
        
                <MDBCol col='6' className="mb-5">
                    <div className="d-flex flex-column ms-5 justify-content-center bg-white h-100" style={{padding:`2rem`}}>

                        <div className="text-center">
                            <img src={logo}
                                style={{width: '8vw', borderRadius:'100px'}} alt="logo" />
                            <div>
                                <Branding/>
                            </div>
                        </div>
                        <br/>
                        <h2 className="mt-1 md pb-5"><center>Register</center></h2>

                        <div className='d-flex flex-row justify-content-center' style={{padding:`0rem 0rem 1rem 1rem`}}>
                            <MDBRadio name='role' id='User' value='User' label='User' inline defaultChecked color='success' onChange={onChangeRole}/>
                            <MDBRadio name='role' id='Provider' value='Provider' label='Provider' inline onChange={onChangeRole}/>
                        </div>
                        <MDBValidation isValidated>
                            {role.includes("User")?
                            <MDBValidationItem invalid feedback="Username cannot be empty">
                                <MDBInput wrapperClass='mb-4' placeholder='User name' id='name' type='name' onChange={onChangeName} required/>
                            </MDBValidationItem>:
                            <MDBValidationItem invalid feedback="Organization name cannot be empty">
                                <MDBInput wrapperClass='mb-4' placeholder='Organization name' id='name' type='name' onChange={onChangeName} required/>
                            </MDBValidationItem>}
                            <MDBValidationItem invalid feedback="Email cannot be empty">
                                <MDBInput wrapperClass='mb-4' placeholder='Email address' id='email' type='email' onChange={onChangeEmail} required/>
                            </MDBValidationItem>
                            <MDBValidationItem invalid feedback="Password cannot be empty">
                                <MDBInput wrapperClass='mb-4' placeholder='Password' id='password' type= 'password' onChange={onChangePassword} required/>
                            </MDBValidationItem>
                            <MDBValidationItem invalid feedback="Please Confirm password">
                                <MDBInput wrapperClass='mb-4' placeholder='Confirm password' id='confirm' type= 'password' onChangeCapture={onChangeConfirmPassword} required/>
                            </MDBValidationItem>
                        
                            <div className="text-center pt-1 mb-5 pb-1">
                                <button className="text-white mb-4 w-100 gradient-custom-2" onClick={register}>Sign Up</button>
                            </div>
                        </MDBValidation>

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