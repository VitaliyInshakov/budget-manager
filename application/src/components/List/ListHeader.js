import React from 'react';

const BudgetListHeader = (props) => (
  <header className="list-header">
    {
      props.headers
      ? props.headers.map(header => {
          return <div key={header} className="text-white md-list-header">{header}</div>
        }
      )
      : null
    }
  </header>
)

export default BudgetListHeader;