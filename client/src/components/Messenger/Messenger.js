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
    this.state = { };
  }
  componentDidMount() { }

  render(){ 
  	return(
  		<div className="Messenger row"> 
 			<div className='col s5 l3 z-depth-2 row' style={{ height: 'calc( 100vh - 60px )',padding: '0 0 0 0'}}>
 				<Input s={12} type="search" icon='search' placeholder='Type here to search' style={{marginLeft: '-10px'}} />
 				<div className="people-container grey lighten-4 col s12" style={{ height: 'calc(100vh - 140px)', overflow: 'auto'}}>
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
 			<div className='col l9 s7' style={{ height: 'calc( 100vh - 60px )' }}>
 				lkjkj
 			</div>
  		</div>

  	);
  } 
}

export default Messenger;
