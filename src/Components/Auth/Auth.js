import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {userInfo} from '../../redux/reducer';

class Auth extends Component {
   constructor(props){
      super(props);

      this.state = {
         username: '',
         password: ''
         // registerView: false
      }
   }

   handleRegister = () => {
      const {username, password} = this.state;
      if (password !== '') {
         axios.post(`/auth/register`, {username: username, password: password})
         .then(res => {
            this.props.userInfo(res.data)
            this.props.history.push('/dashboard')
         })
         .catch(err => console.log(err))
      }
   }

   handleLogin = () => {
      const {username, password} = this.state;
      axios.post(`/auth/login`, {username: username, password: password})
      .then(res => {
         this.props.userInfo(res.data)
         this.props.history.push('/dashboard')
      })
      .catch(err => console.log(err))
   }

   // handleToggle = () => {
   //    this.setState({
   //       registerView: !this.state.registerView
   //    })
   // }

   handleChange = e => {
      this.setState({
         [e.target.name]: e.target.value
      })
   }
   
   render(){
      // console.log(this.props.user)
      // console.log(this.state.password)
      return (
         <div>
            <input 
               placeholder='Username' 
               name='username' 
               onChange={e => this.handleChange(e)}/>
            <input 
               placeholder='Password' 
               name='password'
               onChange={e => this.handleChange(e)}
               type='password'/>
            <button onClick={this.handleLogin}>Login</button>
            <button onClick={this.handleRegister}>Register</button>
         </div>
      )
   }
}


export default connect(null, {userInfo})(Auth);