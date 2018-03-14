import React, { Component } from 'react';
import './Main.css';
import $ from 'jquery';
import {Navbar,NavItem,Icon,Button} from 'react-materialize';
import { Route, NavLink, HashRouter,Switch } from "react-router-dom";


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
  constructor() {
    super();
    this.state = {

    };

  }

  componentDidMount() {

  }

  render() {
    return (
      <Switch >
        <Route exact path="/profile" component={Profile} />
       
        <div className="home-screen-route">
            <Navbar brand={ logo } fixed left className="blue-grey navbar">
              
              <li><NavLink exact to="/" >Home</NavLink></li>
              <li><NavLink exact to="/signup" >SignUp</NavLink></li>
              
              <li><NavLink exact to='/login'>LOGIN</NavLink></li>

            </Navbar>
            
             <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
             </Switch>
            
        </div> 
        
          
         
       </Switch>

    );
  }

}

export default Main;
