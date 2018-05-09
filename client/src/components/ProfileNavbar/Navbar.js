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

               },
               error: (e) => alert(e.responseText)
           });
  }
  componentDidMount() {
    console.log(this.state)
  }

  render() {
    return ( 
       <Navbar left className="profile-navbar navbar blue-grey darken-4" brand={<i className="btn-before fab fa-asymmetrik"></i>}>
        <NavItem href='/profile/feed'><div>news feed<Icon left>home</Icon></div></NavItem>
        <NavItem>
         <Messages />
        </NavItem>
         <NavItem><div>Notifications<Icon left>notifications</Icon></div></NavItem>
         <NavItem href='/profile/messenger' ><div>messenger<Icon left>chat_bubble_outline</Icon></div></NavItem>
         <NavItem href='javascript:void(0)' ><div>friend requests<Icon left>thumbs_up_down</Icon></div></NavItem> 
         <NavItem> 
          <CreatePost /> 
         </NavItem>
         <NavItem href='/profile/timeline'><div>my posts<Icon left>home</Icon></div></NavItem>
         <NavItem href='javascript:void(0)' ><div>search<Icon left>search</Icon></div></NavItem> 
         <SideNav
           trigger={<div>more<Icon left>more</Icon></div> }
           options={{ closeOnClick: true }}
           >
           
           <div style={{ color: 'black',textAlign: 'center'}} className='card-panel'> 
            <img src={this.state.dp} className='big-dp' />
            <Col s={6}>{this.state.user.name}</Col>
            <Col s={6}>
            {this.state.user.email}
            </Col>
            
            <input type='file' id='dp-upload-button' onChange={this.changeDp} style={{ display: 'none'}}/>
            <Button type='button' onClick={ ()=>$('#dp-upload-button').click()} s={12}> change dp </Button>
           </div>
           <SideNavItem href='timeline' icon='cloud'>my posts</SideNavItem>
           <SideNavItem href='friends' icon='user'>friends</SideNavItem>
           <SideNavItem divider />
           <SideNavItem subheader>Subheader</SideNavItem>
           <SideNavItem waves href='#!third'>Third Link With Waves</SideNavItem>
         </SideNav>
         <NavItem><div>logout<Icon left>power_settings_new</Icon></div></NavItem> 
       </Navbar>
       
    );
        
        
  }

}

export default Nav;
