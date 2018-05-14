import React, { Component } from 'react';
import './Search.css';

// import './../../assets/css/style.css';
import $ from 'jquery';
import { Row,Col,Input,Icon,Button,Collection, Navbar,CollectionItem, Dropdown,NavItem
         , Collapsible,CollapsibleItem ,Tabs, Tab} from 'react-materialize';
import ReactLoading from 'react-loading';

/*** import your components here ***/
import Messenger from './../Messenger/Messenger';
import Error404 from './../404/404';
import MyPosts from './../MyPosts/MyPosts';
import Timeline from './../Timeline/Timeline';

const Loading = ({ type, color }) => (
    <div style={{paddingTop: 'calc(50vh - 100px)', marginLeft: 'calc(50% - 100px)'}}>
    <ReactLoading type={type} color={color} height={'200px'} width={'200px'} delay={0}/>
    </div>
);


const url = "http://192.168.0.100:5000/uploads/";

/*** end of this import ***/
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
    
  }

  componentDidMount() {


  }
  search=(e)=>{
    $.get('/searchUser',{name: e.target.value},(res)=>this.setState({users: res}));
  }
  render() {
    
    return ( 
       <div >
          <Row className='card blue-grey darken-3' style={{ marginTop: '-5px',padding: '5px 5px 5px 5px'
          }}>
            <Input s={12} type="search" icon='search' placeholder='Type here to search' style={{ marginLeft: '-1px', 
              marginTop: '-1px'}}  onKeyPress={this.search} />
          </Row>
          <div className='card-panel'>
           <h6 className='grey-text text-darken-1'>{this.state.users.length} users found </h6>
           {
            this.state.users.map((user,i)=>
              <div key={`search-box-${i}`} className='friend' style={{ width: '200px',display: 'inline-block',border: '2px solid lightgray',
               padding: '5px 5px 5px 5px',margin: '3px 3px 3px 3px',borderRadius: '50px'}}>
                <img src={user.profilePic? url+user.profilePic: 
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg9bcqOOnchsEiViN-H9qdrKISJtIAWKIqRK_HweHvJx6bjQfA"} 
                className='small-dp' />
                <a href={`/profile/timeline/${user._id}`}><span> { user.name } </span>
                </a>
              </div>
            )
           }
          </div>

       </div>
    );
        
        
  }

}

export default Search;
