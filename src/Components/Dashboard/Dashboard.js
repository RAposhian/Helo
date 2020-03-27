import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
   constructor(props){
      super(props);

      this.state = {
         posts: [],
         searchInput: '',
         userPosts: true
      }
   }

   componentDidMount = () => {
      this.getPosts();
   }

   handleSearch = () => {
      const {people_id} = this.props.user;
      let ifTrue = false;
      if (this.state.userPosts === true){
         ifTrue = true;
      }
      axios.get(`/api/posts/${people_id}/?userPosts=${ifTrue}`)
      .then(res => {
         this.setState({
            posts: res.data,
            searchInput: ''
            
         })
      })
   }

   getPosts = () => {
      const {searchInput, userPosts} = this.state;
      const {people_id} = this.props.user;
      

      axios.get(`/api/posts/${people_id}/?userPosts=${userPosts}&searchInput=${searchInput}`)
      .then(res => {
         this.setState({posts: res.data})
         console.log(res.data)
      })
      .catch(err => console.log(err))
   }
   
   render(){
      console.log(this.state.posts)
      const mappedPosts = this.state.posts.map((e, i) => {
         return (
            <div key={i}>
               <Link to={`/post/${e.post_id}`}><h1>{e.title}</h1></Link>
               <h1>{e.author}</h1>
               <img src={e.img} alt={e.title} />
            </div>
         )
      })
      return (
         <div>
            <input 
               placeholder='Search' 
               onChange={e => this.setState({ searchInput: e.target.value})} />
            <button onClick={this.handleSearch}>Reset Search</button>
            <input 
               type='checkbox' 
               onClick={e => this.setState({userPosts: !this.state.userPosts})}/>
               {mappedPosts}
         </div>
      )
   }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Dashboard);