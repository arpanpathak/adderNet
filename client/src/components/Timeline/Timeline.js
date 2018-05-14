/*** use this template code to create new component ***/

import React, { Component } from 'react';
import "./Timeline.css"; // import your css file for this component
import $ from 'jquery';
import { Col,Row,Input,Icon,Button,Collection, Navbar,CollectionItem, Dropdown,NavItem
         , Collapsible,CollapsibleItem ,Tabs, Tab,Card,CardTitle} from 'react-materialize';
import {Redirect,Link,Route,Switch} from 'react-router-dom';
import queryString from 'query-string';

const url="/uploads/",
	  default_dp="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg9bcqOOnchsEiViN-H9qdrKISJtIAWKIqRK_HweHvJx6bjQfA";
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
		    shares: this.props.post.shared_by.length,
		    liked: this.props.post.likes.indexOf(this.props.user._id) !==-1,
		    disliked: this.props.post.dislikes.indexOf(this.props.user._id) !==-1,
		    dp: this.props.post.by.profilePic? url+this.props.post.by.profilePic:
		     	default_dp
	   };
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
			this.setState({likes: this.state.likes+1,liked: true});
		});
	}
	addDislike =(e)=>{
		if(this.state.disliked) {
			alert('already disliked');
			return ;
		}
		$.post('/main/addDislike',{_id: this.state._id},(res)=>{
			alert(res.added);
			this.setState({dislikes: this.state.dislikes+1});
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
	sharePost =()=>{ 
		$.post('/main/sharePost',{_id: this.state._id},(res)=>{ 
			alert(res.shared);
		  } );
	}

	render() {
	return (
		<div className='row timeline-post' 
		 style={{ padding: '0 0 0 0', fontSize: '12px',display: this.state.hidden? "none": "block"}}>
			<div className='post-title col-s-12'>
				<img src={this.state.dp} alt="no dp" className="small-dp left"  />

				<a href={`/profile/timeline/${this.props.post.by._id}`} >
				<span className='chip left grey darken-4' style={{ color: '#fff' }}> #{ this.props.post.by.name}</span>
				</a>
				<span className='chip grey darken-3 white-text'>{ new Date(this.props.post.date).toString() } </span>
			
			</div>
			<textarea className='post-content-textarea'style={{ width: '100%' ,background: '#14242E',color: '#fff',
			fontFamily: 'roboto',
			 overflow: 'auto',border: 'none', borderRadius: '7px',padding: '10px 10px 10px 10px'}}
			  defaultValue= {this.props.post.content} onChange={ this.setPostContent }/>
			 
			 <img src={url+this.props.post.image} alt='no image' className='responsive-image'
			  style={{  width: '300px', height: '400px' ,maxWidth: '100%'}} />
			 { this.props.post.video?
			   <video controls style={{ maxWidth: '500px'}}>
			     <source src={url+this.props.post.video } />
			   </video> : <div> no video</div>}
			 <div className='post-buttons card-panel col-s-12' style={{ background: '#14242E'}}>
			 	<span > <Button floating className={ `z-depth-3 $(this.state.liked? 'red':'')`} icon='thumb_up' 
			 	        onClick={this.addLike} /> {this.state.likes} likes </span>
			 	<span ><Button floating className='orange darken-3' icon='thumb_down' 
			 	        onClick={this.addDislike} /> { this.state.dislikes } dislikes,</span>
			 	
			 	<span>{this.state.shares} shares <Button className='cyan darken-2 ui-button' icon='screen_share' 
			 			onClick={this.sharePost}>{}share</Button></span>
			 	

			 	{ this.state.editable ?
			 		<span>
			 			<Button className='cyan darken-3 ui-button' icon='create' 
			 				onClick={this.updatePost} >update</Button> 
			 			<Button className='yellow darken-3 ui-button' icon='delete_forever' 
			 			   onClick={this.deletePost}>delete</Button>
			 		</span>
			 		: <span> </span>
			 	}
			 	
			 	
			 	<div className='textarea-container' style={{ position: 'relative'}}>
			 		<textarea className='comment-textarea col-s-12' placeholder='Type here to add comment'
			 		 onChange={this.setComment }/>
			 		<Button floating className='waves-effect light-blue darken-1 col-s-12 waves-effect' icon='add'
			 		 style={{ position: 'absolute',left: '0', top: '1px', boxShadow: '1px 0 8px black' }}
			 		  onClick={this.addComment}>add comment</Button>
			 	</div>
			 
			 </div>
			 <div className='post-comment-container card-panel col-s-12 row' style={{ background: '#14242E'}}>
			 	
			 	<div className=' card-panel  comment-section' style={{ maxHeight: '250px', overflow: 'scroll', 
			    background: 'transparent'}}>
			 	 
			 	 {this.state.comments.reverse().map((comment,i)=>
			 	 	<Row className='card-panel comment z-depth-3 row timeline-post' key={comment._id}> 
			 	 	  
			 	 		<Col s={5} > 

			 	 			<img src={comment.by.profilePic? url+comment.by.profilePic: 
			 	 				"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg9bcqOOnchsEiViN-H9qdrKISJtIAWKIqRK_HweHvJx6bjQfA"}  
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
    var _id = window.location.href.split("timeline/")[1];
    this.state = { 
    	posts: [],
    	currentUser: this.props.user,
    	_id: _id,
     	user: "",
     	shares: [],
     	friend: false,
     	friends: [],
     	myprofile: this.props.user._id===_id
    };

  }
  componentDidMount() { 
  	$.post('/main/getAllPostById',{ _id: this.state._id },(res)=>{ this.setState({posts: res.reverse()}); } );
  	$.post('/main/getAllSharesById',{ _id: this.state._id },(res)=>{ this.setState({shares: res.reverse()}); } );
  	$.post('/getUserById',{ _id: this.state._id },(user)=>{ 
  		this.setState({user: user}); 
  	
  	} );
  	$.post('/main/getAllFriendsId',{_id: this.props.user._id},(res)=>{
  		console.log(res);
  		if(res.indexOf(this.state._id)!==-1)
  			this.setState({friend: true});
  		
  	});
  	$.post('/main/getAllFriends',{_id: this.state._id},
  		 (res) => this.setState({friends: res})
  	);
  }
  addFriend=()=>{
  	if(!this.state.friend)
  		$.post('/user/addFriend',{_id: this.state._id},(res)=>{
  			alert(res.added);
  			if(res.added)
  				this.setState({friend: true});
  			}
  		);
  }
  render(){
  	
  	return(
  	<div className="Timeline row" >
  	<Card  className='small' style={{ overflow: 'auto'}} header={<CardTitle reveal 
  		image={this.state.user.coverPic? url+this.state.user.coverPic :
      "https://www.rpgfix.com/styles/brivium/ProfileCover/default.jpg"} 
      waves='light'/>}
  	    title={this.state.user ?this.state.user.name: "Not Found"}
  	    reveal={
  	    	<table>
  	    		<tbody>
  	    			
  	    			<tr><td> User Name </td><td> {this.state.user.name} </td></tr>
  	    			<tr><td> Email </td><td> {this.state.user.email} </td></tr>
  	    			<tr><td> Friends </td><td> {this.state.friends.length} </td></tr>
  	    			
  	    			<tr><td> Posts </td><td> {this.state.user.posts? this.state.user.posts.length: 0} </td></tr>		
  	    			<tr><td> Account created on </td><td> {new Date(this.state.user.date_created).toString()} </td></tr>
  	    		</tbody>
  	    	</table>
  	    }>
  	    <div>
  	    	<img src={this.state.user.profilePic? url+this.state.user.profilePic : 
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg9bcqOOnchsEiViN-H9qdrKISJtIAWKIqRK_HweHvJx6bjQfA"}
             className='small-dp' style={{ border: '1px solid grey'}} />
             {!this.state.friend? <Button className='neg-margin blue darken-3 ui-button' icon='add' 
                                  disabled={this.state.myprofile} onClick={this.addFriend}>FOLLOW</Button>:
         						 <Button className='neg-margin red darken-3 ui-button' icon='delete'>UNFOLLOW</Button>
         	 }
  	    </div>
  	</Card>
  	<Tabs className='tab-demo z-depth-1' style={{ color: 'darkgrey' }}>
  	    <Tab title="posts" className='timeline-tab'>
  	    {
  	    	this.state.posts.map((post,i)=>
  	    		<Post key={`post${i}`} post={post} editable={ this.props.user._id === post.by._id }
  	    		 user={this.state.user}/>

  	    	)
  	      
  	     }
  	    </Tab>
  	    <Tab title={ `shares(${this.state.shares.length})`} >
  	    {
  	    	this.state.shares.map((post,i)=>
  	    		<Post key={`post-shares-${i}`} post={post} editable={ this.props.user._id ===  post.by._id }
  	    		 user={this.state.user}/>

  	    	)
  	      
  	     }
  	    </Tab>
  	    <Tab title={`friends (${this.state.friends.length})`}>
  	    	<div className='card-panel row' style={{ background: 'transparent',}}>
  	    	{this.state.friends.map((friend,i)=>
  	   
  	    		<div key={`friend-box-${i}`} className='friend' style={{ width: '200px',display: 'inline-block',border: '2px solid #fff',
  	    		 padding: '5px 5px 5px 5px',margin: '3px 3px 3px 3px',borderRadius: '50px'}}>
  	    			<img src={friend.profilePic? url+friend.profilePic: default_dp} className='small-dp' />
  	    			<a href={`/profile/timeline/${friend._id}`}><span> { friend.name } </span>
  	    			</a>
  	    		</div>

  	   

  	    	
  	    	)}
  	    	</div>
  	    </Tab>
  	    <Tab title="videos">
  	    </Tab>
  	</Tabs>
  	
  	</div> 
  	);
  }
}

export default MyPosts;
