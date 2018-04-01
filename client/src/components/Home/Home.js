import React, {Component} from 'react';
import './Home.css';
import { Card,Slider,Slide,Button,Footer } from 'react-materialize';
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

				<Footer copyrights="&copy; 2018 by adderNet"
				  moreLinks={
				    <a className="grey-text text-lighten-4 right" href="#!">More Links</a>
				  }
				  links={
				    <ul className=''>
				      <li><a className="grey-text text-lighten-3" href="#!">Link 1</a></li>
				      <li><a className="grey-text text-lighten-3" href="#!">Link 2</a></li>
				      <li><a className="grey-text text-lighten-3" href="#!">Link 3</a></li>
				      <li><a className="grey-text text-lighten-3" href="#!">Link 4</a></li>
				    </ul>
				  }
				  className='example blue-grey darken-4'
				>
				    <h5 className="white-text">Footer Content</h5>
				    <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
				</Footer>;

			</div>
		);
		else return ( 
			<h5 className="truncate"> You are not authenticated to view this page. Change the Home component of the project. 
		</h5> 
		);
	}
}
export default Home;