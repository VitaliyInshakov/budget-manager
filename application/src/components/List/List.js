import react from 'react';

const BudgetList = (props) => (
  <section className="budget-list-container">
    {props.children}
  </section>
)

export default BudgetList;