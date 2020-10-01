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
		// console.log("x: " + xPos + ", y: " + yPos);
		// console.log(drawingState);

		GridCollection.update(e.currentTarget.id, { $set: {
			type: drawingState,
		}});
	}

	const legendClickHandler = (e) => {
		setDrawingState(parseInt(e.currentTarget.id));
	}

	const styleFromDrawingState = (t) => {
		switch(t) {
			case 0:
				return "grid-item clear-tile";
			case 1:
				return "grid-item railway-tile";
			case 2:
				return "grid-item sensor-tile";
			case 3:
				return "grid-item switch-tile";
			default:
				return "grid-item clear-tile";
		}
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
			left: xposition,
			marginTop: yposition,
		}
	}

	return(
		<div className="Grid">
			<h1>Grid</h1>

			<div className="legend-container">
				<button id="1" className="legend-button" onClick={ legendClickHandler }>Railway</button>
				<button id="2" className="legend-button" onClick={ legendClickHandler }>Sensor</button>
				<button id="3" className="legend-button" onClick={ legendClickHandler }>Switch</button>
				<button id="0" className="legend-button" onClick={ legendClickHandler }>Clear</button>
			</div>

			<div className="grid-container">
				{tiles.map(tile => (
					<button onClick={tileClickHandler} style={getPosition(tile)} key={tile._id} id={tile._id} className={ styleFromDrawingState (tile.type)}><span className="x">{tile.xPos}</span>, <span className="y">{tile.yPos}</span></button>
				))}
			</div>
			
		</div>
	);
}