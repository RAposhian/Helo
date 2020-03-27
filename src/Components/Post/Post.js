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

  componentDidMount = () => {
     this.handleGetPost()
  }

  handleGetPost = () => {
     axios.get(`/api/post/${this.props.match.params.postid}`)
     .then(res => {
        const {title, img, content, author, authorPicture} = res.data[0]
        this.setState({
           title: title,
           img: img,
           content: content,
           author: author,
           authorPicture: authorPicture
        })
     })
     .catch(err => console.log(err))
  }
  
   render(){
      console.log(this.props.match)
      const {title, img, content, author, authorPicture} = this.state;
      return (
         <div>
            <h3>{title}</h3>
            <img src={img} alt={title}/>
            <p>{content}</p>
            <h3>{author}</h3>
            <img src={authorPicture} alt={author} />
         </div>
      )
   }
}

export default Post;