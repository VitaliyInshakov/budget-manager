import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';

const renderTextField = ({input, label,...custom}) => {
  return (
    <TextField
      hintText=""
      floatingLabelText={label}
      className="text--field green lighten-1"
      {...input}
      {...custom}
    />
  )
}

class ClientEdit extends Component {

  handleClickUpdateClient(formProps) {
    const authHeader = `Bearer ${localStorage.getItem('token')}`
    this.props.updateClient(authHeader, formProps);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="client-creation">
        <div className="row">
          <div className="col-12 col-lg-4">
            <Field
              name="name"
              component={renderTextField}
              label="Name*"
            />
          </div>
          <div className="col-12 col-lg-3 offset-lg-1">
            <Field
              name="email"
              component={renderTextField}
              label="Email*"
            />
          </div>
          <div className="col-12 col-lg-3 offset-lg-1">
            <Field
              name="phone"
              component={renderTextField}
              label="Phone*"
            />
          </div>
          <div className="col-12 col-lg-2 offset-lg-10">
            <RaisedButton
              className="md-add-item-btn green lighten-1"
              label="Update"
              primary={true}
              onClick={handleSubmit(this.handleClickUpdateClient.bind(this))}
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    initialValues: state.home.client
  }
}

export default connect(mapStateToProps, actions)(reduxForm({ form: 'ClientEdit' })(ClientEdit));