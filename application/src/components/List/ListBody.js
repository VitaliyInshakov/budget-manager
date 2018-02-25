import React from 'react';

const BudgetListBody = (props) => (
  <section className="list-body">
    {
      props.data
      ?
        props.data.map(item => {
          return (
            <div className="md-list-item">
              {item.info.map(info => {
                return (
                  (info !== item._id) 
                  ? <div classname={props.budgetsVisible ? "md-budget-info text-white" : "md-client-info text-white"}>{info}</div>
                  : null
                )                
              })}
              <div className={props.budgetsVisible ? "budget-actions" : "client-actions"}>
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