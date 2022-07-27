import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export type ActorState = {
	actor_id: number,
	actor_active: boolean,
}

type ActorPaneProps = {
	actorState: ActorState,
	onStart(): void,
	onStop(): void,
}

export default function ActorPane(props: ActorPaneProps) {
	const active = props.actorState.actor_active;
	return (
	<Row>
		<Col>
			<h2>
				Actor:
			</h2>
		</Col>
		<Col>
			<Button 
				className="w-100"
				onClick={active ? props.onStop : props.onStart}
				variant={active ? "danger" : "success"}
			>
				{active ? "Stop" : "Start"}
			</Button>
		</Col>
		<Col>
			{"ID: " + props.actorState.actor_id + (active ? "" : " (complete)")}
		</Col>
	</Row>
	);
}