// employeeActions.js
import * as types from '../redux/const';

// export const fetchEmployees = () => ({
//   type: types.FETCH_EMPLOYEES,
// });

export const fetchEmployees = (currentPage) => ({
  type: types.FETCH_EMPLOYEES,
  payload: { currentPage },
});



export const fetchEmployeesStart = () => ({
  type: 'FETCH_EMPLOYEES_START',
});

export const fetchEmployeesEnd = () => ({
  type: 'FETCH_EMPLOYEES_END',
});


//working code

// export const fetchEmployees = (currentPage) => ({
//   type: types.FETCH_EMPLOYEES,
//   payload: { currentPage },
// });

export const fetchEmployeedetail = (employeeId) => ({
    type: types.VIEW_EMPLOYEE_DETAIL,
    payload: { id: employeeId }, // Correct the payload format
  });
  
  
export const setEmployees = (employees) => ({
  type: types.SET_EMPLOYEES,
  payload: employees,
});

export const createEmployee = (employeeData) => ({
  type: types.CREATE_EMPLOYEE_SUCCESS,
  payload: employeeData,
});
export const editEmployee = (employeeId, updatedData) => ({
  type: types.EDIT_EMPLOYEE,
  payload: { id: employeeId, data: updatedData },
});

// export const deleteEmployee = (employeeId) =>({
//   type:types.DELETE_EMPLOYEE,
//   payload: employeeId
// })

export const deleteEmployee = (employeeId) => ({
  type: types.DELETE_EMPLOYEE,
  payload: { id: employeeId }, 
});
