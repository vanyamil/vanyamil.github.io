import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '../layout.jsx';

export default function Home() {
	return (
	<Layout>
		<div className="row">
			<div className="col-12">
				Welcome home!
			</div>
		</div>
	</Layout>
	);
}

if (document.getElementById('root')) {
	ReactDOM.render(<Home />, document.getElementById('root'));
}