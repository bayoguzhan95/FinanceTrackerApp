import { ADD_EXPENSE, DELETE_EXPENSE, UPDATE_EXPENSE } from '../action-types/expenses';

export const addExpense = (data) => {
  return {
    type: ADD_EXPENSE,
    data,
  };
};

export const deleteExpense = (data) => {
  return {
    type: DELETE_EXPENSE,
    data,
  };
};

export const updateExpense = (data) => {
  
  return {
    type: UPDATE_EXPENSE,
    data,
  };
};
