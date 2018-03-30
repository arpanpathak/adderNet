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
       <div className='container row box grey-strip' style={{ 'paddingTop': '20px'}}>

           
           <div className='col l12 s12'>
             <Input s={12} label="Email id or phone no"  id='userid' icon='email' />   
             <Input type='password' s={12} label="password" id='password' icon='lock_open' />
             <Input type='checkbox' s={12} label="keep me logged in" style={{ 'marginLeft': '20px !important'}}/> 
             <Button waves='light' className='right'>LOGIN <Icon left>save</Icon> </Button>
           </div>

      </div>

    );
  }

}

export default Login;
