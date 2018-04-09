/*** use this template code to create new component ***/

import React, { Component } from 'react';
import "./style.css"; // import your css file for this component
import $ from 'jquery';
import { Row,Input,Icon,Button,Collection, Navbar,CollectionItem, Dropdown,NavItem
         , Collapsible,CollapsibleItem ,Tabs, Tab} from 'react-materialize';
import {Redirect,Link,Route,Switch} from 'react-router-dom';

class Name extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  componentDidMount() { }

  render = ()=> <div className="your-component-name"> Your component here</div> ;
}

export default Name;
