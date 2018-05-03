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
      postContent: '',
      image: '',
      video: '',
    };
  }
  componentDidMount() { }
  handleChange = (e) => {
    this.setState( { [e.target.id]: e.target.value } );
  }
  create = (e) => {
    $.post('/main/createPost', this.state,(res)=>{
      alert(res._id);
    })
  }
  handleImageUpload = (e) => {
    let fileSize= e[0].size/(1024*1024);
    alert(`File Size = ${fileSize}MB`);
  }
  render(){
  	return(
  		<Modal
        header={ <div><Icon style={{ color: 'crimson' }}>create</Icon>Create Your Post</div>}
        bottomSheet fixedFooter
        trigger={<div>create post<Icon left>create</Icon></div>} actions={
         <div>
         <Button className='red' icon='create' onClick={ this.create }>POST</Button>
         <Button className='blue-gret darken-3' icon='videocam'>upload video</Button>
         <input type='file' style={{ display: 'none'}} id='image-upload-btn' accept="image" onChange={ (e) => this.handleImageUpload(e.target.files) }/>
         <Button className='cyan darken-3' icon='image' onClick={(e)=>$('#image-upload-btn').click() } >upload image</Button>
         </div>
         } className='create-post'>
        <Row>
         <textarea className='create-post-textarea col-s-12' id='postContent' onChange={ this.handleChange }/>
         
        </Row>
      </Modal>
  	);
  }
}

export default CreatePost;
