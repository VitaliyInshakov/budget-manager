import React from 'react';
import BudgetCreation from '../Creation/BudgetCreation';
import ClientCreation from '../Creation/ClientCreation';
import BudgetEdit from '../Creation/BudgetEdit';
import ClientEdit from '../Creation/ClientEdit';

const Create = (props) => (
  <div className="create-page">
    {props.budgetsVisible && !props.editPage && <BudgetCreation {...props} />}
    {!props.budgetsVisible && !props.editPage && <ClientCreation {...props} />}

    {props.budgetEdit && props.editPage && <BudgetEdit {...props} />}

    {!props.budgetEdit && props.editPage && <ClientEdit {...props} />}
  </div>
)

export default Create;