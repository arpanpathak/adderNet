import React, { Component } from 'react';
import './Main.css';
import $ from 'jquery';
import {Navbar,NavItem,Icon,Button} from 'react-materialize';
import { Route, NavLink, HashRouter } from "react-router-dom";


/* importing components */
import Login from './Login/Login';
import Signup from './Signup/Signup';
import Home from './Home/Home';


/*** this class is the the place where you need to write routes 
     Import all the components and render them wherever you want.
***/
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
      <div>
        <Navbar className="blue-grey">
          <li><NavLink to="/home" >Home</NavLink></li>
          <li><NavLink to="/signup" >SignUp</NavLink></li>
          
          <li><NavLink to='/login'>LOGIN</NavLink></li>
        </Navbar>
        <div className="container" >
        
          <div>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
          </div>
         
        </div>
      </div>

    );
  }

}

export default Main;
