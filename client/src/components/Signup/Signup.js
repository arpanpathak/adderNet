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
      phoneNo   : ''

    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

  }

  handleChange(e) {
    this.setState( { [e.target.id]: e.target.value } );
  }
  render() {
    return (
       <div className='container row'>
           <Input s={6} label="First Name"  id='firstName' onChange={ this.handleChange } ><Icon>insert_chart</Icon> </Input>  
           <Input s={6} label="Last Name" id='lastName' onChange={ this.handleChange } /> 
           <Input type="password" label="password" s={12} />
           <Input type="password" label="Confirm Password" s={12} />
           <Input type="email" label="Email Id" s={12} id='email' onChange={ this.handleChange }/>
           <Input type="number" label="Phone No" id='phoneNo' s={12} onChange={ this.handleChange } />
           <Input type="number" label="AADHAR No" s={12} />
           <Button type="button" style={{'width': '100%'}} className="cyan darken-1">CREATE ACCOUNT</Button>
       </div>


    );
  }

}

export default Signup;
