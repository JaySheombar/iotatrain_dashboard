import React, { useState } from 'react';
import { GridSizeCollection } from '/imports/api/GridSizeCollection';
import { GridCollection } from '/imports/api/GridCollection';

const createGrid = (width, height) => {
	emptyGrid();

	for(i = 0; i <= height; i++) {
		for(j = 0; j <= width; j++) {
			GridCollection.insert({
				xPos: j,
				yPos: i,
				type: 0,
				active: 0,
				createdAt: new Date()
			});
		}
	}
}

const emptyGrid = () => {
	if(GridCollection.findOne()) {
		GridCollection.find().fetch().forEach(tile => {
			GridCollection.remove({_id: tile._id});
		});
	}
}

export const EditGridSize = () => {
	const [widthV, setWidthV] = useState("");
	const [heightV, setHeightV] = useState("");

	const onSubmit = e => {
		e.preventDefault();
		
		if (!width || !height) return;

		if(GridSizeCollection.findOne()) {
			GridSizeCollection.update({_id: GridSizeCollection.findOne()._id}, {
				width: widthV,
				height: heightV,
				createdAt: GridSizeCollection.findOne().createdAt,
				updatedAt: new Date()
			});
		} else {
			GridSizeCollection.insert({
				width: widthV,
				height: heightV,
				createdAt: new Date()
			});
		}

		createGrid(widthV, heightV);

		setWidthV("");
		setHeightV("");
	}

	return(
		<div className="EditGridSize">
			<h1>Edit Grid size</h1>
			<p>Editting the grid sizes will delete your current grid, so be carefull when submitting new grid sizes.</p>
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label>Width:</label>
					<input type="text" className="form-control" id="width" value={widthV} onChange={(e) => setWidthV(e.target.value)} />
				</div>
				<div className="form-group">
					<label>Height:</label>
					<input type="text" className="form-control" id="height" value={heightV} onChange={(e) => setHeightV(e.target.value)} />
				</div>
				<button type="submit" className="btn btn-primary">Submit</button>
			</form>
		</div>
	);
}