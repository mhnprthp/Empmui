// employeeReducer.js
import * as types from './const';

const initialState = {
  employees: [],
  employeeDetail: null, // Add a new property to store the detailed employee data
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };
     case types.VIEW_EMPLOYEE_DETAIL:
      return {
        ...state,
        employeeDetail: action.payload,
      };
    // Add cases for other actions here
    default:
      return state;
  }
};
