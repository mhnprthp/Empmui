// employeeReducer.js
import * as types from './const';

const initialState = {
  employees: [],
  employeeDetail: null, 
  loading: false, 
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_EMPLOYEES_START':
      return {
        ...state,
        loading: true, // Set loading to true when the API call starts
      };
    case types.SET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload,
      };
    case 'FETCH_EMPLOYEES_END':
      return {
        ...state,
        loading: false, // Set loading to false when the API call ends
      };


//working code
    // case types.SET_EMPLOYEES:
    //   return {
    //     ...state,
    //     employees: action.payload,
    //   };
    case types.VIEW_EMPLOYEE_DETAIL:
      return {
        ...state,
        employeeDetail: action.payload,
      };
    // case types.CREATE_EMPLOYEE_SUCCESS:
    //   return state;
    case types.CREATE_EMPLOYEE_SUCCESS:
  return {
    ...state,
    employees: [...state.employees, action.payload], 
  };
    case types.EDIT_EMPLOYEE:
      const { id, data } = action.payload;
      return {
        ...state,
        employees: state.employees.map((employee) =>
          employee.id === id ? { ...employee, ...data.employeeDTO } : employee
        ),
      };
      case types.DELETE_EMPLOYEE:
        const employeeIdToDelete = action.payload.id; 
        return {
          ...state,
          employees: state.employees.filter((employee) => employee.id !== employeeIdToDelete),
        };
      
    default:
      return state;
  }
};
