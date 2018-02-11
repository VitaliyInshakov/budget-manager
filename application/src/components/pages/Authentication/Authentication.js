import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import AccountBox from 'material-ui/svg-icons/action/account-box';
import Lock from 'material-ui/svg-icons/action/lock';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import IconButton from 'material-ui/IconButton';
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
      <div>
        <form className="auth-form">
          <div>
            <AccountBox />
            <Field
              name='username'
              component={this.renderTextField.bind(this)}
              label='Username'
            />
          </div>
          <div>
            <Lock />
            <Field
              name='password'
              component={this.renderTextField.bind(this)}
              label='Password'
            />
            <IconButton onClick={this.props.changeVisibility}>
              {this.props.toggleVisibility
                ? <Visibility />
                : <VisibilityOff />
              }
            </IconButton>
          </div>
        </form>
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
    toggleVisibility: state.auth.toggleVisibility
  }
}

export default connect(mapStateToProps, actions)(
  reduxForm({
    form: 'authForm',
    validate
  })(Authentication));