import React from 'react';

const BudgetListBody = (props) => {
  function getItemAndEdit(item) {
    const authHeader = `Bearer ${localStorage.getItem('token')}`
    !item.phone ? props.getBudget(authHeader, item) : props.getClient(authHeader, item);
  }
  function handleClickDeleteItem(item) {
    props.deleteItem(item, props.data, props.budgetsVisible, `Bearer ${localStorage.getItem('token')}`);
  }
   return (
    <section className="list-body">
      {
        (props.data != null && props.parsedBudgets === null)
        ?
          props.data.map((item, idx) => {
            return (
              <div key={idx} className="md-list-item">
                {Object.keys(item).map(info => {
                  return (
                    (item[info] !== item._id && item[info] !== item.client_id) 
                    ? <div key={info} className={props.budgetsVisible ? "md-budget-info text-white" : "md-client-info text-white"}>{item[info]}</div>
                    : null
                  )                
                })}
                <div className={props.budgetsVisible ? "budget-actions" : "client-actions"}>
                  <i
                    className="material-icons icon btn btn--flat btn--raised btn--small yellow--text text--accent-1"
                    onClick={getItemAndEdit.bind(null, item)}
                  >
                    mode_edit
                  </i>
                  <i
                    className="material-icons icon btn btn--flat btn--raised btn--small red--text text--lighten-1"
                    onClick={handleClickDeleteItem.bind(null,item)}
                  >
                    delete_forever
                  </i>
                </div>
              </div>
            )
          })
        : null
      }
      {
        props.parsedBudgets !== null
        ?
          props.parsedBudgets.map((item, idx) => {
            return (
              <div key={idx} className="md-list-item">
                {Object.keys(item).map(info => {
                  return (
                    (item[info] !== item._id && item[info] !== item.client_id) 
                    ? <div key={info} className={props.budgetsVisible ? "md-budget-info text-white" : "md-client-info text-white"}>{item[info]}</div>
                    : null
                  )                
                })}
                <div className={props.budgetsVisible ? "budget-actions" : "client-actions"}>
                  <i
                    className="material-icons icon btn btn--flat btn--raised btn--small yellow--text text--accent-1"
                    onClick={getItemAndEdit.bind(null, item)}
                  >
                    mode_edit
                  </i>
                  <i
                    className="material-icons icon btn btn--flat btn--raised btn--small red--text text--lighten-1"
                    onClick={handleClickDeleteItem.bind(null,item)}
                  >
                    delete_forever
                  </i>
                </div>
              </div>
            )
          })
        : null
      }
    </section>
   )
}

export default BudgetListBody;