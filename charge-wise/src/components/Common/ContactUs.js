import React from "react";
import background from '../../images/landing2.jpg'

const ContactUs = () => {
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
		<h1>Contact us</h1>
	</div>
);
};

export default ContactUs;
