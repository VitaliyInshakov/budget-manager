import React from 'react';

const BudgetListBody = (props) => (
  <section className="budget-body">
    {
      props.budgets
      ?
        props.budgets.map(budget => {
          return (
            <div className="md-budget">
              <div classname="md-budget-info text-white ">{budget.client}</div>
              <div classname="md-budget-info text-white ">{budget.title}</div>
              <div classname="md-budget-info text-white ">{budget.state}</div>
              <div className="budget-actions">
                <i className="material-icons btn btn--flat btn--raised btn--small light-blue--text text--lighten-1">visibility</i>
                <i className="material-icons btn btn--flat btn--raised btn--small yellow--text text--accent-1">mode_edit</i>
                <i className="btn btn--flat btn--raised btn--small red--text text--lighten-1">delete_forever</i>
              </div>
            </div>
          )
        })
      : null
    }
  </section>
)

export default BudgetListBody;