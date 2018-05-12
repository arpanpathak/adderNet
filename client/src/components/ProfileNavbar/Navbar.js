import React, { Component } from 'react';
import './Navbar.css';
// import './../../assets/css/style.css';
import $ from 'jquery';
import { Col,Row,Input,Icon,Button,Navbar,Collection, CollectionItem, Dropdown,NavItem,
         SideNav,SideNavItem,Modal,Textarea } from 'react-materialize';
import {Redirect,Link} from 'react-router-dom';
/** importing navbar common components for all the pages **/
import Messages from './Messages/Messages';
import CreatePost from './CreatePost/CreatePost';
import Notifications from './Notifications/Notifications';
const url="http://192.168.0.100:5000/uploads/";
/** end of this section **/
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
     // user dp url.. fetch from server..
      user: this.props.user,
      dp: this.props.user.profilePic? url+this.props.user.profilePic : 
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg9bcqOOnchsEiViN-H9qdrKISJtIAWKIqRK_HweHvJx6bjQfA",
      coverPic: this.props.user.coverPic? url+this.props.user.coverPic :
      "https://www.rpgfix.com/styles/brivium/ProfileCover/default.jpg",
      image: '',
    };
  }
  handleClick =(e)=> {
    return false;
  }
  changeDp = (e) => { 
    // if(e[0].size/(1024*1024)>20) alert('please chose a file below 20MB'); 
    // this.setState({image: e.target.files[0]});
    var data=new FormData();
    data.append('image',e.target.files[0],'image');
    $.ajax({
               type: "POST",
               contentType: false,
               url: "/user/changeDp",
               data: data,
               processData: false,
               cache: false,
               success:  (res) =>{
                  alert(res.changed? "dp changed": "unable to change dp");
                  this.setState({dp: url+res.profilePic})

               },
               error: (e) => alert(e.responseText)
           });
  }
  changeCoverPic = (e) => { 
    // if(e[0].size/(1024*1024)>20) alert('please chose a file below 20MB'); 
    // this.setState({image: e.target.files[0]});
    var data=new FormData();
    data.append('image',e.target.files[0],'image');
    $.ajax({
               type: "POST",
               contentType: false,
               url: "/user/changeCoverPic",
               data: data,
               processData: false,
               cache: false,
               success:  (res) =>{
                  alert(res.changed? "cover changed": "unable to change dp");
                  this.setState({coverPic: url+res.coverPic})

               },
               error: (e) => alert(e.responseText)
           });
  }
  componentDidMount() {

  }

  render() {
    return ( 
       <Navbar left className="profile-navbar navbar blue-grey darken-4" brand={<i className="btn-before fab fa-asymmetrik"></i>}>
        <NavItem href='/profile/feed'><div>news feed<Icon left>home</Icon></div></NavItem>
        <NavItem>
         <Messages />
        </NavItem>
         <NavItem><Notifications /></NavItem>
         <NavItem href='/profile/messenger' ><div>messenger<Icon left>chat_bubble_outline</Icon></div></NavItem>
         <NavItem href='javascript:void(0)' ><div>friend requests<Icon left>thumbs_up_down</Icon></div></NavItem> 
         <NavItem> 
          <CreatePost /> 
         </NavItem>
         <NavItem href='/profile/myposts'><div>my posts<Icon left>list</Icon></div></NavItem>
         <NavItem href='javascript:void(0)' ><div>search<Icon left>search</Icon></div></NavItem> 
         <SideNav
           trigger={<span><Icon left>more</Icon></span> }
           options={{ closeOnClick: true }}
           >
           <SideNavItem userView
              user={{
                background: this.state.coverPic,
                image: this.state.dp,
                name: this.state.name,
                email: this.state.email
              }}
            />
           <input type='file' id='dp-upload-button' onChange={this.changeDp} style={{ display: 'none'}}/>
           <input type='file' id='coverpic-upload-button' onChange={this.changeCoverPic} style={{ display: 'none'}}/>
           <Button type='button' style={{ fontSize: '9px',wordWrap: 'break-word'}} onClick={ ()=>$('#dp-upload-button').click()}> change dp </Button>
           <Button type='button' className='red lighten-1' style={{ fontSize: '9px',wordWrap: 'break-word'}} onClick={ ()=>$('#coverpic-upload-button').click()}> change coverPic </Button>
            
           <SideNavItem href='/profile/myposts' icon='cloud'>my posts</SideNavItem>
           <SideNavItem href='/profile/friends' icon='user'>friends</SideNavItem>
           <SideNavItem href={`/profile/timeline/${this.props.user._id}`} icon='profile'>My Timeline</SideNavItem>
           <SideNavItem divider />
           <SideNavItem subheader>My groups</SideNavItem>
           <SideNavItem waves href='#!third'>Settings</SideNavItem>
         </SideNav>
         <NavItem href='javascript:void(0)'><div onClick={()=>$.get("/logout") }>logout<Icon left>power_settings_new</Icon></div></NavItem> 
       </Navbar>
       
    );
        
        
  }

}

export default Nav;
