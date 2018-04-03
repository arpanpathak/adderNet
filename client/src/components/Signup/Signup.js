import React, { Component } from 'react';
import './Signup.css';
import $ from 'jquery';
import {Link} from 'react-router-dom';
import { Row,Input,Icon,Button,Collection,CollectionItem,Chip} from 'react-materialize';

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstName : '',
      lastName  : '',
      email     : '',
      password  : '',
      aadharNo  : '',
      phoneNo   : '',
      confirmed: 'check green',
      confirmed_password_matched: false,
      success_message: '',
      error: '',
      info: 'github login is not avalaible at this time!',
      loader: false
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
    // add loading icon until we get some response from server...
    this.setState({loader: true,error: ''});
    $.post('/registerUser', this.state ,(res)=> { 
        console.log(res),
        this.setState({ loader: false,error : res.error,success_message: (res.status==="success"?"success": null ) });
    } );
    e.preventDefault();
  }

  handleIncomplete = (e) => {

  }
  render() {
    return (
       <form className='container row box blue-strip' onSubmit ={ this.handleSubmit } >
           <div className="card signup-title" style={{ background: 'lightblue'}}><i className="btn-before fab fa-asymmetrik"></i>SIGN UP to adderNet </div>
           <div className='signup-container-input'>
             <Input required s={6} label="First Name"  id='firstName' onChange={ this.handleChange } icon='contacts'><Icon>insert_chart</Icon> </Input>  
             <Input required s={6} label="Last Name" id='lastName' onChange={ this.handleChange } icon='contacts'/> 
             <Input required minLength={7} type="password" label="password" s={12} icon='lock_open' onChange={ this.handleChange } id='password' />
             <Input required type="password" label="Confirm Password" s={12} icon={ this.state.confirmed } onChange={this.handleConfirm}  />
             <Input required type="email" label="Email Id" s={12} id='email' onChange={ this.handleChange } icon='email'/>
             <Input required type="number" label="Phone No" maxLength={10} id='phoneNo' s={12} onChange={ this.handleChange } icon='local_phone'  />
             <Input type="number" label="AADHAR No" s={12} icon='fingerprint' />
             {this.state.message && (<Chip> { this.state.message }</Chip>) }
             
             {/*  broadcast info ... */}
             
             <Button type='submit' waves='light' style={{'width': '100%'}} disabled={!this.state.confirmed_password_matched}>CREATE ACCOUNT <Icon left>create</Icon> </Button>
            </div>
            <span className='grey-text'>OR You can SignUp with :- </span>
           <Collection>
             <CollectionItem >
              <a className="waves-effect waves-light btn-floating signup-icon red " href="http://localhost:5000/auth/google">
                <i className="fab fa-google"></i> 
              </a>
              <a className="waves-effect waves-light btn-floating signup-icon blue darken-4 " href="http://localhost:5000/auth/facebook">
                <i className="fab fa-facebook"></i> 
              </a>
              <a className="waves-effect waves-light btn-floating signup-icon blue-grey darken-4 " onClick={this.handleIncomplete} >
                <i className="fab fa-github"></i> 
              </a>
              </CollectionItem>
            </Collection>
            { this.state.loader && 
              (<h5 className='cyan-text text-darken-2' style={{paddingLeft: '20px'}}><i className="fas fa-sync fa-spin"></i> Registering....</h5>) 
            }
            { this.state.error && 
              (<div className='col s12 row' style={{ paddingLeft: '20px'}}>
                <div className='error-message col s12' style={{color: '#333'}}>
                 <i className="fas fa-exclamation-triangle"></i> { this.state.error }
                </div>
              </div>) 
            }
            { this.state.success_message && 
              (<div className='col s12 row' style={{ paddingLeft: '20px'}}>
                <div className='success-message col s12' >
                 <i className="far fa-check-circle" style={{color: 'darkgreen'}}></i>
                  Successfully Registered, <Link to='/home/login' >Click here to login </Link> 
                </div>
              </div>) 
            }
            <div className='col s12 row' style={{ paddingLeft: '20px'}}>
              <div className='info-message col s12' style={{color: '#333'}}>
               <i className="fab fa-github"></i> { this.state.info }
              </div>
            </div>

       </form>
    );
  }

}

export default Signup;
