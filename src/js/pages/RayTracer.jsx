import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '../layout.jsx';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import p5 from "../raytracer/index.js";

const scenes = [
	{
		link: "firstSphere", // Keep this always first
		name: "Single Sphere"
	},
	{
		link: "fakeTranslucent", 
		name: "Fake Translucency"
	},
	{
		link: "boxStacks", 
		name: "Stacked Boxes"
	},
	{
		link: "infinite1", 
		name: "Infinite Corridor"
	}
];

const ver = 1.0

class StartPane extends React.Component {
	existingLink(obj) {
		return (
			<a href="#" className="list-group-item list-group-item-action" key={obj.link} onClick={(e) => {
				e.preventDefault();
				fetch("/raytracer/scenes/" + obj.link + ".json")
					.then(response => response.text())
					.then(text => {
						$("#inputJSON").val(text);
						$("#sceneTab").click();
					});
			}}>
				{obj.name}
			</a>
		)
	}

	render() {
		return (
		<div id="start" className="tab-pane container-fluid active">
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
					<div className="list-group">
						{scenes.map(this.existingLink)}
					</div>
				</div>
			</div>
		</div>
		);
	}
}

class CameraPane extends React.Component {
	render() {
		return (
		<div id="camera" className="tab-pane container-fluid">
			<div className="form-row">
				<div class="col-6">
				</div>
				<div class="col-6">
				</div>
			</div>
		</div>
		);
	}
}

export default class RayTracer extends React.Component {
	render() {
		return (
		<Layout>
			<div className="row">
				<div className="col-12">
					<h1> Ray Tracer - v{ver} </h1>
					<h3> Created by Ivan Miloslavov; based on designs by Paul Kry </h3>
					<p className="desc">
						This program allows you to try ray-tracing in the browser! Test out existing scenes or create your own. 
					</p>
					<p className="desc">
						Based on a design and lectures by Paul Kry, as part of the course COMP 557 - Introduction to Computer Graphics, in McGill University.
					</p>
					<p className="desc">
						Future versions may change the UI to make scenes without JSON, attempt to include multithreading via workers or add new render technology or objects. For now, the JSON documentation is <a href="docs" target="_blank">here</a>.
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
							<a className="nav-link" data-toggle="tab" href="#scene" id="sceneTab">JSON</a>
						</li>
						<li className="nav-item">
							<a className="nav-link" data-toggle="tab" href="#render">Render</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="tab-content text-center">
				<StartPane />
				<div id="scene" className="tab-pane container-fluid">
					<h5>Place JSON here</h5>
					<textarea id="inputJSON" cols="80" rows="20"></textarea>
				</div>
				<div id="render" className="tab-pane container-fluid">
					<div className="row">
						<button id="startRender" className="btn btn-success mx-auto" onClick={() => {
							const json = $("#inputJSON").val();
							p5.drawFrom(JSON.parse(json)); 
						}}>
							Start Render
						</button>
					</div>
					<div className="row my-5" id="canvasHolder">
					</div>
				</div>
			</div>
		</Layout>);
	}
}

if (document.getElementById('root')) {
	ReactDOM.render(<RayTracer />, document.getElementById('root'));
}

window.p5 = p5;