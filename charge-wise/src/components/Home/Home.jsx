import React from "react";
import Footer from "../Common/Footer";
import UserView from "../User/UserView"

const Home = () => {
return (
    <div>
        {localStorage.getItem("role")!== null && localStorage.getItem("role").includes("Provider")?
        <div style={{padding:'2rem'}}>
            <button className="text-dark gradient-custom-2" style={{padding:'1rem 1rem', float:'right'}}>Get Feasible Locations for Charging Station</button>
        </div>
        :null}
        <div style={{padding:'2rem 0rem 0rem 0.5rem'}}>
                <UserView/>
        </div>
        <Footer/>
    </div>
);
};

export default Home;
