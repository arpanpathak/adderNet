/*** use this template code to create new component ***/

import React, { Component } from 'react';
import "./Messenger.css"; // import your css file for this component
import $ from 'jquery';
import { Row,Col,Input,Icon,Button,Collection, Navbar,CollectionItem, Dropdown,NavItem
         , Collapsible,CollapsibleItem ,Tabs, Tab} from 'react-materialize';
import {Redirect,Link,Route,Switch} from 'react-router-dom';
const url="/uploads/",
 default_dp="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg9bcqOOnchsEiViN-H9qdrKISJtIAWKIqRK_HweHvJx6bjQfA";

class Messenger extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      messages: [ ],
      userMessage: '',
      to: null,
      friends: [],
      to_user_name: "",
      loading: false

    };
  }
  componentDidMount() { 
    $('body').css('overflow': 'hidden');
    $.post('/main/getAllFriends',{'_id':this.props.user._id},(res)=> this.setState( { friends: res} ) );

    this.props.socket.on('message-received',(message)=>{
      // if(this.state.to===message.by)
      this.setState({messages: this.state.messages.concat(message)});
      this.scroll();
    });
    this.props.socket.on('sent',(message)=>{
      // if(this.props.user._id===message.by)
      this.setState({messages: this.state.messages.concat(message)});
      this.scroll();
    });
  }
  scroll = () => $('#messenger-message-container').scrollTop($('#messenger-message-container')[0].scrollHeight);

  handleChange = (e) => {
    this.setState( { [e.target.id]: e.target.value } );
  }
  sendMessage = (e) => {
    $.post('/main/sendMessage',{to: this.state.to,data: this.state.userMessage},(res)=> {
      $('#msg-text-msg').attr('value','');
     } );
  }
  sendImageMessage = (e) => {
    var data=new FormData();
    data.append('to',this.state.to);
    data.append('image',e.target.files[0],'image');
    $.ajax({
               type: "POST",
               contentType: false,
               url: "/main/sendMessage",
               data: data,
               processData: false,
               cache: false,
               success:  (res) =>{


               },
               error: (e) => alert(e.responseText)
           });
  }
  sendVideoMessage = (e) => {
    var data=new FormData();
    data.append('to',this.state.to);
    data.append('video',e.target.files[0],'video');
    $.ajax({
               type: "POST",
               contentType: false,
               url: "/main/sendMessage",
               data: data,
               processData: false,
               cache: false,
               success:  (res) =>{


               },
               error: (e) => alert(e.responseText)
           });
  }
  sendVoiceMessage = (e) => {
    var data=new FormData();
    data.append('to',this.state.to);
    data.append('voice',e.target.files[0],'voice');
    $.ajax({
               type: "POST",
               contentType: false,
               url: "/main/sendMessage",
               data: data,
               processData: false,
               cache: false,
               success:  (res) =>{


               },
               error: (e) => alert(e.responseText)
           });
  }
  
  userSelected = (id,name,pic,i,e) => {
      this.setState({to: id,to_user_name: name,to_pic: pic });
      $('.user-found').removeClass('active');
      $('.user-found').eq(i).addClass('active');
      $.post('/main/getConversation',{to: id},(res)=>{ this.setState({messages: res});
          this.scroll();
       });
  }
  searchUser=(e)=>{
    $.get('/searchUser',{name: e.target.value},(res)=>this.setState({friends: res}));
  }
  

  render(){ 
  	return(
  		<div className="Messenger row"> 
 			<div className='col s12 l4 z-depth-2 row hide-on-med-and-down ' style={{ height: 'calc( 100vh - 60px )',padding: '0 0 0 0'}}>
 				<Row className='card blue-grey darken-3' style={{ marginTop: '-5px',padding: '5px 5px 5px 5px'}}>
        <Input s={12} type="search" icon='search' placeholder='Type here to search' style={{ marginLeft: '-1px', 
        marginTop: '-1px'}} onChange={this.searchUser} />
        </Row>
 				<div className="people-container grey lighten-3 col s12" style={{ marginTop: '-12px',height: 'calc(100vh - 170px)', overflow: 'scroll'}}>
 				<Collection>
 					{ this.state.friends.map((friend,i)=> 
            <CollectionItem key={`friend${i}`} onClick={ this.userSelected.bind(this,friend._id,friend.name,friend.profilePic,i) } className='user-found' data-id={friend._id}>
              <Row style={{ cursor: 'pointer ', fontSize: '9px'}}  > 
              <Col s={2}  >
              <img src={ friend.profilePic? url+friend.profilePic: default_dp } alt="none" className="circle responsive-img" />
              </Col>
              {friend.name}
              </Row>
            </CollectionItem>)
          }
        
 				</Collection>
 				</div>

 			</div>
      <div className='col s12 hide-on-med-and-up'>
        <Collapsible>
        <CollapsibleItem header='online friends' icon='record_voice_over'>
        <Collection>
          <Input s={12} type="search" icon='search' placeholder='Type here to search' style={{ marginLeft: '-1px', 
        marginTop: '-1px'}} onChange={this.searchUser} />
        
          { this.state.friends.map((friend,i)=> 
            <CollectionItem key={`friend${i}`} onClick={ this.userSelected.bind(this,friend._id,friend.name,friend.profilePic,i) } className='user-found' data-id={friend._id}>
              <Row style={{ cursor: 'pointer ', fontSize: '9px',color: 'black'}}  > 
              <Col s={2}  >
              <img src={ friend.profilePic? url+friend.profilePic: default_dp } alt="none" className="circle responsive-img" />
              </Col>
              {friend.name}
              </Row>
            </CollectionItem>)
          }
        
        </Collection>
        </CollapsibleItem>
        </Collapsible>

      </div>
 			<div className='col l8 s12' style={{ height: 'calc( 100vh - 60px )', overflow: 'hidden',marginTop: '-12px'  }}>
        
        <Row className='card light-blue darken-3 darken-4 z-depth-1' style={{ padding: '5px 5px 5px 5px'}}>
          {/*
          <Input s={12} type="search" icon='search' placeholder='Type here to search' style={{ marginLeft: '-1px', 
          marginTop: '-1px'}}  />
          */
          }
          <img src={url+this.state.to_pic} className='small-dp' /> <span className='chip'>{this.state.to_user_name}</span>
        </Row>
 				<div className="people-container grey lighten-3 col s12" 
             id="messenger-message-container" style={{ marginTop: '-15px' ,height: 'calc(100vh - 300px)', overflow: 'scroll'}}>
           {
          //  this.state.messages.map((msg,i)=><div key={`profile-message${i}`} className='card messenger-message-to'>This is message{ msg.from}</div>)
          }

          {this.state.messages.map((message,id)=>
            <div className={message.to===this.props.user._id? 'card messenger-message-to':'card messenger-message-from'}>
              <span className='badge chip grey darken-4 white-text' style={{ fontSize: '9px',position: 'absolute', top: '0',right: '0'}}>
                {new Date(message.date).toString()}|{message.to===this.props.user._id?    this.state.to_user_name: this.props.user.name   }
              </span>
              <div className='card-panel' style={{ background: 'transparent',fontSize: '10px', padding: '10px 1px 1px 1px',
              boxShadow: '0 0 0 0',whiteSpace: 'pre-line'}}>
              {message.type==='plain'?message.data:''}
              {message.type==='image'?
                <img src={url+message.data} style={{ height: '300px', width: '300px', maxWidth: '100%'}}/>:
                (
                  message.type==='video' || message.type==='voice'?
                  <video controls style={{ height: '400px', width: '400px', maxWidth: '100%'}}>
                    <source src={url+message.data } />
                  </video> : <span></span>
                )
              }
              
              
              </div> 
            </div>) }
           
          
          
        </div>
        <Row className='card-panel' >
          <textarea placeholder='Write here...' id='msg-text-msg' className='messenger-message' id='userMessage' onChange={this.handleChange} 
          onKeyDown={(e)=>{if(e.key === 'Enter' && e.ctrlKey) this.sendMessage()}}/>
          <input type='file' id='img-msg-upload' capture onChange={this.sendImageMessage} style={{ display: 'none'}}/>
          <input type='file' id='video-msg-upload' capture onChange={this.sendVideoMessage} style={{ display: 'none'}}/>
          <input type='file' id='voice-msg-upload' accept="audio/*" capture='microphone' onChange={this.sendVoiceMessage} style={{ display: 'none'}}/>

          <Button floating data-tooltip='upload image' icon='image' className='waves-effect waves-yellow red darken-4 spin' 
            onClick={()=>$('#img-msg-upload').click()}></Button>
          <Button floating icon='microphone' className='waves-effect waves-yellow blue-grey darken-4 spin' 
              onClick={()=>$('#voice-msg-upload').click()}></Button>
          <Button floating icon='videocam' className='waves-effect waves-yellow blue-grey darken-4 spin' 
              onClick={()=>$('#video-msg-upload').click()}></Button>
          <Button floating icon='send' className='waves-effect waves-yellow blue darken-2 spin' onClick={this.sendMessage}
          ></Button>
          <span> *ctrl+ enter to send </span>
        </Row> 
 			</div>
  		</div>

  	);
  } 
}

export default Messenger;
