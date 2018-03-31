import React, {Component} from 'react';
import { Card,Slider,Slide,Button } from 'react-materialize';
import { Link } from 'react-router-dom';
// A stateless react component class

class Error404 extends Component {

	constructor(props) {
		super(props);
		this.state= { }
	}

	componentDidMount() {  }

	render() {
		return (<div>404 Not Found..</div>);
	}
}
export default Error404;