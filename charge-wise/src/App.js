import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AboutUs, OurAim, OurVision } from "./components/Common/AboutUs";
import Contact from "./components/Common/ContactUs";
import Support from "./components/Common/Support";
import Login from "./components/Login/Login";
import UserView from "./components/User/UserView";

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
		<Route path='/userview' element={<UserView/>} />
	</Routes>
	</Router>
);
}

export default App;
