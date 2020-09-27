import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Grid } from './Grid';
import { EditGridSize } from './EditGridSize';

export const Dashboard = () => {
    return (
        <div className="dashboard">
			<Router>
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<a className="navbar-brand" href="#">IOTA TRAIN DASHBOARD</a>
					
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item active">
								<Link className="nav-link" to="/">Home</Link>
							</li>
							<li className="nav-item">
								<Link className="nav-link" to="/editGridSize">Edit grid size</Link>
							</li>
						</ul>
					</div>
				</nav>

				<hr />
				<Switch>
					<Route exact path="/">
						<Grid />
					</Route>
					<Route exact path="/editGridSize">
						<EditGridSize />
					</Route>
				</Switch>
			</Router>
        </div>
    );
};