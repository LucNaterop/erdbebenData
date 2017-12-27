import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import React from 'react';

import ons from 'onsenui';
import * as Ons from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

class Results extends React.Component {
	render() {
		var erdbebenData = this.props.erdbebenData;
		var plots = this.props.erdbebenData.map(e => 	
			<LineChart style={{backgroundColor: 'white', margin: 20, padding: 20 }} key={e._id} width={1000} height={300} data={e.data} >
				<Line type="monotone" dataKey="y" stroke="#8884d8" dot={false}/>
				<CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
				<XAxis dataKey="time" />
				<YAxis />
			</LineChart>
		);
		return (
			<Ons.Page contentStyle={{padding: 10}}>
				{plots}
			</Ons.Page>
		)
	}
}

export default createContainer(() => {
	return {
		erdbebenData: ErdbebenData.find().fetch(),
	};
}, Results);

