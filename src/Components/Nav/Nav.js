import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

class Nav extends Component {
   constructor(props) {
      super(props)
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

export default connect(mapStateToProps)(Nav);