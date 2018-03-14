import React, {Component} from 'react';
import './Home.css';
import { Card } from 'react-materialize';

// A stateless react component class

class Home extends Component {

	constructor() {
		super();
		this.state= {
			creators: [  ],
			authenticated: true
		}
	}

	componentDidMount() {
		return fetch('/creators')
		      .then((response) => response.json())
		      .then((responseJson) => {

		        this.setState( { creators: responseJson } )

		      })
		      .catch((error) =>{
		        console.error(error);
		      });
	}

	render() {
		if( this.state.authenticated )
		return (
			<div className="row" >

				<div style= {{ 'padding': '10px 10px 10px 10px' }} >
					<h4 className="cyan-text text-darken-4"> What is adderNet ?</h4>
					<p className='flow-text'>
					  adderNet is a social network that conenctes people by means of social network.

					</p>


					<h4 className="cyan-text text-darken-4"> What is adderNet ?</h4>
				</div>

				<footer>
					{
						this.state.creators.map( (person)=> (
							<div> { person.firstName } &nbsp; { person.lastName } </div>
						  )
						)
					}
				</footer>

			</div>
		);
		else return ( 
			<h5 className="truncate"> You are not authenticated to view this page. Change the Home component of the project. 
		</h5> 
		);
	}
}
export default Home;