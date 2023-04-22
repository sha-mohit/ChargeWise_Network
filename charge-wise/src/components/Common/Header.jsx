import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBCollapse,
  MDBCardImage
} from 'mdb-react-ui-kit';
import Branding from '../Branding/Branding';
import image from '../../images/background.jpg'

export default function Header() {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <MDBNavbar expand='lg' className='gradient-custom-2'>
      <MDBContainer fluid>
        <MDBNavbarBrand>
          <div className="d-flex flex-row">
            {/* <img src="https://images-eu.ssl-images-amazon.com/images/I/51hImFSpM9L.png"
                style={{width: '2rem', borderRadius:'100px', padding: '2px'}} alt="logo" />
            <br/> */}
            <div>
              <Branding/>
            </div>
          </div>
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/home' role='button'>
              <h5 className="text-white">Home</h5>
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/about-us' role='button'>
              <h5 className="text-white">About</h5>
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/contact' role='button'>
              <h5 className="text-white">Contact</h5>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/support' role='button'>
              <h5 className="text-white">Support</h5>
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}