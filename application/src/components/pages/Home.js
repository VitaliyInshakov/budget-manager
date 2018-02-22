import React, { Component } from  'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import Header from '../Header';
import BudgetList from '../Budget/BudgetList';
import BudgetListHeader from '../Budget/BudgetListHeader';
import BudgetListBody from '../Budget/BudgetListBody';

class Home extends Component {
  componentWillMount(){
    const authHeader = `Bearer ${localStorage.getItem('token')}`
    this.props.getAllBudgets(authHeader);
  }

  render() {
    return (
      <div className="container container-home">
        <main className="home-page">
          <Header />

          <div className="home">
            <h4 className="text-white text-center my-0">
              Focus Budget Manager
            </h4>

            <BudgetList>
              <BudgetListHeader />
              <BudgetListBody />
            </BudgetList>
          </div>
        </main>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    budgets: state.budget.budgets
  }
}
export default connect(mapStateToProps, actions)(Home);