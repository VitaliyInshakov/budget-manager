import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class Header extends Component {
  handleChangeSelectField(event, index, value) {
    this.props.selectState(value);
  }

  renderSelectList() {
    const statusItem = ['all', 'approved', 'denied', 'waiting', 'writing', 'editing'];
    return (
      <SelectField 
        hintText="Status"
        value={this.props.stateField}
        className={`select-field ${this.props.budgetsVisible ? 'light-blue lighten-1' : 'green lighten-1'}`}
        onChange={this.handleChangeSelectField.bind(this)}
      >
        {
          statusItem.map((item, idx) => {
            return <MenuItem key={idx} value={item} primaryText={item} />
          })
        }
      </SelectField>
    )
  }

  handleSubmitSignout () {
    this.props.signout('/login');
  }
  
  changeSearchField(e) {
    this.props.watchSearch(e.target.value);
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
                defaultValue={this.props.search}
                className={`text--field ${this.props.budgetsVisible ? 'light-blue lighten-1' : 'green lighten-1'}`}
                onChange={this.changeSearchField.bind(this)}              
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
                  onClick={this.handleSubmitSignout.bind(this)}
                />
            </div>
          </div>
        </header>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    stateField: state.home.stateField
  }
}
export default connect(mapStateToProps, actions)(Header);