import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { GridCollection } from '/imports/api/GridCollection';

// railway = 0
// sensor = 1
// switch = 2

export const Grid = () => {
	const tiles = useTracker(() => GridCollection.find().fetch());

	const tileClickHandler = (e) => {
		e.preventDefault();
		console.log(e.currentTarget.getElementsByClassName("x")[0].textContent);
		console.log(e.currentTarget.getElementsByClassName("y")[0].textContent);

		// console.log("drawing: " + this.state.drawState);
	}

	const railwayClickHandler = (e) => {
		console.log("Railway click handler");
		// this.setState((state) => {
		// 	drawState: 0
		// });
	}

	const sensorClickHandler = (e) => {
		console.log("Sensor click handler");
		// this.setState((state) => {
		// 	drawState: 1
		// });
	}

	const switchClickHandler = (e) => {
		console.log("Switch click handler");
		// this.setState((state) => {
		// 	drawState: 2
		// });
	}

	const getPosition = (t) => {

		var xposition = "0px";
		var yposition = "0px";

		if(t.xPos != 0) {
			xposition = t.xPos * 40;
		}

		if(t.yPos != 0) {
			yposition = t.yPos * 40;
		}

		return {
			backgroundColor: "white",
			left: xposition,
			marginTop: yposition,
		}
	}

	return(
		<div className="Grid">
			<h1>Grid</h1>
			<div className="grid-container">
				{tiles.map(tile => (
					<button onClick={tileClickHandler} style={getPosition(tile)} key={tile._id} id={tile._id} className="grid-item"><span className="x">{tile.xPos}</span>, <span className="y">{tile.yPos}</span></button>
				))}

				<div className="legend-container">
						<button onClick={railwayClickHandler}>Railway</button>
						<button onClick={sensorClickHandler}>Sensor</button>
						<button onClick={switchClickHandler}>Switch</button>
				</div>
			</div>
			
		</div>
	);
}