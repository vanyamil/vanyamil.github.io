import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '../layout.jsx';
import component from '../orbitsim/index.jsx';

export default function OrbitSim() {
	return (
	<Layout>
		<div className="row">
			<div className="col-12">
				{component}
			</div>
		</div>
	</Layout>
	);
}

if (document.getElementById('root')) {
	ReactDOM.render(<OrbitSim />, document.getElementById('root'));
}