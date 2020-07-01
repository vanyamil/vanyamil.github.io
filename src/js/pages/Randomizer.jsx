import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '../layout.jsx';

import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class InputRow extends React.Component {
	render() {
		return (
		<div className="form-row my-2" id={"row-" + this.props.id}>
			<div className="col-2 my-auto">
				<button className="btn btn-danger btn-sm" onClick={this.props.delete}>Delete</button>
			</div>
			<div className="col-6">
				<input type="text" className="form-control" placeholder="Alert text" />
			</div>
			<div className="col-4">
				<input type="number" className="form-control" defaultValue="2" min="1" />
			</div>
		</div>
		);
	}
}

class InputPane extends React.Component {
	render() {
		const rows = /* map */ null;
		return (
		<div className="container text-center">
			<div className="form-row my-2" id="headers">
				<div className="col-2">
					
				</div>
				<div className="col-6">
					<label>Alert text</label>
				</div>
				<div className="col-4">
					<label>Duration (s)</label>
				</div>
			</div>
			{rows}
			<div className="form-row my-2">
				<div className="col-2">
					<button className="btn btn-primary btn-sm" onClick={this.addNewRow}>Add</button>
				</div>
				<div className="col-8">
					<label className="mr-3">Per-alert random:</label>
					<div className="form-check form-check-inline">
						<input className="form-check-input" type="checkbox" defaultChecked id="uniform" value="uniform" />
						<label className="form-check-label" htmlFor="uniform">No</label>
					</div>
					<div className="form-check form-check-inline">
						<input className="form-check-input" type="checkbox" id="poisson" value="poisson" />
						<label className="form-check-label" htmlFor="poisson">Yes</label>
					</div>
				</div>
				<div className="col-2 my-auto">
					<button className="btn btn-success btn-sm">Start</button>
				</div>
			</div>
		</div>
		);
	}
}

class AlertPane extends React.Component {
	render() {
		return (
		<div className="container">
		</div>
		);
	}
}

export default class Randomizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			running: false,
			num: 0,
			names: [],
			times: [],
			probs: []
		};

		this.addNewRow = this.addNewRow.bind(this);
		this.removeRow = this.removeRow.bind(this);
		this.changeRow = this.changeRow.bind(this);
	}

	addNewRow() {
		this.setState((state, props) => {
			state.running = false;
			state.names.push("");
			state.times.push(2);
			state.probs.push(0);
			state.num++;
			return state;
		});
	}

	removeRow() {
		this.setState((state, props) => {
			state.running = false;
			if(state.num > 0) {
				state.names.pop();
				state.times.pop();
				state.probs.pop();
				state.num--;
			}
			return state;
		});
	}

	changeRow(id, prop, val) {
		this.setState((state, props) => {
			const arr = state[prop];
			arr[id] = val;
			return {[prop]: arr};
		});
	}

	render() {
		return (
		<Layout>
			<div className="row">
				<div className="col-12">
					<h1> Alert Randomizer </h1>
					<p className="desc">
						This program was designed with the game Starcraft II in mind. One of the most important skills in the game is multi-tasking,
						which requires thinking about a lot of different things and switch between focuses quickly.
						Because I keep forgetting to do all the things, I made this randomizer which every couple of seconds can yell at me
						something to remember again.
					</p>
				</div>
			</div>
			<div className="row">
				<div className="col-6">
					<InputPane state={this.state} />
				</div>
				<div className="col-6">
					<AlertPane state={this.state} />
				</div>
			</div>
		</Layout>
		);
	}
}

if (document.getElementById('root')) {
	ReactDOM.render(<Randomizer />, document.getElementById('root'));
}