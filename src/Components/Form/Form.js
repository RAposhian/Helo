import React, { Component } from 'react';
// import {connect} from 'react-redux';
import axios from 'axios';

class Form extends Component {
   constructor(props){
      super(props);

      this.state = {
         titleInput: '',
         imageInput: '',
         contentInput: ''
      }
   }

   handleInput = e => {
      this.setState({
         [e.target.name]: e.target.value
      })
   }

 

   handleAdd = () => {
      const {titleInput, imageInput, contentInput} = this.state
      axios.post(`/api/posted/`, {title: titleInput, image: imageInput, content: contentInput})
      .then(()=> {
         this.props.history.push('/dashboard');
      })
      .catch(err => console.log(err))
   }

   render(){
      return (
         <div>
            <img src={this.state.imageInput} alt='Post'/>
            <input 
               placeholder='Title' 
               name='titleInput'
               onChange={e => this.handleInput(e)}></input>
            <input 
               placeholder='Image URL'
               name='imageInput' 
               onChange={e => this.handleInput(e)}></input>
            <input 
               placeholder='Post Content' 
               name='contentInput'
               onChange={e => this.handleInput(e)}></input>
            <button onClick={this.handleAdd}>Create Post</button>
         </div>
      )
   }
}

// const mapStateToProps = reduxState => reduxState;

// export default connect(mapStateToProps)(Form);
export default Form;