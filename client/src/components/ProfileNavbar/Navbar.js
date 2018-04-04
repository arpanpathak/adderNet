import React, { Component } from 'react';
import './Navbar.css';
// import './../../assets/css/style.css';
import $ from 'jquery';
// import { Row,Input,Icon,Button,Navbar,Collection, CollectionItem, Dropdown,NavItem,
//          SideNav,SideNavItem } from 'react-materialize';
import {Redirect,Link} from 'react-router-dom';
import { Navbar, NavbarBrand, NavbarNav, NavbarToggler, Collapse, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
     // user dp url.. fetch from server..
      user: this.props.user,
    };
  }

  componentDidMount() {
    console.log(this.state)
  }

  render() {
    return ( 
       <Navbar href="/profile" right className="navbar blue darken-3 z-depth-2" brand={<i className="btn-before fab fa-asymmetrik"></i>}>
          <NavItem onClick={ (e)=> false }>
          
          </NavItem>
       </Navbar>
    );
        
        
  }

}

export default Nav;
