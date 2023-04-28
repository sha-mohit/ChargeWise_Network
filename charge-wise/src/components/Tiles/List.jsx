import React, { useState } from 'react';
import {
  MDBCol,
  MDBListGroup,
  MDBListGroupItem,
  MDBRow,
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane
} from 'mdb-react-ui-kit';

export default function List(props) {
  const [basicActive, setBasicActive] = useState('home');

  const handleBasicClick = (value) => {
    if (value === basicActive) return;
    console.log(props)
    setBasicActive(value);
  }

  return (
    <MDBRow style={{paddingTop:'6rem'}}>
      <MDBCol size={3}>
        <MDBListGroup light small>
          <MDBTabs>
            {props.names.map((value)=>{
                <MDBListGroupItem action active={basicActive === value} noBorders className='px-3'>
                <MDBTabsItem>
                  <MDBTabsLink onClick={() => handleBasicClick(value)}>{value}</MDBTabsLink>
                </MDBTabsItem>
              </MDBListGroupItem>
                
            })}
            {/* <MDBListGroupItem action active={basicActive === 'profile'} noBorders className='px-3'>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('profile')}>{props.names[1]}</MDBTabsLink>
              </MDBTabsItem>
            </MDBListGroupItem>
            <MDBListGroupItem action active={basicActive === 'messages'} noBorders className='px-3'>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('messages')}>{props.names[2]}</MDBTabsLink>
              </MDBTabsItem>
            </MDBListGroupItem>
            <MDBListGroupItem action active={basicActive === 'settings'} noBorders className='px-3'>
              <MDBTabsItem>
                <MDBTabsLink onClick={() => handleBasicClick('settings')}>{props.names[3]}</MDBTabsLink>
              </MDBTabsItem>
            </MDBListGroupItem> */}
          </MDBTabs>
        </MDBListGroup>
      </MDBCol>

      <MDBCol size={8}>
        <MDBTabsContent>
          <MDBTabsPane show={basicActive === 'home'}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore impedit quibusdam exercitationem
            eligendi voluptate doloribus non pariatur libero quod nobis mollitia odio dolore eos debitis iure,
            autem quisquam ullam beatae.
          </MDBTabsPane>
          <MDBTabsPane show={basicActive === 'profile'}>
            Ea eos asperiores deserunt reprehenderit voluptatem deleniti dolor iure eum consectetur commodi.
          </MDBTabsPane>
          <MDBTabsPane show={basicActive === 'messages'}>
            Et perspiciatis facilis labore natus at necessitatibus. Sequi earum qui illum reiciendis? Excepturi,
            dicta consequuntur, voluptas aspernatur, quis laboriosam exercitationem quasi officia tempore iste
            assumenda aliquam.
          </MDBTabsPane>
          <MDBTabsPane show={basicActive === 'settings'}>
            Praesentium asperiores nemo ratione quas atque excepturi odio aliquid libero, architecto aspernatur
            expedita, corrupti, rem odit quos exercitationem maxime at. Ex, eveniet rerum laborum accusamus
            delectus magnam maxime!
          </MDBTabsPane>
        </MDBTabsContent>
      </MDBCol>
    </MDBRow>
  );
}