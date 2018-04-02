import React, { Component } from 'react';
import './Login.css';
import $ from 'jquery';
import { Row,Input,Icon,Button,Collection,CollectionItem,Redirect,Chip } from 'react-materialize';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated : props.authenticated,
      successRedirectURL: props.successRedirectURL,
      userid : '',
      password: '',
      keeploggedin: false,
      error: '',
      loader: false,
    };
  }

  componentDidMount() {
    
  }
  handleChange = (e) => {
    this.setState( { [e.target.id]: e.target.value } );
  }
  handleLogin = (e) => {
    this.setState({loader: true}); // add spinner...
    $.post('/login',{userid:this.state.userid,password: this.state.password},(res)=> { 
      console.log(res);
      if(res.error) this.setState({error: res.error});
      else this.setState()
      this.setState({loader: false});
    });

    e.preventDefault(); 
  }
  render() {
  
    return (   
       <form className='Login container row box grey-strip signup-container' style={{ 'paddingTop': '20px'}}
          onSubmit={ this.handleLogin} >
          {/*** Login Container Body ***/ }
          <div className='login-container-body'>
           <div className="card login-title"><i className="btn-before fab fa-asymmetrik"></i>LOGIN to adderNet { this.state.successRedirectURL } </div>
           
           <div className='col l12 s12 row'>
             <Input required s={12} label="Email id or phone no"  id='userid' icon='email'  onChange={ this.handleChange }/>   
             <Input required type='password' s={12} label="password" id='password' icon='lock_open'  onChange={ this.handleChange }/>
             <Input type='checkbox' s={7} label="keep me logged in" id='keeploggedin' style={{ 'marginLeft': '20px !important'}}  onChange={ this.handleChange }/> 
             
             {/* display spinner when logging in */}
             { this.state.loader && 
               (<h5 className='cyan-text text-darken-2 col s12' style={{paddingLeft: '20px'}}><i className="fas fa-sync fa-spin"></i> Signing In....</h5>) 
             }

             {/* display error message if any */ }
             { this.state.error && 
               (<div className='col s12 row' style={{ paddingLeft: '20px'}}>
                 <div className='error-message col s12' style={{color: '#333'}}>
                  <i className="fas fa-exclamation-triangle"></i> { this.state.error }
                 </div>
               </div>) 
             }

             <div className='row col s12'>
              <Button type="submit" className="waves-effect waves-light col s12 btn-login-with blue lighten-1" >
                <i className="signup-icon fab fa-centercode btn-before"></i> <span > LOGIN</span>
              </Button>
              <Collection className='z-depth-4'>
                <button className='btn blue darken-2 btn-login-with' disabled="disabled">OR You can Login using following :-</button>
                <CollectionItem style={{ textAlign: 'center', background: '#F4F6F6'}} >
                 <a className="waves-effect waves-light btn-floating signup-icon red " href="http://localhost:5000/auth/google">
                   <i className="fab fa-google"></i> 
                 </a>
                 <a className="waves-effect waves-light btn-floating signup-icon blue darken-4 " href="http://localhost:5000/auth/facebook">
                   <i className="fab fa-facebook"></i> 
                 </a>
                 <a className="waves-effect waves-light btn-floating signup-icon blue-grey darken-4 " href="http://localhost:5000/auth/facebook">
                   <i className="fab fa-github"></i> 
                 </a>
                 <a className="waves-effect waves-light btn-floating signup-icon blue lighten-2 " href="http://localhost:5000/auth/facebook">
                   <i className="fab fa-twitter"></i> 
                 </a>
                 </CollectionItem>
               </Collection>
             </div>
           </div>
          </div> {/** end of login-container-body**/ }
    
      </form>

    );
  }


}

export default Login;
