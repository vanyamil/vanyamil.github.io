import {Component} from 'react';
import {DateTime} from 'luxon';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

function SettingPane(props: {}) {
	// Set width
	// Enable edit mode
	return <></>;
}

type ButtonState = (
	| { setup: false, name?: undefined }
	| { setup: true, name: string }
);

type ButtonStateFns = [
	() => ButtonState,
	(state: ButtonState) => void,
];

type StateUpdate = (self: ButtonStates) => void;

class ButtonStates {
	#states: ButtonState[];
	#onButtonChange: StateUpdate;

	constructor(onButtonChange: StateUpdate) {
		this.#states = [];
		this.#onButtonChange = onButtonChange;
	}

	expandTo(id: number): void {
		while (this.#states.length <= id) {
			this.#states.push({setup: false});
		}
	}

	getState(id: number): ButtonState {
		this.expandTo(id);
		return this.#states[id];
	}

	setState(id: number, state: ButtonState): void {
		this.expandTo(id);
		this.#states[id] = state;
		this.#onButtonChange(this);
	}

	getFns(id: number): ButtonStateFns {
		return [
			() => this.getState(id),
			(state: ButtonState) => this.setState(id, state),
		];
	}
}

function CustomButton(props: {fns: ButtonStateFns}) {
	const [get, set] = props.fns;
	if (!get().setup) {
		const onClick = () => {
			const name = prompt("Name this button:");
			if (name != null && name.length > 0) {
				set({setup: true, name});
			}
		};

		return (
		<Button variant="secondary" className="p-2 flex-grow-1 m-1" onClick={onClick}>
			<i className="bi-plus-square-dotted" />
		</Button>
		);
	} else {
		const onClick = () => {
			const now = DateTime.now();
			console.log("Clicked " + get().name + " on " + now.toLocaleString(DateTime.DATE_SHORT) + " at " + now.toLocaleString(DateTime.TIME_24_WITH_SECONDS));
		};

		return (
		<Button variant="primary" className="p-2 flex-grow-1 m-1" onClick={onClick}>
			{get().name}
		</Button>
		);
	}
}

function ButtonPane(props: {buttons: ButtonStates}) {
	// In width columns, render buttons that exist, or placeholders.
	return (
	<div className="d-flex flex-column h-100 m-2">
		<div className="d-flex flex-grow-1">
			<CustomButton fns={props.buttons.getFns(0)} />
			<CustomButton fns={props.buttons.getFns(1)} />
			<CustomButton fns={props.buttons.getFns(2)} />
		</div>
		<div className="d-flex flex-grow-1">
			<CustomButton fns={props.buttons.getFns(3)} />
			<CustomButton fns={props.buttons.getFns(4)} />
			<CustomButton fns={props.buttons.getFns(5)} />
		</div>
	</div>
	);
}

export default class CustomTimers extends Component {
	state: {
		width: number,
		buttons: ButtonStates,
	}

	constructor(props: {}) {
		super(props);

		const onButtonChange: StateUpdate = (buttons) => this.setState({buttons});

		this.state = {
			width: 1,
			buttons: new ButtonStates(onButtonChange),
		}
	}

	render() {
		return (
		<Container style={{height: "90vh"}}>
			<SettingPane />
			<ButtonPane buttons={this.state.buttons} />
		</Container>
		);
	}
}