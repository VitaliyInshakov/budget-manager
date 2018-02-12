import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import Lock from 'material-ui/svg-icons/action/lock';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';

class Authentication extends Component {
  renderTextField({input, label, meta: {touched, error}, ...custom}) {
    return (
      <TextField
        hintText=''
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
      />
    )
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container">
        <form className="auth-form">
          <div className="input-group">
            <div className="input-group-prepend">
              <AccountBox />
            </div>
            <Field
              name='username'
              component={this.renderTextField.bind(this)}
              label='Username'
            />
          </div>
          <div className="input-group">
            <div className="input-group-prepend">
              <Lock />
            </div>
            <Field
              name='password'
              component={this.renderTextField.bind(this)}
              label='Password'
            />
             <div className="input-group-append">
              <IconButton onClick={this.props.changeVisibility}>
                {this.props.loginPasswordVisible
                  ? <Visibility />
                  : <VisibilityOff />
                }
              </IconButton>
              </div>
          </div>
          <FlatButton label="Create account" primary={true} onClick={this.props.changeSignUpVisible} />
          <RaisedButton label="Login" primary={true} />
        </form>
        {
          this.props.signUpVisible
          ? 
            null
          : null
        }
      </div>
    )
  }
}

function validate(formProps) {
  const errors = {};
  const requiredFields = ['username', 'password'];

  requiredFields.forEach(field => {
    if(!formProps[field]) {
      errors[field] = 'This field is required';
    }
  })
  return errors;
}

function mapStateToProps(state) {
  return {
    loginPasswordVisible: state.auth.loginPasswordVisible,
    signUpVisible: state.auth.signUpVisible
  }
}

export default connect(mapStateToProps, actions)(
  reduxForm({
    form: 'authForm',
    validate
  })(Authentication));