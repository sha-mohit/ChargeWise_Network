import React, { useState } from "react";
import UserView from "../User/UserView"
import background from '../../images/landing2.jpg'
import FeasibleLocations from "../FeasibleLocations/FeasibleLocations.jsx";

const Home = () => {
    const [feasibleLocations, setFeasibleLocations] = useState(false)
    const handleClick=()=>{
        setFeasibleLocations(true)
    }
return (
    <div  style={{ 
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        overflow:'hidden',
      }}>
        {localStorage.getItem("role")!== null && localStorage.getItem("role").includes("Provider")?
        <div style={{padding:'2rem'}}>
            <button className="text-dark gradient-custom-2" style={{padding:'1rem 1rem', float:'right'}} onClick={handleClick}>Get Feasible Locations for Charging Station</button>
        </div>
        :null}
        <div style={{padding:'2rem 0rem 0rem 0.5rem'}}>
                {!feasibleLocations?<UserView/>:
                <FeasibleLocations/>}
        </div>
    </div>
);
};

export default Home;
