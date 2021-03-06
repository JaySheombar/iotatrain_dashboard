import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Dashboard } from '/imports/ui/Dashboard';

Meteor.startup(() => {
  render(<Dashboard />, document.getElementById('react-target'));
});
