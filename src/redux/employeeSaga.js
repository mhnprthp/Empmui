// employeeSaga.js
import { put, takeLatest, call,takeEvery } from 'redux-saga/effects';
import * as types from './const';
import axios from 'axios';
import { fetchEmployeesStart, fetchEmployeesEnd } from './employeeActions';
function* fetchEmployeesSaga(action) {
  try {
    const { currentPage } = action.payload;

    // Dispatch an action to indicate the start of the API call
    yield put(fetchEmployeesStart());

    const response = yield call(() =>
      axios.get(`https://localhost:5001/api/Employee?status=active&page=${currentPage}&pageSize=10`)
    );

    // Dispatch an action to set the employees and indicate the end of the API call
    yield put({ type: types.SET_EMPLOYEES, payload: response.data });
    yield put(fetchEmployeesEnd());
  } catch (error) {
    // Handle error
  }
}
  //working  fetch
// function* fetchEmployeesSaga(action) {
//   try {
//     const { currentPage } = action.payload; // Extract 'currentPage' from action payload
//     const response = yield call(() =>
//       axios.get(`https://localhost:5001/api/Employee?status=active&page=${currentPage}&pageSize=10`)
//     );
//     //console.log(response.data)
//     yield put({ type: types.SET_EMPLOYEES, payload: response.data });
//   } catch (error) {
//     // Handle error
//   }
// }
function* getdetailEmployeeList(action) {
    try {
      const actiondata = action.payload;
     // console.log(actiondata)
      const response = yield axios.get(`https://localhost:5001/api/Employee/${actiondata.id}`);
      const data = response.data;
      //console.log(data)
      yield put({ type: types.VIEW_EMPLOYEE_DETAIL, payload: data }); // Correct the payload key to 'payload'
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  }
  
  // function* createEmployeeSaga(action) {
  //   try {
  //     const { employeeData } = action.payload;
  //     console.log(employeeData)
  //     const response = yield call(() =>
  //       axios.post('https://localhost:5001/api/Employee', employeeData, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       })
  //     );
  //     yield put({ type: types.CREATE_EMPLOYEE_SUCCESS, payload: response.data });
  //   } catch (error) {
  //     console.error('Error creating employee:', error);
  //   }
  // }
  
  function* createEmployeeSaga(action) {
    try {
      const employeeData = action.payload; // Access the data directly from action.payload
      console.log(employeeData);
      const response = yield call(() =>
        axios.post('https://localhost:5001/api/Employee', employeeData, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );
      console.log(response.data)
      yield put({ type: types.CREATE_EMPLOYEE_SUCCESS, payload: response.data });
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  }
  


  // function* editEmployee(action) {
  //   try {
  //    // debugger;
  //     const actiondata = action.payload;
  //     const response = yield axios.put(`https://localhost:5001/api/Employee/${actiondata.id}`, actiondata.data);
  //     console.log(response.data)
  //     yield put({ type:types.SET_EMPLOYEES, data: response.data });
      
  //   } catch (error) {
  //     console.error("Error updating employee:", error);
  //     //toast.error("Error updating employee!");
  //   }
  // }
  
  // function* editEmployee(action) {
  //   try {
  //     const actiondata = action.payload;
  //     const response = yield axios.put(
  //       `https://localhost:5001/api/Employee/${actiondata.id}`,
  //       actiondata.data
  //     );
  //     console.log(response.data);
  //     yield put({ type: types.SET_EMPLOYEES, payload: response.data }); // Use 'payload' instead of 'data'
  //   } catch (error) {
  //     console.error("Error updating employee:", error);
  //     //toast.error("Error updating employee!");
  //   }
  // }

  function* editEmployee(action) {
    try {
      debugger;
      // const actiondata = action.payload;
      // console.Console.log(actiondata)
      const { id, data } = action.payload;
      if (typeof id === 'undefined') {
        console.error("Error: 'id' is undefined in the payload.");
        return;
      }
  
      const response = yield axios.put(
        `https://localhost:5001/api/Employee/${id}`,
        data
      );
     // console.log(response.data);
      yield put({ type: types.EDIT_EMPLOYEE, payload: response.data });
    } catch (error) {
      console.error("Error updating employee:", error);
      //toast.error("Error updating employee!");
    }
  }
  

  // function* deleteEmployee(action) {
  //   try {
  //     const employeeIdToDelete = action.payload;
  //     yield axios.delete(`https://localhost:5001/api/Employee/${employeeIdToDelete}`);
  //    // yield put({ type:types.SET_EMPLOYEES});
  //   } catch (error) {
     
  //    // toast.error("Error Deleting employee!");
  //   }
  // }
  const apiUrl = process.env.REACT_APP_DeleteURL
  
  function* deleteEmployee(action) {
    try {
      const employeeIdToDelete = action.payload.id;
      yield axios.delete(`${apiUrl}${employeeIdToDelete}`);
      yield put({ type: types.FETCH_EMPLOYEES, payload: { currentPage: 1 } });
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  }

  // function* deleteEmployee(action) {
  //   try {
  //     const employeeIdToDelete = action.payload.id;
  //     yield axios.delete(`https://localhost:5001/api/Employee/${employeeIdToDelete}`);
  //     // If the deletion is successful, you can refresh the employee list by fetching it again
  //     yield put({ type: types.FETCH_EMPLOYEES, payload: { currentPage: 1 } });
  //   } catch (error) {
  //     console.error("Error deleting employee:", error);
  //   }
  // }

export default function* EmployeeSaga() {
  yield takeLatest(types.FETCH_EMPLOYEES, fetchEmployeesSaga);
  yield takeLatest(types.VIEW_EMPLOYEE_DETAIL, getdetailEmployeeList);
 // yield takeLatest(types.CREATE_EMPLOYEE_SUCCESS, createEmployeeSaga);
 yield takeEvery(types.CREATE_EMPLOYEE_SUCCESS, createEmployeeSaga);
 yield takeEvery(types.EDIT_EMPLOYEE,editEmployee);
 yield takeEvery(types.DELETE_EMPLOYEE,deleteEmployee);

}
