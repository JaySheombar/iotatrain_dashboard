import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const GridSizeCollection = new Mongo.Collection('GridSize');

if(Meteor.isServer) {
	Meteor.publish('gridSize', function gridSizePublication() {
		return GridSizeCollection.find();
	});
}

Meteor.methods({
	'gridSize.insert'(gridSize) {
		GridSizeCollection.insert({
			width: gridSize.width,
			height: gridSize.height,
			createdAt: new Date()
		});
	},
	'gridSize.update'(gridSize) {
		GridSizeCollection.update(GridSizeCollection.find().fetch()[0]._id, { $set : {
				width: gridSize.width,
				height: gridSize.height,
				updatedAt: new Date()
			}
		});
	},
});