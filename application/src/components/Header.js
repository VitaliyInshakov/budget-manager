import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Header extends Component {
  renderSelectList() {
    const statusItem = ['All', 'Approved', 'Denied', 'Waiting', 'Writing', 'Editing'];
    return (
      <SelectField hintText="Status" className={`select-field ${this.props.budgetsVisible ? 'light-blue lighten-1' : 'green lighten-1'}`}>
        {
          statusItem.map((item, idx) => {
            return <MenuItem key={idx} value={idx} primaryText={item} />
          })
        }
      </SelectField>
    )
  }

  handleSubmitSignout () {
    this.props.signout('/login');
  }
  
  render() {
    return (
      <div>
        <header className="header-container">
          <div className={`row ${this.props.budgetsVisible ? 'budgets-header' : 'clients-header'}`}>
            <div className="col-12 col-lg-5 light-blue--text text--lighten-1">
              <TextField
                hintText=''
                floatingLabelText="Search"
                className={`text--field ${this.props.budgetsVisible ? 'light-blue lighten-1' : 'green lighten-1'}`}
              />
              <i className="material-icons input-group__append-icon">search</i>
            </div>
            <div className="col-12 offset-lg-1 col-lg-1">
              <RaisedButton
                className={`btn--block ${this.props.budgetsVisible ? 'light-blue lighten-1' : 'green lighten-1'}`}
                label={this.props.budgetsVisible ? "Clients" : "Budgets"}
                primary={true}
                onClick={this.props.handleToggleVisibleData}
              />
            </div>
            <div className="col-12 offset-lg-1 col-lg-2 light-blue--text text--lighten-1">
              
                {this.renderSelectList()}
              
            </div>
            <div className="col-12 offset-lg-1 col-lg-1">
              <RaisedButton
                  className="btn--block red--text"
                  label="Sign out"
                  primary={true}
                  onClick={this.props.signout}
                />
            </div>
          </div>
        </header>
      </div>
    )
  }
}

export default connect(null, actions)(Header);