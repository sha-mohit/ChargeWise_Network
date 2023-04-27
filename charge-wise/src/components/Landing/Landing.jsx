import React, { useState, useEffect } from "react";
import { Navigation } from "../Landing/navigation";
import { Header } from "../Landing/header";
import { About } from "../Landing/about";
import { Services } from "../Landing/services";
import { Team } from "../Landing/Team";
import JsonData from "../../data/data.json";
import SmoothScroll from "smooth-scroll";
import "./Landing.css";
import Footer from "../Common/Footer";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const Landing = () => {
  const [landingPageData, setLandingPageData] = useState({});
   useEffect(() => {
     setLandingPageData(JsonData);
   }, []);

  return (
    <div>
      <Navigation/>
      <Header data={landingPageData.Header} />
      <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      <Team data={landingPageData.Team} />
      <Footer/>
    </div>
  );
};

export default Landing;
