//import React from 'react';
import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
export default function CreateEmployee() {
    // Assuming you get the data from an API or JSON file
    const initialData = {
        employeeDTO: {
          id: '',
          firstName: '',
          lastName: '',
          gender: '',
          contactNo: '',
          email: '',
          status: true,
        },  
        salaryDTO: {
          empID: '',
          amount: '',
          annual: true,
          bonus: '',
        },
        attachmentDTO: {
          empID: '',
          fileName: '',
          fileUrl: '',
        },
      };

  const [employeeData, setEmployeeData] = useState(initialData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      employeeDTO: {
        ...prevData.employeeDTO,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can submit the data to the server or handle the form submission
    console.log(employeeData);
  };

  return (
    <Container>
      <h1>Create Employee</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            name="firstName"
            value={employeeData.employeeDTO.firstName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            name="lastName"
            value={employeeData.employeeDTO.lastName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="gender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            as="select"
            name="gender"
            value={employeeData.employeeDTO.gender}
            onChange={handleChange}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="contactNo">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Enter contact number"
            name="contactNo"
            value={employeeData.employeeDTO.contactNo}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={employeeData.employeeDTO.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={employeeData.employeeDTO.status}
            onChange={handleChange}
          >
            <option value={true}>Active</option>
            <option value={false}>Inactive</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="amount">
          <Form.Label>Salary Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter salary amount"
            name="amount"
            value={employeeData.salaryDTO.amount}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="annual">
          <Form.Check
            type="checkbox"
            label="Is Annual Salary?"
            name="annual"
            checked={employeeData.salaryDTO.annual}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="bonus">
          <Form.Label>Bonus (%)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter bonus percentage"
            name="bonus"
            value={employeeData.salaryDTO.bonus}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="fileName">
          <Form.Label>File Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter file name"
            name="fileName"
            value={employeeData.attachmentDTO.fileName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="fileUrl">
          <Form.Label>File URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter file URL"
            name="fileUrl"
            value={employeeData.attachmentDTO.fileUrl}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Employee
        </Button>
      </Form>
    </Container>
  )
}
