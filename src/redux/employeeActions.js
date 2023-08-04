// employeeActions.js
import * as types from '../redux/const';

export const fetchEmployees = () => ({
  type: types.FETCH_EMPLOYEES,
});

export const fetchEmployeedetail = (employeeId) => ({
    type: types.VIEW_EMPLOYEE_DETAIL,
    payload: { id: employeeId }, // Correct the payload format
  });
  
  
export const setEmployees = (employees) => ({
  type: types.SET_EMPLOYEES,
  payload: employees,
});

// Add other actions for edit, delete, view detail, etc.
