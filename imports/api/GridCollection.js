import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const GridCollection = new Mongo.Collection('Grid');

if(Meteor.isServer) {
	Meteor.publish('grid', function gridPublication() {
		return GridCollection.find();
	});
}

Meteor.methods({
	'grid.insert'(tile){
		GridCollection.insert({
			xPos: tile.xPos,
			yPos: tile.yPos,
			type: tile.type,
			active: tile.active,
			createdAt: new Date,
		});
	},
	'grid.update'(tile){
		GridCollection.update(tile._id, { $set: {
				xPos: tile.xPos,
				yPos: tile.yPos,
				type: tile.type,
				active: tile.active,
				updatedAt: new Date()
			}
		});
	},
	'grid.remove'(tileId){
		check(tileId, String);
		GridCollection.remove({_id: tileId});
	}
});