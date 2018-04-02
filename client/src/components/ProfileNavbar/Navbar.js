import React, { Component } from 'react';
import './Navbar.css';
// import './../../assets/css/style.css';
import $ from 'jquery';
import { Row,Input,Icon,Button,Navbar,Collection, CollectionItem, Dropdown,NavItem,
         SideNav,SideNavItem } from 'react-materialize';
import {Redirect,Link} from 'react-router-dom';

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
       <Navbar style={{ backgroundColor: '#123243' }} right className="navbar" brand={ <Icon>people</Icon>}>

       <NavItem href="#" style={{  borderRadius: '15px',color: '#fff' }}>
        <Input type="text" className="search" label="Type here to search" s={6} icon="search" 
         style={{ backgroundColor: '#123243',color: '#fff'}} />
       </NavItem>
        <NavItem href="/profile/messenger">
          <i className="fas fa-comments nav-icon"></i> Messenger<span className='blue-grey new badge'>4</span>

        </NavItem>
        
        <Dropdown trigger={
          <NavItem href={null}>
              <i className="fas fa-bell nav-icon"></i> Notifications
          </NavItem>
           } style={{ marginTop: '50px',background: '#fff' }}> 
           <Collection style={{ background: '#fff'}}>
            <CollectionItem><Icon className="noti">notifications_active</Icon> dummy notification </CollectionItem>
           </Collection>
        </Dropdown>
        
        <NavItem href="#">

            <i className="fas fa-handshake nav-icon"></i> Friend Requests 

            
        </NavItem>
         <NavItem href="#">
          <span className="btn-floating btn-large waves-effect waves-light red lighten-1"><Icon>build</Icon></span>
         </NavItem>
        
        <SideNav
          trigger={<a href="#" className="btn-floating btn-large waves-effect waves-light blue-grey"><Icon>face</Icon></a>}
          options={{ closeOnClick: true }}
          >
          <SideNavItem userView
            user={{
              // background: this.state.user.coverPic? this.state.user.coverPic: 'blue',
              // image: this.state.user.profilePic? this.state.user.profilePic: 'none',
              name: 'badassArpan',
              email: this.state.user.email
            }}
          />
          <SideNavItem href='#!icon' icon='art_track'>{ this.state.user.email }</SideNavItem>
          <SideNavItem href='#!second' icon="filter_none">pages</SideNavItem>
          <SideNavItem divider />
          <SideNavItem subheader icon="group">groups</SideNavItem>
          <SideNavItem waves href='#!third' icon="more_horiz">more</SideNavItem>
        </SideNav>
        
       </Navbar>
    );
        
        
  }

}

export default Nav;
