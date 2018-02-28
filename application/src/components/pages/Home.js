import React, { Component } from  'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import Header from '../Header';
import List from '../List/List';
import ListHeader from '../List/ListHeader';
import ListBody from '../List/ListBody';
import FAB from './FAB';
import Snackbar from 'material-ui/Snackbar';
import store from '../../store/Store.js';
import { TOGGLE_VISIBLE_DATA, ACTIVE_FAB } from '../../actions/actionTypes';

class Home extends Component {
  componentWillMount(){
    const authHeader = `Bearer ${localStorage.getItem('token')}`
    this.props.getAllBudgets(authHeader);
    this.props.getAllClients(authHeader);
  }

  render() {
    return (
      <div className="container container-home">
        <main className="home-page">
          <Header
            budgetsVisible={this.props.budgetsVisible}
            handleToggleVisibleData={() => store.dispatch({ type: TOGGLE_VISIBLE_DATA })}
          />

          <div className="home">
            <h4 className="text-white text-center my-0">
              Focus Budget Manager
            </h4>

            <List>
              <ListHeader
                headers={this.props.budgetsVisible ? this.props.budgetHeaders : this.props.clientHeaders}
              />
              <ListBody
                data={this.props.budgetsVisible ? this.props.budgets : this.props.clients}
                budgetsVisible={this.props.budgetsVisible}
              />
            </List>
          </div>

          <Snackbar
            open={!!this.props.errorMessage}
            message={this.props.errorMessage ? this.props.errorMessage : ''}
            autoHideDuration={6000}
          />

          <FAB
            fab={this.props.fab}
            handleClickActionButton={() => store.dispatch({ type: ACTIVE_FAB })}
          />
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.budget.error,
    budgets: state.budget.budgets,
    clients: state.budget.clients,
    budgetsVisible: !state.budget.budgetsVisible,
    fab: state.budget.fab,
    budgetHeaders: ['Client', 'Title', 'Status', 'Actions'],
    clientHeaders: ['Client', 'Email', 'Phone', 'Actions']
  }
}
export default connect(mapStateToProps, actions)(Home);