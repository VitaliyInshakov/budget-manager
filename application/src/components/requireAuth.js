import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect} from 'react-redux';

export default function(ComposedComponent) {
  class RequireAuthentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    }

    componentWillMount() {
      if(!this.props.authenticated) {
        this.context.router.history.push('/login');
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.authenticated) {
        this.context.router.history.push('/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth.authenticated
    }
  }

  return connect(mapStateToProps)(RequireAuthentication);
}