import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Route} from 'react-router';

import OrbitSim from "./orbitsim/index.jsx";
import Home from "./pages/Home.jsx";

ReactDOM.render((
	<Router>
		<div id="react-root">
			<nav className="navbar bg-dark navbar-dark fixed-top">
				<a className="navbar-brand" href="#">Ivan M</a>
				<ul className="navbar-nav">
					<li className="nav-item">
						<a className="nav-link" href="/">Home</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/orbitsim">Space Elevator</a>
					</li>
				</ul>
			</nav>
			<div className="container-fluid">
				<Route exact path="/" component={<Home />} />
				<Route exact path="/orbitsim" component={OrbitSim} />
			</div>
		</div>
	</Router>
), document.getElementById('root'));