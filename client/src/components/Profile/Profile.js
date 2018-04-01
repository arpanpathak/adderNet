import React, { Component } from 'react';
import './Profile.css';

// import './../../assets/css/style.css';
import $ from 'jquery';
import { Row,Input,Icon,Button,Collection, Navbar,CollectionItem, Dropdown,NavItem
         , Collapsible,CollapsibleItem ,Tabs, Tab} from 'react-materialize';
import {Redirect,Link,Route,Switch} from 'react-router-dom';
import Nav from './../ProfileNavbar/Navbar';

/*** import your components here ***/
import Messenger from './../Messenger/Messenger';
/*** end of this import ***/
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false
    };
  }

  componentDidMount() {
    $.get( '/authenticated',(res)=>{ this.setState( { authenticated: res.authenticated} ); } );
  }

  render() {
    if(!this.state.authenticated)
      return <div>You are not authorized to view this page <Link to={`/home/login/${window.location.href.split('/').pop()}` } > Click Here</Link> </div> ;
    
    return ( 
      
       <div>
       <Nav />
       
       <div className='row'>
           
           <div className="col s12 l10  row" style={{ height:'100%'}}>
              <Switch>
               <Route exact path="/profile/feed" render={()=>(<div>create news feed component here</div>)} />
               <Route exact path="/profile/messenger" component={Messenger} />
               <Route render={()=><div>Link not found</div>} />
              </Switch>
           </div>
           <div className="col l2 hide-on-med-and-down z-depth-2" style={{ position: 'fixed', 'height': '100%',right: '0',padding: '0' }}>
            
            <div className="people-container light-grey lighten-2" style={{ height: 'calc(100vh - 140px)', overflow: 'auto'}}>
              <Collection>
                <CollectionItem>friend1</CollectionItem>
                <CollectionItem>friend1</CollectionItem>
                <CollectionItem>friend1</CollectionItem>
                <CollectionItem>friend1</CollectionItem>
                <CollectionItem>friend1</CollectionItem>
                <CollectionItem>friend1</CollectionItem>
              </Collection>
            </div>
            <Input type="search" icon="search" style={{ marginLeft: '-10px', width: '100%'}} placeholder="Type here to search"/> 
           </div>

       </div>
      </div>
    );
        
        
  }

}

export default Profile;
