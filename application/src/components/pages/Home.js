import React, { Component } from  'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';

class Home extends Component {
  componentWillMount(){
    const authHeader = `Bearer ${localStorage.getItem('token')}`
    this.props.getAllUsers(authHeader);
  }

  render() {
    return (
      <div>
        <h3>Hi! this is our App's Home</h3>
        <ul>
          {this.props.users
            ? this.props.users.map(user => {
                return <li key={user.username}>{user.username}</li>
              })
            : null
          }
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    users: state.auth.users
  }
}
export default connect(mapStateToProps, actions)(Home);