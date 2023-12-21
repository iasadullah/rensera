import React from "react";
import {Link} from "react-router-dom";
import '../assets/css/style.css';
import '../assets/css/font-awesome.min.css';

import logoImg from '../assets/images/logo.png';

function Home() { 
  return (
	<div className="landing-bg">
		<div className="inner-section">
			<img src={logoImg} alt="" />
			<Link to={'/home'} ><button type="button">Get Started</button></Link>
		</div>
	</div>
  );
}

export default Home;
