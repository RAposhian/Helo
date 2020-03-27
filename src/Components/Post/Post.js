import React, { Component } from 'react';
import axios from 'axios';

class Post extends Component {
  constructor(props) {
     super(props);

     this.state = {
        title: '',
        img: '',
        content: '',
        author: '',
        authorPicture: ''
     }
  }

  handleGetPost = () => {
     axios.get(`/api/post/${this.props.match.params.post_id}`)
  }
  
   render(){
      console.log(this.props.match)
      const {title, img, content, author, authorPicture} = this.state;
      return (
         <div>
            <h1>{title}</h1>
            <img src={img} alt={title}/>
            <p>{content}</p>
            <h1>{author}</h1>
            <img src={authorPicture} alt={author} />
         </div>
      )
   }
}

export default Post;