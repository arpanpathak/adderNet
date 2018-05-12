/*** use this template code to create new component ***/

import React, { Component } from 'react';
import "./Notifications.css"; // import your css file for this component
import $ from 'jquery';
import { Row,Input,Icon,Button,Collection, Navbar,CollectionItem, Dropdown,NavItem
         , Collapsible,CollapsibleItem ,Tabs, Tab,Modal} from 'react-materialize';
import {Redirect,Link,Route,Switch} from 'react-router-dom';

class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = { notifications: 0 };
  }
  componentDidMount() { }

  render() { 
  	return (
	  	<Modal
	        header={ <div style={{ position: 'fixed',top: '0', fontSize: '11px'}}><Icon style={{ color: 'crimson' }}></Icon>
	        notifications<span className='badge new'>{this.state.notifications} </span></div> }
	        fixedFooter
	       		
	        trigger={<div><span> {this.state.notifications} </span><Icon left>notifications</Icon></div> } className='Notifications'
	     >
	        <Row style={{ overflow: 'scroll' }}>
	         
	        
	        </Row>
	      </Modal>

  	);
  }
}

export default Notifications;
