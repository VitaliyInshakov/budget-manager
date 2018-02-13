import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux';
import * as actions from '../../../actions/index';

class SignUpForm extends Component {
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

  handleSubmitSignUp(formProps) {
    this.props.signup(formProps, '/');
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className="signup-form">
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
            type={this.props.signUpPasswordVisible  ? 'text' : 'password'}
          />
          <i className="material-icons input-group__append-icon" onClick={this.props.changesignUpPasswordVisible}>
            {this.props.signUpPasswordVisible ? 'visibility' : 'visibility_off'}
          </i>
        </div>
        <RaisedButton
          className="btn--block"
          label="Sign Up"
          primary={true}
          onClick={handleSubmit(this.handleSubmitSignUp.bind(this))}
        />
      </form>
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
    signUpPasswordVisible : state.auth.signUpPasswordVisible 
  }
}

export default connect(mapStateToProps, actions)(
  reduxForm({
    form: 'SignUpForm',
    validate
  })(SignUpForm));