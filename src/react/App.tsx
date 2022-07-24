import { createRoot } from 'react-dom/client';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {
	return (
	<Container>
		<Row>
			<Col>
				Welcome home!
			</Col>
		</Row>
	</Container>
	);
}

const container = document.getElementById('root');
if (container) {
	const root = createRoot(container);
	root.render(<Home />);
}