/*** use this template code to create new component ***/

import React, { Component } from 'react';
import "./Timeline.css"; // import your css file for this component
import $ from 'jquery';
import { Row,Input,Icon,Button,Collection, Navbar,CollectionItem, Dropdown,NavItem
         , Collapsible,CollapsibleItem ,Tabs, Tab,Card,CardTitle} from 'react-materialize';
import {Redirect,Link,Route,Switch} from 'react-router-dom';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }
  componentDidMount() { 
  	$.get('/main/getAllPost',{ id: this.state.id },(res)=>{ this.setState({posts: res}); } );
  }

  render(){
  	return(
  	<div className="Timeline row" >
  	{
  		this.state.posts.reverse().map((post)=>
  			<div className='row timeline-post' 
  			 style={{ padding: '0 0 0 0'}} key={post._id}>
	  			<div className='post-title col-s-12'>
	  			
	  			
	  			<span className='card-panel chip right black white-text'> 
	  			<img src="https://scontent.fccu3-1.fna.fbcdn.net/v/t1.0-9/30411943_1720444524681460_3667140968219410432_n.jpg?_nc_cat=0&oh=5fe63c9b7ee6d61b02f4ab0ec3ab356f&oe=5B62CB10" alt="none" className="circle small-dp" />
	  			<span className='chip red darken-3' style={{ color: '#fff' }}> arpan12356</span>
	  			<span className='chip blue-grey darken-4 white-text'>{ new Date("2018-04-30T20:46:44.789Z").toString() } </span>

	  			</span>
	  			<Button floating className='green darken-2' icon='create'>update</Button>
	  			<Button floating className='red darken-1' icon='delete_forever'>delete</Button>
	  			</div>
	  			<textarea style={{ width: '100%', height: '180px' ,background: '#14242E',color: '#fff',
	  			fontFamily: 'roboto',
	  			 overflow: 'auto',border: 'none', borderRadius: '7px',padding: '10px 10px 10px 10px'}} defaultValue= {post.content} />
	  			 <div className='post-buttons card-panel col-s-12' style={{ background: '#14242E'}}>
	  			 	<span className='chip med-chip'> <Button floating className='light-blue' icon='thumb_up' /> 0 likes </span>
	  			 	<span className='chip med-chip'><Button floating className='orange darken-3' icon='thumb_down' /> 0 dislikes</span>
	  			 	<span className='chip med-chip'><Button floating className='indigo darken-3' icon='screen_share' /> share</span>
	  			 	<span className='chip med-chip'><Button floating className='blue-grey darken-3 darken-3' icon='comment' /> share</span>
	  			 
	  			 </div>

  			</div>

  		)
  	  
  	}
  	</div> 
  	);
  }
}

export default Timeline;
