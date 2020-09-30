import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { GridCollection } from '/imports/api/GridCollection';

// clear = 0
// railway = 1
// sensor = 2
// switch = 3

export const Grid = () => {
	const tiles = useTracker(() => GridCollection.find().fetch());
	const [drawingState, setDrawingState] = useState(0);

	const tileClickHandler = (e) => {
		e.preventDefault();
		var xPos = e.currentTarget.getElementsByClassName("x")[0].textContent
		var yPos = e.currentTarget.getElementsByClassName("y")[0].textContent
		console.log("x: " + xPos + ", y: " + yPos);
		console.log(drawingState);
	}

	const railwayClickHandler = (e) => {
		console.log("Railway click handler");
		setDrawingState(1);
	}

	const sensorClickHandler = (e) => {
		console.log("Sensor click handler");
		setDrawingState(2);
	}

	const switchClickHandler = (e) => {
		console.log("Switch click handler");
		setDrawingState(3);
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