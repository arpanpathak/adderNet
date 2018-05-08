/*** use this template code to create new component ***/

import React, { Component } from 'react';
import "./Timeline.css"; // import your css file for this component
import $ from 'jquery';
import { Row,Input,Icon,Button,Collection, Navbar,CollectionItem, Dropdown,NavItem
         , Collapsible,CollapsibleItem ,Tabs, Tab,Card,CardTitle} from 'react-materialize';
import {Redirect,Link,Route,Switch} from 'react-router-dom';

class Post extends Component {
	constructor(props) {
	  super(props);
	  this.state = { editable: this.props.editable };
	}
	componentDidMount() { 
	}
	deletePost= ()=>{
		$.post('/main/deletePost',{_id: this.props.post._id},(res)=>alert(res.deleted));
	}
	render() {
	return (
		<div className='row timeline-post' 
		 style={{ padding: '0 0 0 0'}}>
			<div className='post-title col-s-12'>
			
			
			<span className='card-panel chip right black white-text'> 
			<img src="https://scontent.fccu3-1.fna.fbcdn.net/v/t1.0-9/30411943_1720444524681460_3667140968219410432_n.jpg?_nc_cat=0&oh=5fe63c9b7ee6d61b02f4ab0ec3ab356f&oe=5B62CB10" alt="none" className="circle small-dp" />
			<span className='chip red darken-3' style={{ color: '#fff' }}> { this.props.post.by}</span>
			<span className='chip blue-grey darken-4 white-text'>{ this.props.post.date.toString() } </span>

			</span>
			<Row>
				<Button className='cyan darken-3 ui-button' icon='create' disabled={this.state.editable}>update</Button>
				<Button className='yellow darken-3 ui-button' icon='delete_forever' onClick={this.deletePost}>delete</Button>
			</Row>
			</div>
			<textarea style={{ width: '100%', height: '110px' ,background: '#14242E',color: '#fff',
			fontFamily: 'roboto',
			 overflow: 'auto',border: 'none', borderRadius: '7px',padding: '10px 10px 10px 10px'}} defaultValue= {this.props.post.content} />
			 <div className='post-buttons card-panel col-s-12' style={{ background: '#14242E'}}>
			 	<span > <Button floating className='light-blue z-depth-3' icon='thumb_up' /> 0 likes </span>
			 	<span ><Button floating className='orange darken-3' icon='thumb_down' /> 0 dislikes</span>
			 	<span ><Button floating className='cyan darken-2' icon='screen_share' /></span>
			 	<span ><Button floating className='blue-grey darken-3 darken-3' icon='comment' /></span>
			 
			 </div>
			 <div className='post-comment-container card-panel col-s-12 row' style={{ background: '#14242E'}}>
			 	<div className='textarea-container' style={{ position: 'relative'}}>
			 		<textarea className='comment-textarea col-s-12'placeholder='Type here to add comment'/>
			 		<Button floating className='red darken-4 ui-button col-s-12 waves-effect' icon='add'
			 		 style={{ position: 'absolute',right: '0', top: '-1px' }}>add comment</Button>
			 	</div>
			 	<div className='card-panel z-depth-4'>

			 	</div>
			 </div>

		</div>
	  )
	}

}
class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [] };
  }
  componentDidMount() { 
  	$.get('/main/getAllPost',{ _id: this.state.id },(res)=>{ this.setState({posts: res}); } );
  }

  render(){
  	return(
  	<div className="Timeline row" >
  	{
  		this.state.posts.reverse().map((post,i)=>
  			<Post key={`post${i}`} post={post} />

  		)
  	  
  	}
  	</div> 
  	);
  }
}

export default Timeline;
