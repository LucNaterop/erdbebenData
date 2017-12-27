import { Meteor } from 'meteor/meteor';
import React from 'react';
import {render} from 'react-dom';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Results from './Results.jsx';

var data = [];

export default class App extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			x: 0,
			y: 0,
			intervalId: null,
		}
	}

	renderToolbar() {
		return (
			<Ons.Toolbar>
				<div className="center">Erdbeben</div>
			</Ons.Toolbar>
		);
	}

	render() {
		return (
			<Ons.Page renderToolbar={this.renderToolbar.bind(this)} contentStyle={{padding: 10}}>
				<Ons.Button onClick={this.handleStart.bind(this)}>
					Aufzeichnung starten
				</Ons.Button> <br /><br />
				<Ons.Button onClick={this.handleStop.bind(this)}>
					Aufzeichnung stoppen
				</Ons.Button>
				<p>x: {this.state.x}</p>
				<p>y: {this.state.y}</p>
				<Ons.Button onClick={() => {this.props.navigator.pushPage({component: Results})}}>
					Plots ansehen
				</Ons.Button>
			</Ons.Page>
		);
	}x

	handleStart() {
		var that = this;
		function handleMotionEvent(event) {

		    var x = event.accelerationIncludingGravity.x;
		    var y = event.accelerationIncludingGravity.y;

		    that.setState({
		    	x: x,
		    	y: y,
		    });

		}

		window.addEventListener("devicemotion", handleMotionEvent, true);
		ons.notification.toast('Aufzeichnung gestartet.',{timeout:1000});
		time = 0;
		dt = 20;
		var intervalId = setInterval(() => {
			console.log(dt);
			data.push({
				x: that.state.x,
				y: that.state.y,
				time: time/1000
			})
			time += dt;
		}, dt);
		this.setState({ intervalId: intervalId });
	}

	handleStop() {
		var that = this;
		clearInterval(this.state.intervalId);
		ons.notification.toast('Aufzeichnung gestoppt.', {timeout:1000});
		ErdbebenData.insert({'data': data}, () => {
			data = [];
		});
	}

}
