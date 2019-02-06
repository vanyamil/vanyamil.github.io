import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import OrbitSim from "./orbitsim/index.jsx";

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={App} > 
			{/* 
				App : Layout wrapper - use {this.props.children} in it for the container
				Home : index page
			*/}
			<IndexRoute component={Home} />
			<Route path="orbitsim" component={OrbitSim} />
		</Route>
	</Router>
), document.getElementById('root'));