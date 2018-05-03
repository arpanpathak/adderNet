import React, { Component } from 'react';
import './Navbar.css';
// import './../../assets/css/style.css';
import $ from 'jquery';
import { Row,Input,Icon,Button,Navbar,Collection, CollectionItem, Dropdown,NavItem,
         SideNav,SideNavItem,Modal,Textarea } from 'react-materialize';
import {Redirect,Link} from 'react-router-dom';
/** importing navbar common components for all the pages **/
import Messages from './Messages/Messages';
import CreatePost from './CreatePost/CreatePost';

/** end of this section **/
class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
     // user dp url.. fetch from server..
      user: this.props.user,
    };
  }
  handleClick =(e)=> {
    return false;
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
         <NavItem><div>logout<Icon left>power_settings_new</Icon></div></NavItem> 
       </Navbar>
       
    );
        
        
  }

}

export default Nav;
