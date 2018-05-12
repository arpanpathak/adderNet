/*** use this template code to create new component ***/

import React, { Component } from 'react';
import "./MyPosts.css"; // import your css file for this component
import $ from 'jquery';
import { Col,Row,Input,Icon,Button,Collection, Navbar,CollectionItem, Dropdown,NavItem
         , Collapsible,CollapsibleItem ,Tabs, Tab,Card,CardTitle} from 'react-materialize';
import {Redirect,Link,Route,Switch} from 'react-router-dom';
const url="http://172.21.241.15:5000/uploads/";
class Post extends Component {
	constructor(props) {
	  super(props);
	  this.state = { 
		  	_id: this.props.post._id,
		  	editable: this.props.editable, 
		  	content: this.props.post.content,
		  	likes: this.props.post.likes.length,
		    dislikes: this.props.post.dislikes.length , 
		    comments: this.props.post.comments,
		    commentText: "",
		    hidden: false,
		    liked: this.props.post.likes.indexOf(this.props.user._id) !==-1,
		    disliked: this.props.post.dislikes.indexOf(this.props.user._id) !==-1,
		    dp: this.props.post.by.profilePic? url+this.props.post.by.profilePic:
		     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg9bcqOOnchsEiViN-H9qdrKISJtIAWKIqRK_HweHvJx6bjQfA"
	   };
	  
	  console.log(this.props)
	}
	componentDidMount() { 
		
	}
	setPostContent =(e)=> this.setState({content: e.target.value});
	setComment =(e)=> this.setState({commentText: e.target.value});
	addComment =(e)=>{
		e.target.disabled=true;
		$.post('/main/addComment',{_id: this.state._id,content: this.state.commentText},
			   (res)=>{
			   	console.log(res);
			   	if(res) {
			   		this.setState({ comments :this.state.comments.concat(res) });
			   	}
			   }
		);
	}
	addLike =(e)=>{
		if(this.state.liked) {
			alert('already liked');
			return ;
		}
		$.post('/main/addLike',{_id: this.state._id},(res)=>{
			alert(res.added);
			this.setState({likes: this.state.likes+1});
		});
	}
	addDislike =(e)=>{
		if(this.state.disliked) {
			alert('already disliked');
			return ;
		}
		$.post('/main/addDislike',{_id: this.state._id},(res)=>{
			alert(res.added);
			this.setState({likes: this.state.dislikes+1});
		});
	}

	deletePost =(e)=>{
		if(window.confirm('are you sure want to delete?'))
		$.post('/main/deletePost',{_id: this.props.post._id},(res)=>{
			alert(res.deleted);
			this.setState( { hidden: true });
		});
	}
	updatePost =()=>{
		$.post('/main/updatePost',this.state,(res)=>{ 
			alert(res.updated);
		  } );
	}
	sharePost =()=>{ }

	render() {
	return (
		<div className='row timeline-post col-s-12 row' 
		 style={{ padding: '0 0 0 0', fontSize: '12px',display: this.state.hidden? "none": "block"}}>
			<div className='post-title col-s-12'>
			<img src={this.state.dp} alt="no dp" className="small-dp left"  />
			<span className='chip left grey darken-4' style={{ color: '#fff' }}> #{ this.props.post.by.name}</span>
			<span className='chip grey darken-3 white-text'>{ new Date(this.props.post.date).toString() } </span>
			
			</div>
			<textarea className='post-content-textarea'style={{ width: '100%' ,background: '#14242E',color: '#fff',
			fontFamily: 'roboto',
			 overflow: 'auto',border: 'none', borderRadius: '7px',padding: '10px 10px 10px 10px'}}
			  defaultValue= {this.props.post.content} onChange={ this.setPostContent }/>
			 
			 <img src={`http://192.168.0.100:5000/uploads/${this.props.post.image}`} alt='no image' className='responsive-image'
			  style={{  width: '300px', height: '400px', maxWidth: '100%'}} />
			 { this.props.post.video?
			   <video controls style={{ maxWidth: '500px'}}>
			     <source src={url+this.props.post.video } />
			   </video> : <div> no video</div>}
			 <div className='post-buttons card-panel col-s-12' style={{ background: '#14242E'}}>
			 	<span > <Button floating className={ `z-depth-3 $(this.state.liked? 'red':'')`} icon='thumb_up' 
			 	        onClick={this.addLike} /> {this.state.likes} likes </span>
			 	<span ><Button floating className='orange darken-3' icon='thumb_down' 
			 	        onClick={this.addDislike} /> { this.state.dislikes } dislikes</span>
			 	<Button className='cyan darken-2 ui-button' icon='screen_share' >share</Button>
			 	

			 	<Button className='cyan darken-3 ui-button' icon='create' 
			 			onClick={this.updatePost} >update</Button>
			 	<Button className='yellow darken-3 ui-button' icon='delete_forever' 
			 	   onClick={this.deletePost}>delete</Button>
			 	<div className='textarea-container' style={{ position: 'relative'}}>
			 		<textarea className='comment-textarea col-s-12' placeholder='Type here to add comment'
			 		 onChange={this.setComment }/>
			 		<Button floating className='waves-effect light-blue darken-1 col-s-12 waves-effect' icon='add'
			 		 style={{ position: 'absolute',left: '0', top: '1px', boxShadow: '1px 0 8px black' }}
			 		  onClick={this.addComment}>add comment</Button>
			 	</div>
			 
			 </div>
			 <div className='post-comment-container card-panel col-s-12  row' style={{ background: '#14242E'}}>
			 	<span className='amber-text'> comments..</span>
			 	<div className=' card-panel  comment-section' style={{ maxHeight: '250px', overflow: 'scroll', 
			    background: 'transparent'}}>
			 	 
			 	 {this.state.comments.map((comment,i)=>
			 	 	<Row className='card-panel comment z-depth-3 row timeline-post'> 
			 	 	  
			 	 		<Col s={5} > 

			 	 			<img src={url+comment.by.profilePic}  
			 	 				alt="none" className="circle small-dp" /><br />
			 	 			<span className='white-text' style={{ fontSize: '8px' }}>{ comment.by.name}</span>

			 	 		</Col>
			 	 		<Col s={7}  style={{ display: 'inline'}}>
			 	 			{comment.content}
			 	 		</Col>

			 	 	</Row>
			 	 )}
			 	 
			 	</div>
			 </div>

		</div>
	  )
	}

}
class MyPosts extends Component {
  constructor(props) {
    super(props);
    this.state = { posts: [],user: this.props.user };
  }
  componentDidMount() { 
  	$.get('/main/getAllPost',{ _id: this.state.id },(res)=>{ this.setState({posts: res}); } );
  }

  render(){
  	return(
  	<div className="Timeline row" >
  	{
  		this.state.posts.reverse().map((post,i)=>
  			<Post key={`post${i}`} post={post} editable={ this.props.user._id === post.by }
  			 user={this.state.user}/>

  		)
  	  
  	}
  	</div> 
  	);
  }
}

export default MyPosts;
