import React from 'react';
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