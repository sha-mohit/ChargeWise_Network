import React from 'react'
import "mdbreact/dist/css/mdb.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  MDBBtn,
  MDBContainer,
  MDBFooter,
  MDBIcon
}
from 'mdb-react-ui-kit';

const Footer = () => {

    return (
        <MDBFooter className='text-center text-white' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                <MDBContainer className='pt-4'>
                    <section className='mb-4'>
                        <MDBBtn
                            color='link'
                            size="lg"
                            className='text-white m-1'
                            href='#!'
                        >
                            <MDBIcon fab className='fa-facebook'/>
                        </MDBBtn>

                        <MDBBtn
                            color='link'
                            size="lg"
                            className='text-white m-1'
                            href='#!'
                        >
                            <MDBIcon fab className='fa-twitter' />
                        </MDBBtn>

                        <MDBBtn
                            color='link'
                            size="lg"
                            className='text-white m-1'
                            href='#!'
                        >
                            <MDBIcon fab className='fa-google' />
                        </MDBBtn>

                        <MDBBtn
                            color='link'
                            size="lg"
                            className='text-white m-1'
                            href='#!'
                        >
                            <MDBIcon fab className='fa-instagram' />
                        </MDBBtn>

                        <MDBBtn
                            color='link'
                            size="lg"
                            className='text-white m-1'
                            href='#!'
                        >
                            <MDBIcon fab className='fa-linkedin' />
                        </MDBBtn>

                        <MDBBtn
                            color='link'
                            size="lg"
                            className='text-white m-1'
                            href='#!'
                        >
                            <MDBIcon fab className='fa-github' />
                        </MDBBtn>
                    </section>
                </MDBContainer>

                <div className='text-center text-white p-3'>
                    © 2023 Copyright: ChargeWise Network
                </div>
            </MDBFooter>
    )
}

export default Footer;