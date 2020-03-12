import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '../layout.jsx';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

export default function RayTracer() {
	return (
	<Layout>
		<div className="row">
			<div className="col-12">
				<h1> Ray Tracer v0.9 </h1>
				<h3> Created by Ivan Miloslavov; based on designs by Paul Kry </h3>
				<p className="desc">
					This program allows you to try ray-tracing in the browser! Test out existing scenes or create your own. 
				</p>
				<p className="desc">
					Based on a design and lectures by Paul Kry, as part of the course COMP 557 - Introduction to Computer Graphics, in McGill University.
				</p>
			</div>
		</div>
		<div className="row">
			<div className="col-12">
				<ul className="nav nav-tabs">
					<li className="nav-item">
						<a className="nav-link active" data-toggle="tab" href="#start">Start</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" data-toggle="tab" href="#scene" id="sceneTab">Objects</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" data-toggle="tab" href="#render">Render</a>
					</li>
				</ul>
			</div>
		</div>
		<div className="tab-content text-center">
			<div id="start" className="container-fluid tab-pane active">
				<div className="row">
					<div className="col-12">
						<h5>New Scene or Existing</h5>
					</div>
				</div>
				<div className="row">
					<div className="col-6">
						<a className="btn btn-primary" href="#" onClick={(e) => { e.preventDefault(); $("#sceneTab").click(); }}>New Scene</a>
					</div>
					<div className="col-6">
						
					</div>
				</div>
			</div>
			<div id="scene" className="container-fluid tab-pane">
				<h5>Place JSON here</h5>
				<textarea id="inputJson" cols="80"></textarea>
			</div>
			<div id="render" className="container-fluid tab-pane">
				<div className="row">
					<button id="startRender" className="btn btn-success">
						Start Render
					</button>
				</div>
				<div className="row" id="canvasHolder">
				</div>
			</div>
		</div>
	</Layout>
	);
}

if (document.getElementById('root')) {
	ReactDOM.render(<RayTracer />, document.getElementById('root'));
}