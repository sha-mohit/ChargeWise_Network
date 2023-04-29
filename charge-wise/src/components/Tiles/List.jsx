import React, { useState } from 'react';
import {
    MDBCard,
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink
} from 'mdb-react-ui-kit';
import TileCard from '../Common/TileCard';
import DetailInfo from '../Common/DetailInfo';

export default function List(props) {
  const [basicActive, setBasicActive] = useState('');

  const handleBasicClick = (value) => {
    setBasicActive(value);
  }

  return (
    <div className='d-flex flex-row'>
        <MDBCard style={{maxHeight:'70vh',overflowY:'auto', overflowX:'hidden', width:'25rem', borderRadius:'20px'}}>
            <MDBRow width='auto'>
                <MDBCol  width='auto'>
                    <MDBListGroup light small>
                    <MDBTabs>
                        {props.locations.map((value)=>(
                            <MDBListGroupItem action active={basicActive === value.id} noBorders key={value.id}>
                                <MDBTabsItem>
                                    <MDBTabsLink onClick={() => handleBasicClick(value)}>{<TileCard chargingstations={value}/>}</MDBTabsLink>
                                </MDBTabsItem>
                        </MDBListGroupItem>
                            
                        ))}
                    </MDBTabs>
                    </MDBListGroup>
                </MDBCol>
            </MDBRow>
        </MDBCard>
        {basicActive &&
            <DetailInfo chargingstation={basicActive}/>}
    </div>
  );
}