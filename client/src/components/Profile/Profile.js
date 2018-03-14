import React, { Component } from 'react';
import './Profile.css';
// import './../../assets/css/style.css';
import $ from 'jquery';
import { Row,Input,Icon,Button,Navbar,Collection, CollectionItem } from 'react-materialize';

class Profile extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
       <Navbar left className="blue-grey navbar">
        

       </Navbar>
       <div className='container row' style={{ 'paddingTop': '100px'}}>
           This is profile page
       </div>

      </div>

    );
  }

}

export default Profile;
