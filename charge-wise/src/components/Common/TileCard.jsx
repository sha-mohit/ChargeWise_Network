import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardSubTitle,
  MDBCardText,
  MDBCardLink
} from 'mdb-react-ui-kit';

export default function TileCard(props) {
  return (
      <MDBCardBody border='none'>
        <MDBCardTitle>{props.chargingstations.name}</MDBCardTitle>
        <MDBCardSubTitle>{props.chargingstations.address}</MDBCardSubTitle>
        <MDBCardText>
          {props.chargingstations.rating}
          <br/>
          {props.chargingstations.status}
        </MDBCardText>
        <MDBCardLink href='#'>Directions</MDBCardLink>
        <MDBCardLink href='#'>Website</MDBCardLink>
      </MDBCardBody>
  );
}