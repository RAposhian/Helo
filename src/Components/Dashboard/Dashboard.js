import React, { Component } from 'react';
// import {connect} from 'react-redux';
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
      let ifTrue = false;
      if (this.state.userPosts === true){
         ifTrue = true;
      }
      axios.get(`/api/posts/?userPosts=${ifTrue}&&searchInput=${this.state.searchInput}`)
      .then(res => {
         this.setState({
            posts: res.data,
            searchInput: ''
            
         })
      })
   }

   handleUserPost = () => {
      this.setState({userPosts: !this.state.userPosts})
      // console.log(this.state.userPosts)
   }

   getPosts = () => {
      const {searchInput, userPosts} = this.state;
      
      

      axios.get(`/api/posts/?userPosts=${userPosts}&searchInput=${searchInput}`)
      .then(res => {
         this.setState({posts: res.data})
         // console.log(res.data)
      })
      .catch(err => console.log(err))
   }
   
   render(){
      // console.log(this.state.posts)
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
               onChange={e => this.setState({ searchInput: e.target.value})}
               value={this.state.searchInput} />
            <button onClick={this.handleSearch}>Search</button>
            {/* <button onClick={this.handleSearch}>Reset Search</button> */}
            <span>My Posts</span>
            <input 
               type='checkbox' 
               onClick={this.handleUserPost}
               onChange={this.componentDidMount}/>
               {mappedPosts}
         </div>
      )
   }
}

// const mapStateToProps = reduxState => reduxState;

// export default connect(mapStateToProps)(Dashboard);
export default Dashboard;