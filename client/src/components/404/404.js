import React, {Component} from 'react';
import { Card,Slider,Slide,Button,Icon } from 'react-materialize';
import { Link } from 'react-router-dom';
import './404.css';
// A stateless react component class

class Error404 extends Component {

	constructor(props) {
		super(props);
		this.state= { }
	}

	componentDidMount() {  }

	render() {
		return (<div className='container'>
			<div className="success-message card">
			  
			  <h5 className='red-text text-lighten-1'><img src={ require('./dino.gif') } className="ab" /> Error ! Page Not Found</h5>
			  <hr style={{color: 'rgba(0,0,0,.3)'}} />
			  <h5> <Icon> error_outline</Icon>The page you requested was not found!</h5>
			
			</div>
		</div>);
	}
}
export default Error404;