import React from "react";
import background from '../../images/landing2.jpg'

const Support = () => {
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
		<h1>Support</h1>
	</div>
);
};

export default Support;
