import React, { Component } from  'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import Header from '../Header';
import List from '../List/List';
import ListHeader from '../List/ListHeader';
import ListBody from '../List/ListBody';
import Create from './Create';
import FAB from './FAB';
import Snackbar from 'material-ui/Snackbar';
import store from '../../store/Store.js';
import {
  TOGGLE_VISIBLE_DATA,
  ACTIVE_FAB,
  SHOW_ADD_NEW_BUDGET,
  SHOW_ADD_NEW_CLIENT,
  SHOW_LIST_BUDGETS,
  SHOW_LIST_CLIENTS,
  ERROR
} from '../../actions/actionTypes';

class Home extends Component {
  componentWillMount(){
    const authHeader = `Bearer ${localStorage.getItem('token')}`
    this.props.getAllBudgets(authHeader);
    this.props.getAllClients(authHeader);
  }

  handleChangeSearchField(search) {
    if(search !== null || search !== "") {
      const searchTerm = search.toLowerCase();
      const results = this.props.budgets.filter(budget => budget.client.toString().toLowerCase().indexOf(searchTerm) > -1);
      this.props.changeSearchField(results);
    } else {
      this.props.changeSearchField(null);
    }
  }

  handleSelectState(state) {
    const authHeader = `Bearer ${localStorage.getItem('token')}`
    this.props.changeStateField(state);
    state === 'all' ? this.props.getAllBudgets(authHeader) : this.props.getBudgetsByState(authHeader, state);
  }

  render() {
    return (
      <div className="container container-home">
        <main className="home-page">
          <Header
            budgetsVisible={this.props.budgetsVisible}
            handleToggleVisibleData={() => store.dispatch({ type: TOGGLE_VISIBLE_DATA })}
            selectState={this.handleSelectState.bind(this)}
            search={this.props.search}
            watchSearch={this.handleChangeSearchField.bind(this)}
          />

          <div className="home">
            <h4 className="text-white text-center my-0">
              Focus Budget Manager
            </h4>

            {this.props.listPage && 
              <List>
                <ListHeader
                  headers={this.props.budgetsVisible ? this.props.budgetHeaders : this.props.clientHeaders}
                />
                <ListBody
                  data={this.props.budgetsVisible ? this.props.budgets : this.props.clients}
                  budgetsVisible={this.props.budgetsVisible}
                  search={this.props.search}
                  deleteItem={this.props.deleteItem}
                  getBudget={this.props.getBudget}
                  getClient={this.props.getClient}
                  parsedBudgets={this.props.parsedBudgets}
                />
              </List>
            }
            
            {this.props.createPage &&
              <Create
                budgetCreation={this.props.budgetCreation}
                budgetEdit={this.props.budgetEdit}
                editPage={this.props.editPage}
                clients={this.props.clients}
                selectedBudget={this.props.budget}
                budgetsVisible={this.props.budgetsVisible}
                saveBudget={this.props.saveBudget}
                saveClient={this.props.saveClient}
                fixClientNameAndUpdate={this.props.fixClientNameAndUpdate}
                updateClient={this.props.updateClient}
              />
            }
          </div>
          <Snackbar
            open={!!this.props.errorMessage}
            message={this.props.errorMessage ? this.props.errorMessage : ''}
            autoHideDuration={6000}
            onRequestClose={() => store.dispatch({ type: ERROR, payload: '' })}
          />

          <FAB
            fab={this.props.fab}
            handleClickActionButton={() => store.dispatch({ type: ACTIVE_FAB })}
            handleClickNewBudget={() => store.dispatch({ type: SHOW_ADD_NEW_BUDGET })}
            handleClickNewClient={() => store.dispatch({ type: SHOW_ADD_NEW_CLIENT })}
            handleClickListBudgets={() => store.dispatch({ type: SHOW_LIST_BUDGETS })}
            handleClickListClients={() => store.dispatch({ type: SHOW_LIST_CLIENTS })}
          />
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    parsedBudgets: state.home.parsedBudgets,
    budget: state.home.budget,
    client: state.home.client,
    search: state.home.search,
    budgets: state.home.budgets,
    clients: state.home.clients,
    budgetsVisible: state.home.budgetsVisible,
    budgetHeaders: ['Client', 'Title', 'Status', 'Actions'],
    clientHeaders: ['Client', 'Email', 'Phone', 'Actions'],
    errorMessage: state.home.message,
    fab: state.home.fab,
    listPage: state.home.listPage,
    createPage: state.home.createPage,
    editPage: state.home.editPage,
    budgetCreation: state.home.budgetCreation,
    budgetEdit: state.home.budgetEdit
  }
}
export default connect(mapStateToProps, actions)(Home);