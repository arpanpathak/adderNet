/*** use this template code to create new component ***/

import React, { Component } from 'react';
import "./Messages.css"; // import your css file for this component
import $ from 'jquery';
import { Row,Input,Icon,Button,Collection, Navbar,CollectionItem, Dropdown,NavItem
         , Collapsible,CollapsibleItem ,Tabs, Tab,Modal} from 'react-materialize';
import {Redirect,Link,Route,Switch} from 'react-router-dom';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      messages: [{from: 'testUser1'},{from: 'testUser2'},{from: 'testUser3'},{from: 'testUser1'},{from: 'testUser2'},{from: 'testUser3'}]
    };
  }
  componentDidMount() { 
    $()
  }

  render(){
  	return(
  		<Modal
  		  header={ <div><Icon>message</Icon>Your Message</div>}
  		  trigger={<div>messages<Icon right>message</Icon></div>}
  		  fixedFooter
  		  style={{ overflow: 'auto' }}>
  		  <div>
  		   {
  		    this.state.messages.map((msg,i)=>
            <div key={`profile-message${i}`} className='card profile-message'>
              This is message { msg.from }
            </div>)
  		   }
  		  </div>
  		</Modal>
  	);
  }
}

export default Messages;
