import { useState } from "react";
import React from "react";
import { MDBNavbarNav, MDBNavbarToggler,MDBCollapse,MDBNavbarItem,MDBNavbarLink, MDBIcon} from "mdb-react-ui-kit";
import logo from "../../images/logo.PNG"

export const Navigation = (props) => {
  const [showBasic, setShowBasic] = useState(false);
  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
            <img
                    src={logo}
                    height="40rem"
                    width="40rem"
                    alt="ChargeWise Network Logo"
                    loading="lazy"
                    style={{paddingRight:'3px'}}
                    />
          <a className="navbar-brand page-scroll" href="#page-top">
            ChargeWise Network
          </a>{" "}
        </div>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic} className="collapse navbar-collapse">
          <MDBNavbarNav className='nav navbar-nav navbar-right'>

            <MDBNavbarItem>
              <MDBNavbarLink className='page-scroll' href='#about'>
              <h5>About</h5>
              </MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBNavbarLink className='page-scroll' href='#services'>
              <h5>Services</h5>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink className='page-scroll' href='#team'>
              <h5>Team</h5>
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </div>
    </nav>
  );
};
