import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {AboutUs} from "./components/Common/AboutUs";
import Contact from "./components/Common/ContactUs";
import Support from "./components/Common/Support";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import background from "./images/background.jpg"

function App() {
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
		<Router>
			{window.location.pathname !== "/" &&  window.location.pathname !== "/register"? <Header /> : null}
			<Routes>
				<Route path="/" element={<Login/>}/>
				<Route path="/register" element={<Register/>}/>
				<Route path="/home" element={<Home/>}/>
				<Route path='/about-us' element={<AboutUs/>} />
				<Route path='/contact' element={<Contact/>} />
				<Route path='/support' element={<Support/>} />
			</Routes>
			{window.location.pathname !== "/" &&  window.location.pathname !== "/register" && window.location.pathname !== "/home" ?<div style={{left:0,bottom:0,right:0, position:'absolute'}}>
				<Footer/>
			</div>:null}
		</Router>

	</div>
	
);
}

export default App;
