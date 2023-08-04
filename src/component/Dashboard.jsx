import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees,fetchEmployeedetail } from '../redux/employeeActions';
import CreateEmployee from "./CreateEmployee"
import Modal from 'react-bootstrap/Modal';
export default function Dashboard() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const detemployees = useSelector((state) => state.employees.employeeDetail);

  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  useEffect(() => {
    dispatch(fetchEmployees(currentPage));
  }, [dispatch, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewDetail = (employee) => {
    setSelectedEmployee(employee);
    console.warn(employee.id);
    dispatch(fetchEmployeedetail(employee.id)).then(() => {
      setSelectedEmployee(detemployees);
      handleShow();
    });
  };

  const handleEdit = (employee) => {
    // Implement edit functionality here
  };

  const handleDelete = (employeeId) => {
    // Implement delete functionality here
  };

  const handleModalClose = () => {
  
    handleClose();
  };

    return (
      <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Gender</th>
            <th>Contact No</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.gender}</td>
              <td>{employee.contactNo}</td>
              <td>{employee.email}</td>
              <td>{employee.status ? 'Active' : 'Inactive'}</td>
              <td>
                <button onClick={() => handleViewDetail(employee)}>View</button>
                <button onClick={() => handleEdit(employee)}>Edit</button>
                <button onClick={() => handleDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        <span>{currentPage}</span>
        <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
      </div>
      <div> <Modal show={show} onHide={handleModalClose} animation={true}>
     < CreateEmployee employee={selectedEmployee} />
   </Modal></div>
    </div>
    
    );
}
