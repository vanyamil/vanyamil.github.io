import React, {Component} from 'react';

export default class ClimberPanel extends Component {
	constructor(props) {
		super(props);

		// Keep controlled input state
		this.state = {
			height: 35000,
			tta: 10.00
		};

		// Testing this method out?
		this.handleTTAChange = this.handleTTAChange.bind(this);
		this.handleHeightChange = this.handleHeightChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleRelease = this.handleRelease.bind(this);
	}

	handleHeightChange(event) {
		this.setState({height: Math.max(Math.min(event.target.value, 100000), 5000)});
	}

	handleTTAChange(event) {
		this.setState({tta: Math.max(0.01, event.target.value)});
	}

	handleSubmit() {
		this.props.onLaunch(this.state.height, this.state.tta);
	}

	handleRelease() {
		this.props.onRelease();
	}

	render() {
		const isActive = this.props.active !== null;
		const active = isActive ? this.props.climbers[this.props.active] : null;
		const maxWidthStyle = {maxWidth: "70%"};
		return (
			<div className="card h-xl-100" id="climber-panel">
				<div className="card-header">
					Climbers
				</div>
				<div className="card-body">
					<div className="row">
						<div className="col-3 px-0">
							<button id="prev-climber" className="btn btn-secondary" onClick={this.props.onLeft}>
								<i className="fas fa-arrow-left"></i>
							</button>
						</div>
						<div className="col-3 px-0">
							<button id="add-climber" className="btn btn-success" onClick={this.props.onAdd}>
								<i className="fas fa-plus"></i>
							</button>
						</div>
						<div className="col-3 px-0">
							<button id="delete-climber" className="btn btn-danger" onClick={this.props.onDelete}>
								<i className="fas fa-minus"></i>
							</button>
						</div>
						<div className="col-3 px-0">
							<button id="next-climber" className="btn btn-secondary" onClick={this.props.onRight}>
								<i className="fas fa-arrow-right"></i>
							</button>
						</div>
					</div>
					<div className="row py-2 px-1">
						<div className="col-4 px-0 text-left">
							Height (km): 
						</div>
						<div className="col-8 px-0 text-right">
							{isActive ? Math.round(active.height / 1000) : "N/A"}
						</div>
					</div>
					<div className="row py-2 px-1">
						<div className="col-4 px-0 text-left">
							Target (km): 
						</div>
						<div className="col-8 px-0 text-right">
							<input type="number" min="5000" max="100000" value={this.state.height} style={maxWidthStyle} onChange={this.handleHeightChange} />
						</div>
					</div>
					<div className="row py-2 px-1">
						<div className="col-4 px-0 text-left">
							TTA (days): 
						</div>
						<div className="col-8 px-0 text-right">
							<input type="number" min="0.01" step="0.01" value={this.state.tta} style={maxWidthStyle} onChange={this.handleTTAChange} />
						</div>
					</div>
					<div className="row py-2">
						<div className="col-6 px-1">
							<button id="track-climber" className="btn btn-info btn-sm w-100" onClick={this.props.onTrack}> Track </button> 
						</div>
						<div className="col-6 px-1">
							{ 
								isActive && active.profile != null && active.payload.contained 
								?
									<button id="early-release" className="btn btn-danger btn-sm w-100" onClick={this.handleRelease}> Release </button> 
								:
									<button id="launch-climber" className="btn btn-warning btn-sm w-100" onClick={this.handleSubmit}> Launch </button> 
							}
						</div>
					</div>
				</div>
			</div>
		);
	}
}