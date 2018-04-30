/*** use this template code to create new component ***/

import React, { Component } from 'react';
import "./Messenger.css"; // import your css file for this component
import $ from 'jquery';
import { Row,Col,Input,Icon,Button,Collection, Navbar,CollectionItem, Dropdown,NavItem
         , Collapsible,CollapsibleItem ,Tabs, Tab} from 'react-materialize';
import {Redirect,Link,Route,Switch} from 'react-router-dom';

class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      messages: [{from: 'testUser1'},{from: 'testUser2'},{from: 'testUser3'},{from: 'testUser1'},{from: 'testUser2'},{from: 'testUser3'},
          {from: 'testUser1'},{from: 'testUser2'},{from: 'testUser3'},{from: 'testUser1'},{from: 'testUser2'},{from: 'testUser3'}]
      ,
      userMessage: '',
      to: null,
      friends: [],

    };
  }
  componentDidMount() { 
    $('body').css('overflow': 'hidden');
    $.get('/main/getAllFriends',(res)=> this.setState( { friends: res} ) );
  }
  handleChange = (e) => {
    this.setState( { [e.target.id]: e.target.value } );
  }
  sendMessage = (e) => {
    alert(this.state.userMessage);
  }
  userSelected = (e) => {
    console.log(e.target.id);
  }
  render(){ 
  	return(
  		<div className="Messenger row"> 
 			<div className='col s5 l4 z-depth-2 row hide-on-med-and-down' style={{ height: 'calc( 100vh - 60px )',padding: '0 0 0 0'}}>
 				<Row className='card blue-grey darken-3' style={{ marginTop: '-5px',padding: '5px 5px 5px 5px'}}>
        <Input s={12} type="search" icon='search' placeholder='Type here to search' style={{ marginLeft: '-1px', 
        marginTop: '-1px'}}  />
        </Row>
 				<div className="people-container grey lighten-3 col s12" style={{ marginTop: '-12px',height: 'calc(100vh - 170px)', overflow: 'scroll'}}>
 				<Collection>
 					{ this.state.friends.map((friend,i)=> 
            <CollectionItem key={`friend${i}`} onClick={ this.userSelected} className='user-found' id={friend._id}>
              <Row style={{ cursor: 'pointer '}} > 
              <Col s={2}  >
              <img src="https://image.flaticon.com/icons/png/512/23/23228.png" alt="none" className="circle responsive-img" />
              </Col>
              {friend.name}
              </Row>
            </CollectionItem>)
          }
          <CollectionItem >
            <Row style={{ cursor: 'pointer '}} > 
            <Col s={2}  >
            <img src="https://image.flaticon.com/icons/png/512/23/23228.png" alt="none" className="circle responsive-img" />
            </Col>
            UserName
            <span className="badge green-text">Online</span>
            </Row>
          </CollectionItem>
          <CollectionItem className='active'>
            <Row style={{ cursor: 'pointer '}} > 
            <Col s={2}  >
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Edsger_Wybe_Dijkstra.jpg" alt="none" className="circle responsive-img" />
            </Col>
            <Col s={10}>
            computerScienceGOD
            <span className="badge green-text">Online</span>
            </Col>
            </Row>
          </CollectionItem>
 				</Collection>
 				</div>

 			</div>
 			<div className='col l8 s12' style={{ height: 'calc( 100vh - 60px )', overflow: 'hidden',marginTop: '-12px'  }}>
        <Row className='card light-blue darken-3 darken-4 z-depth-1' style={{ padding: '5px 5px 5px 5px'}}>
          <Input s={12} type="search" icon='search' placeholder='Type here to search' style={{ marginLeft: '-1px', 
          marginTop: '-1px'}}  />
        </Row>
 				<div className="people-container grey lighten-3 col s12" style={{ marginTop: '-15px' ,height: 'calc(100vh - 300px)', overflow: 'scroll'}}>
           {
          //  this.state.messages.map((msg,i)=><div key={`profile-message${i}`} className='card messenger-message-to'>This is message{ msg.from}</div>)
          }
          <div className='card messenger-message-to'>This is message</div> 
          <div className='card messenger-message-from'>This is message</div>
          <div className='card messenger-message-to'>This is message</div> 
          <div className='card messenger-message-from'>This is message</div>  
          <div className='card messenger-message-from'>This is message</div> 
          <div className='card messenger-message-to'>This is message</div> 
          <div className='card messenger-message-from'>This is message</div>
          <div className='card messenger-message-to'>This is message</div> 
          <div className='card messenger-message-from'>This is message</div>  
          <div className='card messenger-message-to'>send bob vagina </div> 
          <div className='card messenger-message-from'>
            <Row> 
            <Col s={3}  >
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d9/Edsger_Wybe_Dijkstra.jpg" alt="none" className="circle responsive-img" />
            <span className='chip' style={{ background: '#333', color: '#fff' }}> username
            <br />
            date
            </span>
            </Col>
            <Col s={9}><p>Last Message!!!!!!!! </p> 
              <ul>
              <li> Computer science is no more about computers than astronomy is about telescopes. </li>
              <li>Simplicity is prerequisite for reliability.</li>
              <li>The question of whether a computer can think is no more interesting than the question of whether a submarine can swim.</li>
              </ul>
            </Col>
            </Row>
            
          </div> 
          
        </div>
        <Row className='card-panel' >
          <textarea placeholder='Write here...' className='messenger-message' id='userMessage' onChange={this.handleChange} />
          <Button floating tooltip='upload image' icon='image' className='waves-effect waves-yellow red darken-4 spin' onClick={this.sendImageMessage}></Button>
          <Button floating icon='videocam' className='waves-effect waves-yellow blue-grey darken-4 spin' onClick={this.sendVideoMessage}></Button>
          <Button floating icon='send' className='waves-effect waves-yellow blue darken-2 spin' onClick={this.sendMessage}></Button>
          <span> *ctrl+ enter to send </span>
        </Row> 
 			</div>
  		</div>

  	);
  } 
}

export default Messenger;
