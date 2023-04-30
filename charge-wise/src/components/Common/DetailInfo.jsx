import React from 'react';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardLink,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit';
import { useRef } from 'react';

export default function DetailInfo(props) {
  const ref = useRef(null);
  return props.show?(
   <MDBCard ref={ref} style={{width:'25rem', height:'auto',margin:'0rem 0rem 0rem 0rem'}}>
      <div
        onClick={() => {
          props.close();
        }}
      >
        <div
          onClick={e => {
            e.stopPropagation();
          }}
        >
        <button onClick={props.close} style={{float:'right',paddingRight:'5px'}}><h3>x</h3></button>
        {props.children}
      </div>
    </div>
      <MDBCardImage position='top' alt='...' src={'https://media.istockphoto.com/id/1251125012/photo/close-up-of-a-charging-electric-car.jpg?s=612x612&w=0&k=20&c=FYXsskzOZlSuPneNAIghjRbDKpH00946l2jlNo4anSk='} />
      <MDBCardBody>
        <MDBCardTitle>{props.chargingstation.name}</MDBCardTitle>
        <MDBCardText>
          {props.chargingstation.address}
        </MDBCardText>
        <MDBListGroup>
        <MDBListGroupItem>{props.chargingstation.rating}</MDBListGroupItem>
        <MDBListGroupItem>{props.chargingstation.status}</MDBListGroupItem>
      </MDBListGroup>
        <MDBCardLink href='#'>Plugs</MDBCardLink>
        <MDBCardLink href='#'>More Info</MDBCardLink>
      </MDBCardBody>
    </MDBCard>
  ):null;
}