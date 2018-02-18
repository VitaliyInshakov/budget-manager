import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';
import SignUpForm from './SignUpForm';

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

  handleSubmitAuthentication(formProps) {
    this.props.authenticate(formProps, '/');
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="container">
        <form className="auth-form">
          <div className="light-blue--text text--lighten-1">
            <i className="material-icons input-group__prepend-icon">account_box</i>
            <Field
              name='username'
              component={this.renderTextField.bind(this)}
              label='Username*'
              />
          </div>
          <div className="light-blue--text text--lighten-1">
            <i className="material-icons input-group__prepend-icon">lock</i>
            <Field
              name='password'
              component={this.renderTextField.bind(this)}
              label='Password*'
              type={this.props.loginPasswordVisible ? 'text' : 'password'}
            />
            <i className="material-icons input-group__append-icon" onClick={this.props.changeloginPasswordVisible}>
              {this.props.loginPasswordVisible ? 'visibility' : 'visibility_off'}
            </i>
          </div>
          <FlatButton
            className="btn--block"
            label="Create account"
            primary={true}
            onClick={this.props.changeSignUpVisible}
          />
          <RaisedButton
            className="btn--block"
            label="Login"
            primary={true}
            onClick={handleSubmit(this.handleSubmitAuthentication.bind(this))}
          />
        </form>
        {
          this.props.signUpVisible
          ? <SignUpForm />
          : null
        }
        <Snackbar
          open={!!this.props.errorMessage}
          message={this.props.errorMessage}
          autoHideDuration={6000}
        />
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
    signUpVisible: state.auth.signUpVisible,
    errorMessage: state.auth.error
  }
}

export default connect(mapStateToProps, actions)(
  reduxForm({
    form: 'authForm',
    validate
  })(Authentication));