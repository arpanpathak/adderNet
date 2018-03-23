import React, { Component } from 'react';
import './Profile.css';
// import './../../assets/css/style.css';
import $ from 'jquery';
import { Row,Input,Icon,Button,Collection, Navbar,CollectionItem, Dropdown,NavItem
         , Collapsible,CollapsibleItem ,Tabs, Tab} from 'react-materialize';
import {Redirect,Link,Route,Switch} from 'react-router-dom';
import Nav from './../ProfileNavbar/Navbar';
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false
    };
  }

  componentDidMount() {
    $.post( '/authenticated',{ },(res)=>{ this.setState( { authenticated: res.authenticated} ); } );
  }

  render() {
    if(!this.state.authenticated)
      return <div>You are not authorized to view this page <Link to={`/home/login/${window.location.href.split('/').pop()}` } > Click Here</Link> </div> ;
    
    return ( 
      
       <div>
       <Nav />
       <Switch>
        <Route exact path="/profile/feed" render={()=>(<div>create news feed component here</div>)} />
        <Route exact path="/profile/messenger" render={()=>(<div>Messenger Component here</div>)} />
        <Route render={()=><div>Link not found</div>} />
       </Switch>
       <div className='row'>
           
           <div className="col s12 l10  row" style={{ 'position': 'fixed','left': '0','height':'100%'}}>
            
           </div>
           <div className='col s2 hide-on-med-and-down' style={{ 'position': 'fixed','right': '0','height':'100%',boxShadow: '0 0 2px black'}}> 
            <div className="cyan darken-2 white-text" > Online Users </div>
           </div>
       </div>
      </div>
    );
        
        
  }

}

export default Profile;
