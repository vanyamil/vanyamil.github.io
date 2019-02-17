import React from 'react';

export default function Layout() {
	return (
	<div id="react-root">
		<nav className="navbar bg-dark navbar-dark fixed-top navbar-expand-md">
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
			{this.props.children}
		</div>
	</div>
	);
}