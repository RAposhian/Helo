import React, { Component } from 'react';
import axios from 'axios';
import {connect} from  'react-redux';

class Post extends Component {
  constructor(props) {
     super(props);

     this.state = {
        title: '',
        img: '',
        content: '',
        author: 0,
        authorPicture: ''
     }
  }

  componentDidMount = () => {
     this.handleGetPost()
  }

  handleDelete = () => {
   axios.delete(`/api/post/${this.props.match.params.postid}`)
   .then(() => {
      this.props.history.push('/dashboard')
   })
   .catch(err => console.log(err))
  }


  handleGetPost = () => {
     axios.get(`/api/post/${this.props.match.params.postid}`)
     .then(res => {
        const {title, img, content, author_id, authorPicture} = res.data[0]
        console.log(res.data)
        this.setState({
           title: title,
           img: img,
           content: content,
           author: author_id,
           authorPicture: authorPicture
        })
     })
     .catch(err => console.log(err))
  }
  
   render(){
      console.log(this.state.author)
      // console.log(this.props.match)
      const {title, img, content, author, authorPicture} = this.state;
      return (
         <div>
            <h3>{title}</h3>
            <img src={img} alt={title}/>
            <p>{content}</p>
            {/* <h3>{author}</h3> */}
            <img src={authorPicture} alt={author} />
            {(this.props.user.people_id === +author)
            ?(
               <button onClick={this.handleDelete}>Delete</button>

            )
            : null
            }
         </div>
      )
   }
}

const mapStateToProps = reduxState =>  reduxState;

export default connect(mapStateToProps)(Post);