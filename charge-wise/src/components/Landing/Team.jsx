import React from "react";
import { MDBRow,MDBCol } from "mdb-react-ui-kit";
import mohit from '../../images/mohit.png'
import soujanya from '../../images/soujanya.png'
import srija from '../../images/srija.png'

export const Team = (props) => {
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="section-title justify-content-center">
          <h2>Meet the Team</h2>
        </div>
        {/* <div id="row">
          {props.data
            ? props.data.map((d, i) => (
                <div key={`${d.name}-${i}`} className="col-md-3 col-sm-6 team">
                  <div>
                    {" "}
                    <img src={d.img} alt="..." className="team-img" />
                    <div className="caption">
                      <h4>{d.name}</h4>
                      <p>{d.job}</p>
                    </div>
                  </div>
                </div>
              ))
            : "loading"}
        </div> */}
        <MDBRow className="section-title justify-content-center">
          <MDBCol lg='3' md='6' className='mb-4'>
            <img src={mohit} className='img-fluid rounded' alt='' />
            <div className="caption" style={{padding:'1rem'}}>
                      <h4>Mohit SHARMA</h4>
                      <p>Technical Lead</p>
                    </div>
          </MDBCol>

          <MDBCol lg='3' md='6' className='mb-4'>
            <img src={srija} className='img-fluid rounded' alt='' />
            <div className="caption" style={{padding:'1rem'}}>
                      <h4>Srija GURRAM</h4>
                      <p>Senior Software Developer</p>
                    </div>
          </MDBCol>

          <MDBCol lg='3' md='6' className='mb-4'>
            <img src={soujanya} className='img-fluid rounded' alt='' />
            <div className="caption" style={{padding:'1rem'}}>
                      <h4>Soujanya VALLURI</h4>
                      <p>Principal Software Developer</p>
                    </div>
          </MDBCol>
        </MDBRow>
      </div>
    </div>
  );
};
