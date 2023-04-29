import React, { useState } from "react";
import UserView from "../User/UserView"
import background from '../../images/landing2.jpg'

const Home = () => {
return (
    <div  style={{ 
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        overflow:'hidden',
      }}>
        <div style={{padding:'2rem 0rem 0rem 0.5rem'}}>
                <UserView/>
        </div>
    </div>
);
};

export default Home;
