import React, { Component } from 'react';
import './Login.css';
import $ from 'jquery';
import { Row,Input,Icon,Button } from 'react-materialize';

class Login extends Component {
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
       <div className='container row box' style={{ 'paddingTop': '20px'}}>
           <div className='col l6 s12'>
           <img src={ require('./../../assets/images/logo.png') } className="responsive-image" style={{ 'maxWidth': '250px' }}/>
           </div>
           <div className='col l6 s12'>
             <Input s={12} label="Email id or phone no"  id='userid' icon='contact_phone' />   
             <Input type='password' s={12} label="password" id='password' icon='lock_open' />
             <Input type='checkbox' s={12} label="keep me logged in" style={{ 'marginLeft': '20px !important'}}/> 
             <Button waves='light' className='right'>LOGIN <Icon left>save</Icon> </Button>
           </div>
          
       </div>

      </div>

    );
  }

}

export default Login;
