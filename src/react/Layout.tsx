import { Outlet, Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

export default function Layout() {
	return (
	<div id="react-root">
		<Navbar bg="dark" expand="md" sticky="top" variant="dark">
			<Container>
				<Navbar.Brand>Ivan M</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="navbar-nav">
					<Nav className="me-auto">
						<LinkContainer to="/">
							<Nav.Link>Home</Nav.Link>
						</LinkContainer>
						<LinkContainer to="/orbitsim">
							<Nav.Link>Space Elevator</Nav.Link>
						</LinkContainer>
						<LinkContainer to="/raytracer">
							<Nav.Link>Ray Tracer</Nav.Link>
						</LinkContainer>
						<LinkContainer to="/custom-timers">
							<Nav.Link>Custom Timers</Nav.Link>
						</LinkContainer>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
		<Outlet />
	</div>
	);
};