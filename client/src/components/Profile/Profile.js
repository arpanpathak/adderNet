import React, { Component } from 'react';
import './Profile.css';

// import './../../assets/css/style.css';
import $ from 'jquery';
import { Row,Col,Input,Icon,Button,Collection, Navbar,CollectionItem, Dropdown,NavItem
         , Collapsible,CollapsibleItem ,Tabs, Tab} from 'react-materialize';
import {Redirect,Link,Route,Switch} from 'react-router-dom';
import Nav from './../ProfileNavbar/Navbar';
import ReactLoading from 'react-loading';

/*** import your components here ***/
import Messenger from './../Messenger/Messenger';
import Error404 from './../404/404';
const Loading = ({ type, color }) => (
    <div style={{paddingTop: 'calc(50vh - 100px)', marginLeft: 'calc(50% - 100px)'}}>
    <ReactLoading type={type} color={color} height={'200px'} width={'200px'} delay={0}/>
    </div>
);
/*** end of this import ***/
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      user: null,
      loading: true,
    };
  }

  componentDidMount() {
    $.get( '/authenticated',(res)=>{ 
            this.setState( { authenticated: res.authenticated,user: res.user,loading:false} ); 
          });
  }

  render() {
    if(this.state.loading) return <Loading type='bars' color='crimson' />;
    if(!this.state.authenticated)
      return <div>You are not authorized to view this page <Link to={`/home/login/${window.location.href.split('/').pop()}` } > Click Here</Link> </div> ;
    
    return ( 
       <div >
       <Nav user={this.state.user}/>
       
       <div className='row'>
           
           <div className="col s12 l10 row" style={{ height:'100%',position: 'fixed','left': '0',overflow: 'auto',padding: '10px 10px 10px 10px'}}>
              <Switch>
               <Route path="/profile/feed" render={()=>(<div className='white z-depth-2' style={{ height: '100%'}}> 

                </div>)} />
               <Route exact path="/profile/messenger" component={Messenger} />
               <Route component={Error404} />
              </Switch>
           </div>
           <div className="col l2 hide-on-med-and-down z-depth-2" style={{ marginTop: '5px',position: 'fixed', 'height': '100%',right: '0',padding: '0' }}>
            
            <div className="people-container light-grey lighten-2" style={{ height: 'calc(100vh - 140px)', overflow: 'auto'}}>
              <Row className='card blue-grey darken-3' style={{ marginTop: '-5px',padding: '5px 5px 5px 5px'}}>
                <h6 className='white-text'>Online Users</h6>
              </Row>
              <Collection className='online-users'>
                <CollectionItem  >
                  <Row style={{ cursor: 'pointer '}} > 
                  <Col s={12}  >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Edsger_Wybe_Dijkstra.jpg" alt="none" className="circle prefix-image"  />
                  </Col>
                  computerScienceGOD
                  <span className="badge green-text">Online</span>
                  </Row>
                </CollectionItem>
                <CollectionItem>friend1</CollectionItem>
                <CollectionItem>friend1</CollectionItem>
                <CollectionItem>friend1</CollectionItem>
                <CollectionItem>friend1</CollectionItem>
                <CollectionItem>friend1</CollectionItem>
              </Collection>
            </div>
            <div className='Messenger'>
            <Input type="search" icon="search" style={{ marginLeft: '-10px'}} placeholder="Type here to search"/> 
            </div>
           </div>

       </div>
      </div>
    );
        
        
  }

}

export default Profile;
