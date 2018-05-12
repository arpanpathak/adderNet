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
  setImage = (e) => { 
    this.setState({image: e.target.files[0]});
  }
  setVideo = (e) => { 
    this.setState({video: e.target.files[0]});
  }
  create = (e) => {
    // $.post('/main/createPost', this.state,(res)=>{
    //   alert(res._id);
    // });
    
    var data=new FormData;
  
    data.append('image',this.state.image);
    data.append('video',this.state.video);
    data.append('postContent',this.state.postContent);
    console.log(data);
    $.ajax({
               type: "POST",
               contentType: false,
               url: "/main/createPost",
               data: data,
               processData: false,
               cache: false,
               success:  (res) =>{
                  alert("Post added, post id="+res._id);
                  
               },
               error: (e) => alert(e.responseText)
           });

    // $(e.target).removeAttr('disabled','disabled');
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
        actions={<div> 
          <Button type='button' className='red col-s-4' icon='create' onClick={ this.create }>POST</Button>
          <input type='file' name='image-file' style={{ display: 'none'}} id='image-upload-btn'  accept='image/*' onChange={ this.setImage }/>
          <input type='file' name='video-file' style={{ display: 'none'}} id='video-upload-btn'  accept='video/*' onChange={ this.setVideo }/>
          <Button type='button' className='cyan darken-3 col-s-4' icon='image' onClick={(e)=>$('#image-upload-btn').click() } >upload image</Button>
          <Button type='button' className='blue-gret darken-3 col-s-4' icon='videocam' onClick={(e)=>$('#video-upload-btn').click()}>upload video</Button>
        </div>}
        trigger={<div>create post<Icon left>create</Icon></div>} className='create-post'>
        <Row>
         
         <div>
           <textarea name='postContent' className='create-post-textarea col-s-12' id='postContent' onChange={ this.handleChange }/>
         </div>
        </Row>
      </Modal>
  	);
  }
}

export default CreatePost;
