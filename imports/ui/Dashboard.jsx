import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Grid } from './Grid';
import { EditGridSize } from './EditGridSize';

export const Dashboard = () => {
    return (
        <div className="dashboard">
			<Router>
				<nav>
					<ul>
						<li><Link className="nav-link" to="/">Home</Link></li>
						<li className="nav-item"><Link className="nav-link" to="/editGridSize">Edit grid size</Link></li>
					</ul>
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