import React from "react";
import background from '../../images/landing2.jpg'

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
      <div>
         <div>
            <h1>About us</h1>
            <h2>Welcome to the ChargeWise Network app</h2>
            <p>Your one-stop solution for all your electric vehicle (EV) charging needs. Our app is designed to make it easy for EV drivers to find and use charging stations, as well as for charging station providers to install new stations at feasible locations.</p>
            <p>The ChargeWise Network app features a comprehensive database of current EV charging locations across the country, including Level 2 charging stations and DC fast chargers. With our app, you can easily search for charging stations near your current location or a specific address, and filter results by station type and availability.</p>
            <p>For charging station providers, our app provides valuable insights and data on EV charging trends and usage patterns, helping you to identify feasible locations for new charging stations and optimize your network. We work with a range of partners and stakeholders, including utilities, property owners, and local governments, to identify opportunities for new charging station installations and ensure that they are located in the most convenient and accessible locations.</p>
            <p>Our ultimate goal is to accelerate the adoption of electric vehicles and reduce carbon emissions and air pollution by providing a comprehensive and reliable EV charging infrastructure. Join us today and become a part of the EV revolution with the ChargeWise Network app.</p>
         </div>
      <div>
      <h2>A Better Routeplanner</h2>
      <p>With ChargeFinder's route planner, it is easy to plan charging stops on the trip.</p>
      <p>Enter between which cities or places you want to go and ChargeFinder calculates an optimal route based on your choices and criteria.</p>
      <p>Quick chargers are shown on the map along the route and distances to the different chargers are presented in the list view. From the overview, it is quick to see if a charger is free or busy. Everything to facilitate planning and avoid queues.</p>
      <p>All relevant info in one place</p>
      <p>The station page shows the charging speed, outlet type, number outlets, price, which operator owns the station, and other relevant location information.</p>
      <p>With ChargeFinder's "Food and Shopping Nearby" it's easy to find out if there are eateries or other points of interest adjacent to the charging station.</p>
      <p>To make it easier to find chargers nearby, there is always a list of the nearest charging stations close to the one you are currently viewing. From the overview, you can see station type, which operator owns the station as well as the distance to get there.</p>
      <p>A click on the address opens a link to google for those who want to know more details about the place or see pictures.</p>
   </div>
         </div>
		<h1>Our Aim</h1>
		<h1>Our Vision</h1>
	</div>
);
};
