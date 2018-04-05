import React, { Component } from 'react';
import './Navbar.css';
// import './../../assets/css/style.css';
import $ from 'jquery';
import { Row,Input,Icon,Button,Navbar,Collection, CollectionItem, Dropdown,NavItem,
         SideNav,SideNavItem,Modal,Textarea } from 'react-materialize';
import {Redirect,Link} from 'react-router-dom';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
     // user dp url.. fetch from server..
      user: this.props.user,
      messages: [{from: 'testUser1'},{from: 'testUser2'},{from: 'testUser3'},{from: 'testUser1'},{from: 'testUser2'},{from: 'testUser3'}]
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
        <NavItem>
          <Modal
            header={ <div><Icon>message</Icon>Your Message</div>}
            trigger={<span><Icon>message</Icon><span className='hide-on-med-and-up'>Messages</span></span>}
            fixedFooter
            style={{ overflow: 'auto' }}>
            <div>
             {
              this.state.messages.map((msg,i)=><div key={`profile-message${i}`} className='card profile-message'>This is message{ msg.from}</div>)
             }
            </div>
          </Modal>
        </NavItem>
         <NavItem tooltip='notifications'><Icon>notifications</Icon></NavItem>
         <NavItem href='/profile/messenger' ><Icon>chat_bubble_outline</Icon></NavItem>
         <NavItem href='/profile/messenger' ><Icon>thumbs_up_down</Icon></NavItem>
         <NavItem>
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
         </NavItem>
       </Navbar>
    );
        
        
  }

}

export default Nav;
