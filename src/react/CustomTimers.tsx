import {Component} from 'react';
import {DateTime} from 'luxon';
import { pick as _pick } from 'lodash-es';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

import ActorPane, {ActorState} from './ethogram/ActorPane';

type ButtonState = (
	| { setup: false, name?: undefined, width?: undefined }
	| { setup: true, name: string, width: number }
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

type ButtonProps = {
	fns: ButtonStateFns,
}

function CustomButton({fns} : ButtonProps) {
	const [get, set] = fns;
	if (!get().setup) {
		const onClick = () => {
			const name = prompt("Name this button:");
			let width = parseInt(prompt("How small do you want it (0-5)") ?? '0');
			if (isNaN(width) || width < 0 || width > 5) {
				width = 0;
			}
			if (name != null && name.length > 0) {
				set({setup: true, name, width});
			}
		};

		return (
		<div className="m-1 flex-grow-1 d-flex">
			<Button variant="secondary" className="p-2 flex-grow-1" onClick={onClick}>
				<i className="bi-plus-square-dotted" />
			</Button>
		</div>
		);
	} else {
		const onClick = () => {
			const now = DateTime.now();
			console.log("Clicked " + get().name + " on " + now.toLocaleString(DateTime.DATE_SHORT) + " at " + now.toFormat("HH:mm:ss.SSS"));
		};

		return (
		<div className={"m-1 flex-grow-1 d-flex p-" + (get().width)}>
			<Button variant="primary" className="p-2 flex-grow-1" onClick={onClick}>
				{get().name}
			</Button>
		</div>
		);
	}
}

function ButtonPane({buttons}: {buttons: ButtonStates}) {
	// In width columns, render buttons that exist, or placeholders.
	return (
	<div className="d-flex flex-column h-100 m-2">
		<div className="d-flex flex-grow-1">
			<CustomButton fns={buttons.getFns(0)} />
			<CustomButton fns={buttons.getFns(1)} />
			<CustomButton fns={buttons.getFns(2)} />
		</div>
		<div className="d-flex flex-grow-1">
			<CustomButton fns={buttons.getFns(3)} />
			<CustomButton fns={buttons.getFns(4)} />
			<CustomButton fns={buttons.getFns(5)} />
		</div>
	</div>
	);
}

type PageState = ActorState & {
	buttons: ButtonStates,
};

export default class CustomTimers extends Component<{}, PageState> {
	constructor(props: {}) {
		super(props);

		const onButtonChange: StateUpdate = (buttons) => this.setState({buttons});

		this.state = {
			actor_id: 0,
			actor_active: false,
			buttons: new ButtonStates(onButtonChange),
		}
	}

	onActorStart() {
		this.setState(prevState => {
			if (!prevState.actor_active) {
				return {
					actor_id: prevState.actor_id + 1,
					actor_active: true,
				};
			} else {
				console.warn("Should not be starting if already started!");
				return null;
			}
		});
	}

	onActorStop() {
		this.setState(prevState => {
			if (prevState.actor_active) {
				return {
					actor_active: false,
				};
			} else {
				console.warn("Should not be stopping if already stopped!");
				return null;
			}
		});
	}

	render() {
		return (
		<Container style={{height: "75vh"}}>
			<h1>Ethogram</h1>
			<ActorPane 
				onStart={this.onActorStart.bind(this)}
				onStop={this.onActorStop.bind(this)}
				actorState={_pick(this.state, ['actor_active', 'actor_id'])}
			/>
			<ButtonPane buttons={this.state.buttons} />
		</Container>
		);
	}
}