// employeeSaga.js
import { put, takeLatest, call } from 'redux-saga/effects';
import * as types from './const';
import axios from 'axios';

function* fetchEmployeesSaga() {
  try {
    const response = yield call(() =>
      axios.get('https://localhost:5001/api/Employee?status=active&page=1&pageSize=10')
    );
    yield put({ type: types.SET_EMPLOYEES, payload: response.data });
  } catch (error) {
    // Handle error
  }
}
function* getdetailEmployeeList(action) {
    try {
      const actiondata = action.payload;
      console.log(actiondata)
      const response = yield axios.get(`https://localhost:5001/api/Employee/${actiondata.id}`);
      const data = response.data;
      console.log(data)
      yield put({ type: types.VIEW_EMPLOYEE_DETAIL, payload: data }); // Correct the payload key to 'payload'
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  }
  
  


export default function* EmployeeSaga() {
  yield takeLatest(types.FETCH_EMPLOYEES, fetchEmployeesSaga);
  yield takeLatest(types.VIEW_EMPLOYEE_DETAIL, getdetailEmployeeList);
}
