import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../../actions/index';
import { connect } from 'react-redux';
import store from '../../store/Store.js';
import { UPDATE_FIELD } from './../../actions/actionTypes';

const renderSelectList = ({label, items, ...custom}) => (
  <SelectField
    floatingLabelText={label}
    className="select-field light-blue lighten-1"
    {...custom}
  >
    {
      items.map((item, idx) => {
        return <MenuItem key={idx} value={item.name ? item._id : item} primaryText={item.name ? item.name : item} />
      })
    }
  </SelectField>
)

const renderTextField = ({label, rows = 1, prefix='', ...custom}) => {
  return (
    <label className="fieldWrapper">
      {prefix ?
				<span className="prefix">{prefix}</span>
			: null}
      <TextField
        hintText=""
        floatingLabelText={label}
        rows={rows}
        className={`text--field light-blue lighten-1${rows > 1 ? ' text--area' :''}`}
        {...custom}
      />
    </label>
  )
}

class BudgetCreation extends Component {
  handleClickRemoveItem(item) {
    this.props.removeItem(item);
  }
  handleClickSaveBudget(budget) {
    const authHeader = `Bearer ${localStorage.getItem('token')}`
    this.props.saveBudget(authHeader, budget);
  }
  handleChangeField(idx, field, event, index, value) {
    store.dispatch({ type: UPDATE_FIELD, field, index: idx, value: value ? value : index })
  }
  render() {
    return (
      <div className="budget-creation">
        <div className="row">
          <span className="md-budget-state-hint uppercased text-white">status</span>
          <div className="col-12 col-lg-2">
            {renderSelectList({
              label: "Status",
              items: this.props.states,
              floatingLabelFixed: true,
              value: this.props.budget.state,
              onChange: this.handleChangeField.bind(null, null, 'state')
            })}
          </div>
          <div className="col-12 col-lg-9 offset-lg-1">
            {renderSelectList({
              label: "Client",
              items: this.props.clients,
              floatingLabelFixed: false,
              value: this.props.budget.client,
              onChange: this.handleChangeField.bind(null, null, 'client')
            })}
          </div>
          <div className="col-12 col-lg-12">
            {renderTextField({
              label: "Title*",
              defaultValue: this.props.budget.title,
              onChange: this.handleChangeField.bind(null, null, 'title')
            })}
            {renderTextField({
              label: "Description*",
              defaultValue: this.props.budget.description,
              rows: 5,
              multiLine: true,
              onChange: this.handleChangeField.bind(null, null, 'description')
            })}
          </div>

          {this.props.budget.items.map((item, idx) => {
             return (
              <div key={idx} className="row budget-item">
                <div className="col-12 col-lg-1">
                  <RaisedButton
                    className="btn--block red--text"
                    label="Remove"
                    primary={true}
                    onClick={this.handleClickRemoveItem.bind(this, item)}
                  />
                </div>
                <div className="col-12 col-lg-3 offset-lg-1">
                  {renderTextField({
                    label: "Title*",
                    onChange: this.handleChangeField.bind(null, idx, 'title')
                  })}
                </div>
                <div className="col-12 col-lg-1 offset-lg-1">
                  {renderTextField({
                    label: "Price*",
                    prefix: "$",
                    defaultValue: 0,
                    onChange: this.handleChangeField.bind(null, idx, 'price')
                  })}
                </div>
                <div className="col-12 col-lg-2 offset-lg-1">
                  {renderTextField({
                    label: "Quantity*",
                    defaultValue: 0,
                    type: "number",
                    onChange: this.handleChangeField.bind(null, idx, 'quantity')
                  })}
                </div>
                <div className="col-12 col-lg-2">
                  <span className="md-budget-item-subtotal text-white">ITEM PRICE $ {item.subtotal}</span>
                </div>
              </div>
            )
          })}

          <div className="col-12 col-lg-2 offset-lg-10">
            <RaisedButton
              className="md-add-item-btn light-blue lighten-1"
              label="Add Item"
              primary={true}
              onClick={this.props.addItem}
            />
          </div>

          <div className="col-12 col-lg-2 offset-lg-10">
            <span className="md-budget-item-total text-white">TOTAL $ {this.props.budget.total_price}</span>
          </div>

          <div className="col-12 col-lg-2 offset-lg-10">
            <RaisedButton
              className="md-add-item-btn green lighten-1"
              label="Save"
              primary={true}
              onClick={this.handleClickSaveBudget.bind(this, this.props.budget)}
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    budget: state.budget.budget,
    states: ['writing', 'editing', 'pending', 'approved', 'denied', 'waiting']
  }
}

export default connect(mapStateToProps, actions)(BudgetCreation);