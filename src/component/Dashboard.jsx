import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployees, fetchEmployeedetail } from '../redux/employeeActions';
import CreateEmployee from "./CreateEmployee"
import Modal from 'react-bootstrap/Modal';
import { deleteEmployee } from '../redux/employeeActions';
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import MyIcon from '../icons/circle-info-solid.svg';
import Editicon from '../icons/pen-to-square-solid.svg';
import deleteicon from '../icons/trash-solid.svg';
import Loader from './loader/loader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
export default function Dashboard() {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees.employees);
  const detemployees = useSelector((state) => state.employees.employeeDetail);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showButton, setShowButton] = useState(true);


  // useEffect(() => {
  //   setLoading(true); // Set loading to true before making the API call
  //   dispatch(fetchEmployees(currentPage)).payload(() => {
  //     setLoading(false); // Set loading to false after the API call is completed (whether success or error)
  //   });
  // }, [dispatch, currentPage]);



  useEffect(() => {
    if (employees.length > 0) {
      setLoading(false); // Set loading to false if employees have data
    }
  }, [employees]);


  useEffect(() => {

    dispatch(fetchEmployees(currentPage))
  }, [dispatch, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleViewDetail = (employee) => {
    setSelectedEmployee(employee);
    dispatch(fetchEmployeedetail(employee.id));
    setShowButton(false)
  };

  useEffect(() => {
    if (detemployees) {
      setSelectedEmployee(detemployees);
      handleShow();
    }
  }, [detemployees]);


  const handleEdit = (employee) => {
    setShowButton(true);
    setSelectedEmployee(employee);
    console.warn(employee.id);
    dispatch(fetchEmployeedetail(employee.id));
  };

  const handleDelete = (employeeid) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      dispatch(deleteEmployee(employeeid));
    }

  };

  const handleModalClose = () => {

    handleClose();
  };

  const addEmpDetailbtn = () => {
    setShowButton(true);
    setSelectedEmployee(null);
    handleShow();

  }

  return (
    //   <Container fluid>
    //   <Row>
    //     <Col xs={12}>
    //       <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Employee Details</h1>
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col xs={12}>
    //       <Button variant="primary" onClick={() => addEmpDetailbtn()} style={{ marginBottom: '20px', float: 'right' }}>
    //         Add Employee
    //       </Button>
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col xs={12}>
    //       <table className="table">
    //         <thead>
    //           <tr>
    //             <th>Employee ID</th>
    //             <th>First Name</th>
    //             <th>Last Name</th>
    //             <th>Gender</th>
    //             <th>Contact No</th>
    //             <th>Email</th>
    //             <th>Status</th>
    //             <th>Action</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {employees.map((employee) => (
    //             <tr key={employee.id}>
    //               <td>{employee.id}</td>
    //               <td>{employee.firstName}</td>
    //               <td>{employee.lastName}</td>
    //               <td>{employee.gender}</td>
    //               <td>{employee.contactNo}</td>
    //               <td>{employee.email}</td>
    //               <td>{employee.status ? 'Active' : 'Inactive'}</td>
    //               <td>
    //               <img src={MyIcon} style={{ width:'30px', height:'30px'}} alt="My Icon" onClick={() => handleViewDetail(employee)}    />
    //               <img src={Editicon} style={{ width:'30px', height:'30px'}} alt="My Icon" onClick={() => handleEdit(employee)}    />
    //               <img src={deleteicon} style={{ width:'30px', height:'30px'}} alt="My Icon"  onClick={() => handleDelete(employee.id)}  />
    //                 {/* <Button variant="primary" onClick={() => handleViewDetail(employee)}>View</Button> */}
    //                 {/* <Button variant='secondary' onClick={() => handleEdit(employee)}>Edit</Button>
    //                 <Button variant='danger' onClick={() => handleDelete(employee.id)}>Delete</Button> */}
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col xs={12}>
    //       <div style={{ textAlign: 'center', marginTop: '20px' }}>
    //         <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
    //         <span style={{ margin: '0 10px' }}>{currentPage}</span>
    //         <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
    //       </div>
    //     </Col>
    //   </Row>
    //   <div>
    //     <Modal show={show} onHide={handleModalClose} animation={true}>
    //       <CreateEmployee employee={selectedEmployee} handleClose={handleModalClose} />
    //     </Modal>
    //   </div>
    // </Container>




    <Container fluid>
      <Row>
        <Col xs={12}>
          <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Employee Details</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <Button variant="primary" onClick={() => addEmpDetailbtn()} style={{ marginBottom: '20px', float: 'right' }}>
            Add Employee
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {loading ? (
            <Loader />
          ) : (
            <table className="table">
              <thead>
                <tr>
                  {/* <th>Employee ID</th> */}
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
                    {/* <td>{employee.id}</td> */}
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.gender}</td>
                    <td>{employee.contactNo}</td>
                    <td>{employee.email}</td>
                    <td>{employee.status ? 'Active' : 'Inactive'}</td>
                    <td>
                      <ButtonGroup>
                        <Button variant="light" onClick={() => handleViewDetail(employee)}>
                          <FontAwesomeIcon icon={faEye} size="2x" />
                        </Button>
                        <Button variant="light" onClick={() => handleEdit(employee)}>
                          <FontAwesomeIcon icon={faPenToSquare} size="2x" />
                        </Button>
                        <Button variant="light" onClick={() => handleDelete(employee.id)}>
                          <FontAwesomeIcon icon={faTrash} size="2x" />
                        </Button>
                      </ButtonGroup>
                      {/* <FontAwesomeIcon icon={faEye} size="2x"  className="mr-2" onClick={() => handleViewDetail(employee)} /> */}
                      {/* <img src={MyIcon} style={{ width:'30px', height:'30px'}} alt="My Icon" onClick={() => handleViewDetail(employee)}    /> */}
                      {/* <FontAwesomeIcon icon={faPenToSquare} size="2x" onClick={() => handleEdit(employee)} className="mr-2"   /> */}
                      {/* <img src={Editicon} style={{ width:'30px', height:'30px'}} alt="My Icon" onClick={() => handleEdit(employee)}    /> */}
                      {/* <FontAwesomeIcon icon={faTrash} size="2x"  onClick={() => handleDelete(employee.id)} className="mr-2"   /> */}
                      {/* <img src={deleteicon} style={{ width:'30px', height:'30px'}} alt="My Icon"  onClick={() => handleDelete(employee.id)}  /> */}
                      {/* <Button variant="primary" onClick={() => handleViewDetail(employee)}>View</Button> */}
                      {/* <Button variant='secondary' onClick={() => handleEdit(employee)}>Edit</Button>
                    <Button variant='danger' onClick={() => handleDelete(employee.id)}>Delete</Button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
            <span style={{ margin: '0 10px' }}>{currentPage}</span>
            <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
          </div>
        </Col>
      </Row>
      <div>
        <Modal show={show} onHide={handleModalClose} animation={true}>
          <CreateEmployee employee={selectedEmployee} handleClose={handleModalClose} showCreateButton={showButton} />
        </Modal>
      </div>

    </Container>



  );
}
