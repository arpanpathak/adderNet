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
       
       <div className='row'>
           
           <div className="col s12 l10  row" style={{ 'position': 'fixed','left': '0','height':'100%', border: '2px solid grey'}}>
              <Switch>
               <Route exact path="/profile/feed" render={()=>(<div>create news feed component here</div>)} />
               <Route exact path="/profile/messenger" render={()=>(<div>Messenger Component here</div>)} />
               <Route render={()=><div>Link not found</div>} />
              </Switch>
           </div>
           <div className='col s3 hide-on-med-and-down' style={{ 'position': 'fixed',top: '55px','right': '0','height': 'calc(100vh - 60px)'}}> 
              <div className="card grey lighten-4" style={{ height: '100%',padding:'0 0 0 0'}}>
                <div className="card-panel cyan-text text-lighten-2" 
                     style={{backgroundColor: '#123243'}}>Online Users 
                </div>  
                <ul classNameName="collection">
                   <li className="collection-item avatar">
                     <img src="data:image/jpeg;base64,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" 
                     alt="" className="circle" 
                     style={{ height: '50px', 'width':'50px'}}/>
                     <span className="title">Title</span>
                     <p>First Line <br />
                        Second Line
                     </p>
                     <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
                   </li>
                 </ul>
                <div style={{ position: 'absolute',bottom: '0'}}>
                <Input type="search" className='grey cyan-text lighten-4' icon="search" label="Type here to search" s={12} 
                 style={{ textAlign: 'left',boxSizing: 'border-box'}}/>       
                 </div>
              </div>
           </div>
       </div>
      </div>
    );
        
        
  }

}

export default Profile;
