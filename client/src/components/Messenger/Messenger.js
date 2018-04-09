/*** use this template code to create new component ***/

import React, { Component } from 'react';
import "./Messenger.css"; // import your css file for this component
import $ from 'jquery';
import { Row,Input,Icon,Button,Collection, Navbar,CollectionItem, Dropdown,NavItem
         , Collapsible,CollapsibleItem ,Tabs, Tab} from 'react-materialize';
import {Redirect,Link,Route,Switch} from 'react-router-dom';

class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {  messages: [{from: 'testUser1'},{from: 'testUser2'},{from: 'testUser3'},{from: 'testUser1'},{from: 'testUser2'},{from: 'testUser3'},
    {from: 'testUser1'},{from: 'testUser2'},{from: 'testUser3'},{from: 'testUser1'},{from: 'testUser2'},{from: 'testUser3'}]};
  }
  componentDidMount() { }

  render(){ 
  	return(
  		<div className="Messenger row"> 
 			<div className='col s5 l4 z-depth-2 row' style={{ height: 'calc( 100vh - 60px )',padding: '0 0 0 0'}}>
 				<Row className='card blue-grey darken-3' style={{ marginTop: '-5px',padding: '5px 5px 5px 5px'}}>
        <Input s={12} type="search" icon='search' placeholder='Type here to search' style={{ marginLeft: '-1px', 
        marginTop: '-1px'}}  />
        </Row>
 				<div className="people-container grey lighten-3 col s12" style={{ height: 'calc(100vh - 140px)', overflow: 'auto'}}>
 				<Collection>
 					<CollectionItem> Friend1</CollectionItem>
 					<CollectionItem> Friend1</CollectionItem>
 					<CollectionItem> Friend1</CollectionItem>
 					<CollectionItem> Friend1</CollectionItem>
 					<CollectionItem> Friend1</CollectionItem>
 					<CollectionItem> Friend1</CollectionItem>
 					<CollectionItem> Friend1</CollectionItem>
 					<CollectionItem> Friend1</CollectionItem>
 					<CollectionItem> Friend1</CollectionItem>
 					<CollectionItem> Friend1</CollectionItem>
 					<CollectionItem> Friend1</CollectionItem>
 					<CollectionItem> Friend1</CollectionItem>
 					<CollectionItem> Friend1</CollectionItem>
 					<CollectionItem> Friend1</CollectionItem>
 					<CollectionItem> Friend1</CollectionItem>
 					<CollectionItem> Friend1</CollectionItem>
 					<CollectionItem> Friend1</CollectionItem>
 					<CollectionItem> Friend1</CollectionItem>
 					<CollectionItem> Friend1</CollectionItem>
 					<CollectionItem> Friend1</CollectionItem>
 				</Collection>
 				</div>
 			</div>
 			<div className='col l8 s7' style={{ height: 'calc( 100vh - 60px )', overflow: 'hidden',marginTop: '-12px'  }}>
        <Row className='card indigo darken-4 z-depth-4' style={{ padding: '5px 5px 5px 5px'}}>
          <Input s={12} type="search" icon='search' placeholder='Type here to search' style={{ marginLeft: '-1px', 
          marginTop: '-1px'}}  />
        </Row>
 				<div className='card grey lighten-3 messenger-section ' style={{ height:'auto',overflow: 'scroll',marginTop: '-1px',padding: '10px 10px 10px 10px'}} >
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
          <div className='card messenger-message-from'>This is message</div> 
          <div className='card messenger-message-to'>This is message</div> 
          <div className='card messenger-message-from'>This is message</div>
          <div className='card messenger-message-to'>This is message</div> 
          <div className='card messenger-message-from'>This is message</div>  
          <div className='card messenger-message-from'>This is message</div> 
        </div>
 			</div>
  		</div>

  	);
  } 
}

export default Messenger;
