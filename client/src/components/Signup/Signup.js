import React, { Component } from 'react';
import './Signup.css';
import $ from 'jquery';
import { Row,Input,Icon,Button } from 'react-materialize';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstName : 's',
      lastName  : '',
      email     : '',
      password  : '',
      aadharNo  : '',
      phoneNo   : '',
      confirmed: 'check green',
      confirmed_password_matched: false

    };
  }

  componentDidMount() {

  }

  handleChange = (e) => {
    this.setState( { [e.target.id]: e.target.value } );
  }
  handleConfirm = (e) => {
    this.setState({ confirmed_password_matched: e.target.value === this.state.password && e.target.value.trim()!='' });

  }
  handleSubmit = (e) => {
    $.post('/register', this.state ,(res)=> { 

    } );
  }
  render() {
    return (
       <div className='container row box blue-strip' >
           
           <Input s={6} label="First Name"  id='firstName' onChange={ this.handleChange } icon='contacts'><Icon>insert_chart</Icon> </Input>  
           <Input s={6} label="Last Name" id='lastName' onChange={ this.handleChange } icon='contacts'/> 
           <Input type="password" label="password" s={12} icon='lock_open' onChange={ this.handleChange } id='password' />
           <Input type="password" label="Confirm Password" s={12} icon={ this.state.confirmed } onChange={this.handleConfirm}  />
           <Input type="email" label="Email Id" s={12} id='email' onChange={ this.handleChange } icon='email'/>
           <Input type="number" label="Phone No" maxLength={10} id='phoneNo' s={12} onChange={ this.handleChange } icon='local_phone'  />
           <Input type="number" label="AADHAR No" s={12} icon='fingerprint' />
           <Button waves='light' style={{'width': '100%'}} disabled={!this.state.confirmed_password_matched} onClick={ this.handleSubmit }>CREATE ACCOUNT <Icon left>create</Icon> </Button>
       </div>


    );
  }

}

export default Signup;
