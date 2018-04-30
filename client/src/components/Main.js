import React, { Component } from 'react';
import './Main.css';
import $ from 'jquery';
import {Navbar,NavItem,Icon,Button} from 'react-materialize';
import { Route, NavLink, HashRouter,Switch,Redirect } from "react-router-dom";


/* importing components */
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Home from './Home/Home';
import Profile from './Profile/Profile';

/*** this class is the the place where you need to write routes 
     Import all the components and render them wherever you want.
***/
const logo=<img src={require('./../assets/images/logo_light.png') } style={{ 'height': '60px'}} />;

class Main extends Component {
  constructor (){
    super();
    this.state = {

      successUrl : "/profile",
      authencicated: false,
      user: null // for music component...
    };
}

  componentDidMount() {
    $.get( '/authenticated',(res)=>{ 
            this.setState( { authenticated: res.authenticated,user: res.user} ); 
      });
  }

  render() {
    return (
    <div>
		    <Route path='/music' component={() => window.location = 
          `http://127.0.0.1:8000/music/?userid=${this.state.user._id},email=${this.state.user.email}`
        }
        />
        <Route path="/profile" component={Profile} />
        <Route exact path="/" render={ ()=><Redirect to="/home" /> } />
        <Route path="/home" render={ ()=>(
            <div>
            <Navbar fixed brand={ <i className="fab fa-asymmetrik"></i>} left className="cyan darken-4 z-depth-1 navbar">
              <li><NavLink exact to="/home" >Home</NavLink></li>
              <li><NavLink exact to="/home/signup" >SignUp</NavLink></li>
              <li><NavLink exact to='/home/login'>LOGIN</NavLink></li>
			        <li><NavLink exact to='/music'>Music</NavLink></li>
            </Navbar>
            
            <Switch style={{ overflow: 'auto'}}>
              <Route exact path="/home" component={Home} />
              <Route exact path="/home/login/:next?" component={Login} authencicated={this.state.authencicated} />
              <Route exact path="/home/signup" component={Signup} />
              <Route><div> 404 page not found </div></Route>
            </Switch>   
            </div>
           ) } />
        
                       
      </div>


    );
  }

}

export default Main;
