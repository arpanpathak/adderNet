/*** use this template code to create new component ***/

import React, { Component } from 'react';
import "./CreatePost.css"; // import your css file for this component
import $ from 'jquery';
import { Row,Input,Icon,Button,Collection, Navbar,CollectionItem, Dropdown,NavItem
         , Collapsible,CollapsibleItem ,Tabs, Tab,Modal} from 'react-materialize';
import {Redirect,Link,Route,Switch} from 'react-router-dom';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      messages: [{from: 'testUser1'},{from: 'testUser2'},{from: 'testUser3'},{from: 'testUser1'},{from: 'testUser2'},{from: 'testUser3'}]
    };
  }
  componentDidMount() { }

  render(){
  	return(
  		<Modal
        header={ <div><Icon style={{ color: 'crimson' }}>create</Icon>Create Your Post</div>}
        bottomSheet fixedFooter
        trigger={<span><Icon>create</Icon></span>} actions={
         <div>
         <Button className='red' icon='create'>POST</Button>
         <Button className='blue-gret darken-3' icon='videocam'></Button>
          <Button className='cyan darken-3' icon='image'></Button>
         </div>
         }>
        <div>
         <Input type='textarea' />
         
        </div>
      </Modal>
  	);
  }
}

export default CreatePost;
