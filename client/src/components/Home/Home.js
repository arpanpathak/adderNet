import React, {Component} from 'react';
import './Home.css';
import { Parallax,Card,Slider,Slide,Button,Footer,Row } from 'react-materialize';
import { Link } from 'react-router-dom';
// A stateless react component class

class Home extends Component {

	constructor() {
		super();
		this.state= {
			
		}
	}

	componentDidMount() {
	}

	render() {
		return (
			<Row >
				
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
				    <Link to="/home/signup"><button className='btn orange darken-2'>SIGN UP </button> </Link>
				  </Slide>
				  <Slide title="Experiance real social network">
				    <span className="grey-text text-lighten-1"> No word limit like Twitter, now you can dislike posts, and many more features.... </span> 
				  </Slide>
				  
				  <Slide
				    src="https://www.hdwallpapers.in/walls/music_2-wide.jpg"
				    title="Enjoy Unlimited Music"
				    placement="center">Experience high quality music, all at one place
				    <Link to="/music"></Link>
				  </Slide>
				</Slider>
			
				}
				<div>
				  <Parallax imageSrc="https://www.hdwallpapers.in/walls/music_2-wide.jpg"/>
				  <div className="section white">
				    <div className="row container">
				      <h2 className="header">What is adderNet</h2>
				      <p className="grey-text text-darken-3 lighten-3">
				      An Indian Social Network that connectes people in every aspect.
				      </p>
				    </div>
				  </div>
				  <Parallax imageSrc="http://materializecss.com/images/parallax2.jpg"/>
				</div>
				<Footer style={{ marginBottom: '0'}} copyrights="&copy; 2018 by adderNet"
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
				  className='example black-gradient'
				>
				    <h5 className="white-text">Footer Content</h5>
				    <p className="grey-text text-lighten-4">You can use rows and columns here to organize your footer content.</p>
				</Footer>
			</Row>
		);
	}
}
export default Home;