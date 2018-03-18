import {
  ADD_ITEM,
  REMOVE_ITEM,
  PARSE_BUDGET,
  SAVE_CLIENT,
  UPDATE_FIELD
} from '../actions/actionTypes';

const initialState = {
  budget: {
    title: null,
    description: null,
    state: 'writing',
    client: null,
    get total_price() {
      let value = 0;
      this.items.forEach(({ subtotal }) => {
        value += parseInt(subtotal, 10);
      });
      return value;
    },
    items: [
      {
        title: null,
        quantity: 0,
        price: 0,
        get subtotal() {
          return this.quantity * this.price;
        }
      }
    ]
  },
  client: {
    name: null,
    email: null,
    phone: null
  }
}

export default function(state = initialState, action) {
  switch(action.type) {
    case ADD_ITEM:{
      const newState = Object.assign({}, state);
      newState.budget.items.push(action.payload);
      return newState;
    }
    case REMOVE_ITEM:{
      const newState = Object.assign({}, state);
      newState.budget.items.forEach((item, idx) => {
        item === action.payload && newState.budget.items.splice(idx, 1);
      });
      return newState;
    }
    case PARSE_BUDGET: {
      const newState = Object.assign({}, state);
      for (let key in action.payload) {
        if(key !== 'total_price' && key !== 'items') {
          newState.budget[key] = action.payload[key];
        }
        if (key === 'items') {
          const items = action.payload.items;
          const buildItems = item => ({
            title: item.title,
            quantity: item.quantity,
            price: item.price,
            get subtotal() {
              return this.quantity * this.price
            }
          });
          const parseItems = items => items.map(buildItems);
          newState.budget.items = parseItems(items);
        }
      }
      return newState;
    }
    case SAVE_CLIENT:
      return {...state, client: {...state.client, name: action.payload.name, email: action.payload.email, phone: action.payload.phone }}
    case UPDATE_FIELD: {
      const newState = Object.assign({}, state);
      const { field, index, value } = action;
      index !==null ? newState.budget.items[index][field] = value : newState.budget[field] = value;
      return newState;
    }
    default:
      return state;
  }
}