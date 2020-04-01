import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {userInfo, resetUser} from '../../redux/reducer'
import axios from 'axios';

class Nav extends Component {
   
   componentDidMount = () => {
      this.handleUserInfo()
      console.log(this.props.username)
   }

   handleUserInfo = () => {
      axios.get('/api/auth/me')
      .then(res => {
         console.log('resdata', res.data)
         this.props.userInfo(res.data)
      })
      .catch(err => console.log(err))
   }

   handleLogout = () => {
      axios.post('/auth/logout')
      .then(() => {
         this.props.resetUser()
      })
      .catch(err => console.log(err))
   }

   render(){
      console.log(this.props)
      return (
         <div>
            <Link to='/dashboard'><button>Home</button></Link>
            <Link to='/new'><button>New Post</button></Link>
            <Link to='/'><button>Logout</button></Link>
            <h1>{this.props.user.username}</h1>
            <img src={this.props.user.profile} alt={this.props.user.username}/>
         </div>
      )
   }
}

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {userInfo, resetUser})(Nav);