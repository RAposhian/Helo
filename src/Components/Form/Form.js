import React, { Component } from 'react';
import {connect} from 'react-redux';

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

   render(){
      return (
         <div>
            <img src={this.state.imageInput} alt='Post Image'/>
            <input 
               placeholder='Title' 
               onchange={e => this.handleInput(e)}></input>
            <input 
               placeholder='Image URL' 
               onchange={e => this.handleInput(e)}></input>
            <input 
               placeholder='Post Content' 
               onchange={e => this.handleInput(e)}></input>
            <button>Create Post</button>
         </div>
      )
   }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(Form);