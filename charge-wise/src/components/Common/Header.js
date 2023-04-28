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
  MDBCollapse
} from 'mdb-react-ui-kit';
import Branding from '../Branding/Branding';
import logo from "../../images/logo.PNG"
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

export default function Header() {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <MDBNavbar expand='lg' className='gradient-custom-2'>
      <MDBContainer fluid>
        <MDBNavbarBrand>
          <div className="d-flex flex-row">
            <img
                    src={logo}
                    height="40rem"
                    width="40rem"
                    alt="ChargeWise Network Logo"
                    loading="lazy"
                    />
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
        <Menu className="d-flex align-items-center me-5 gradient-custom-2" style={{ width:'10px'}}>

              <MenuButton>
                  <img
                      src="https://th.bing.com/th/id/OIP.jYffRb9EeYK_FVnbyYJspwHaHo?pid=ImgDet&rs=1"
                      className="rounded-circle"
                      height="50px"
                      width="50px"
                      alt="Profile"
                      loading="lazy"
                  />
                </MenuButton>
                  <MenuList className='gradient-custom-2'>
                    <MenuItem style={{width:'max-content', padding:'2px'}}>
                        <a className="text-dark lg" href="/">Logout</a>
                    </MenuItem>
                  </MenuList>
          </Menu>
      </MDBContainer>
    </MDBNavbar>
  );
}