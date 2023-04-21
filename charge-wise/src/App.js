import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AboutUs, OurAim, OurVision } from "./components/AboutUs";
import Contact from "./components/ContactUs";
import Support from "./components/Support";
import Login from "./components/Login/Login";

function App() {
return (
	<Router>
	<Routes>
		<Route path="/" element={<Login/>}/>
		<Route path='/about-us' element={<AboutUs/>} />
		<Route path='/about-us/aim' element={<OurAim/>} />
		<Route path='/about-us/vision' element={<OurVision/>} />
		<Route path='/contact' element={<Contact/>} />
		<Route path='/support' element={<Support/>} />
	</Routes>
	</Router>
);
}

export default App;
