import React, {Component} from 'react';
import './Home.css';
import { Card,Slider,Slide,Button } from 'react-materialize';
import { Link } from 'react-router-dom';
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
		// testing fetch api........
		// return fetch('/creators')
		//       .then((response) => response.json())
		//       .then((responseJson) => {

		//         this.setState( { creators: responseJson } )

		//       })
		//       .catch((error) =>{
		//         console.error(error);
		//       });
	}

	render() {
		if( this.state.authenticated )
		return (
			<div className="row" >

				<Slider>
				  <Slide
				    src="https://i.pinimg.com/564x/92/a0/5b/92a05b527f59d49581573c329a54ab2e.jpg"
				    title="addeNet">
				    An Indian Social Network that connectes people in every aspect.
				  </Slide>
				  <Slide
				    src=""
				    title="Why are you waiting? Create an account"
				    placement="right">
				    <Link to="/signup"><button className='btn orange darken-2'>SIGN UP </button> </Link>
				  </Slide>
				  <Slide
				    src="http://lorempixel.com/580/250/nature/3"
				    title="say good bye! to facebook,instagram,twitter"
							    placement="right">
				    <span className="amber-text lighten-1"> No word limit like Twitter, now you can dislike posts, and many more features.... </span> 
				  </Slide>
				</Slider>

				<footer>
					{
						this.state.creators.map( (person)=> (
							<div key={person.firstName}> { person.firstName } &nbsp; { person.lastName } </div>
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