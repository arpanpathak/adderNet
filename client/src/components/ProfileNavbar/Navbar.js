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
       <Navbar right className="profile-navbar navbar blue-grey darken-4" brand={<i className="btn-before fab fa-asymmetrik"></i>}>
        <NavItem href='/profile/feed'><Icon>home</Icon></NavItem>
        <NavItem>
         <Messages />
        </NavItem>
         <NavItem><div>Notifications<Icon right>notifications</Icon></div></NavItem>
         <NavItem href='/profile/messenger' ><Icon>chat_bubble_outline</Icon></NavItem>
         <NavItem href='javascript:void(0)' ><Icon>thumbs_up_down</Icon></NavItem> 
         <NavItem> 
          <CreatePost /> 
         </NavItem>
         <NavItem href='/logout'><Icon>power_settings_new</Icon></NavItem> 
       </Navbar>
    );
        
        
  }

}

export default Nav;
