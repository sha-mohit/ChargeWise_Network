import React from "react";
import background from '../../images/background.jpg'

export const AboutUs = () => {
return (
	<div  style={{ 
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        overflow:'auto',
		minHeight:'100%',
      }}>
		<h1>About us</h1>
		<h1>Our Aim</h1>
		<h1>Our Vision</h1>
	</div>
);
};
