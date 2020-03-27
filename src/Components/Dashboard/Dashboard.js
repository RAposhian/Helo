import React, { Component } from 'react';

class Dashboard extends Component {
   constructor(props){
      super(props);

      this.state = {
         posts: [],
         searchInput: '',
         userPosts: true
      }
   }

   
   
   render(){
      const mappedPosts = this.state.posts.map((e, i) => {
         return (
            <div key={i}>
               <h1>{e.title}</h1>
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
            <button>Reset Search</button>
            <input 
               type='checkbox' 
               onClick={e => this.setState({userPosts: !this.state.userPosts})}/>
               {mappedPosts}
         </div>
      )
   }
}

export default Dashboard;