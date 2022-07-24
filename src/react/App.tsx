import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Container from 'react-bootstrap/Container';

import Layout from './Layout';

function Home() {
	return (
	<Container>
		Welcome back!
	</Container>
	);
};

function NoPage() {
	return (
	<h1>404</h1>
	);
}

function App() {
	return (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="*" element={<NoPage />} />
			</Route>
		</Routes>
	</BrowserRouter>
	);
};

const container = document.getElementById('root');
if (container) {
	const root = createRoot(container);
	root.render(<App />);
}