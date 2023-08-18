//import React from 'react';
import React, { useState,useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import {createEmployee,editEmployee} from '../redux/employeeActions';


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

const CreateEmployee = ({employee,handleClose,showCreateButton }) => {
  const dispatch = useDispatch();
   
  const [formErrors, setFormErrors] = useState({}); // State to hold form validation errors

  const [employeeData, setEmployeeData] = useState(initialData);


  useEffect(() => {
    if (employee) {
      setEmployeeData({
        employeeDTO: {
          ...employee.employeeDTO,
        },
        salaryDTO: {
          ...employee.salaryDTO,
        },
        attachmentDTO: {
          ...employee.attachmentDTO,
        },
      });
    } else {
      setEmployeeData(initialData); 
    }
  }, [employee]);


  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;
  
    if (name === 'gender') {
      setEmployeeData((prevData) => ({
        ...prevData,
        employeeDTO: {
          ...prevData.employeeDTO,
          gender: newValue,
        },
      }));
    } else {
      setEmployeeData((prevData) => ({
        ...prevData,
        employeeDTO: {
          ...prevData.employeeDTO,
          [name]: newValue,
        },
        salaryDTO: {
          ...prevData.salaryDTO,
          [name]: newValue,
        },
        attachmentDTO: {
          ...prevData.attachmentDTO,
          [name]: newValue,
        },
      }));
    }
  };
  
  
  // const handleChange = (event) => {
  //   const { name, value, type, checked } = event.target;
  //   const newValue = type === 'checkbox' ? checked : value;

  //   setEmployeeData((prevData) => ({
  //     ...prevData,
  //     employeeDTO: {
  //       ...prevData.employeeDTO,
  //       [name]: newValue,
  //     },
  //     salaryDTO: {
  //       ...prevData.salaryDTO,
  //       [name]: newValue,
  //     },
  //     attachmentDTO: {
  //       ...prevData.attachmentDTO,
  //       [name]: newValue,
  //     },
  //   }));
  // };

  const validateForm = () => {
    const {
      firstName,
      lastName,
      email,
      amount,
      bonus,
    } = employeeData.employeeDTO;

    const errors = {};

    if (!firstName) {
      errors.firstName = 'First Name is required.';
    }

    if (!lastName) {
      errors.lastName = 'Last Name is required.';
    }

    if (!email) {
      errors.email = 'Email is required.';
    } else {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(email)) {
        errors.email = 'Invalid email address.';
      }
    }
 

    const numericAmount = Number(employeeData.salaryDTO.amount);
    if (!employeeData.salaryDTO.amount || isNaN(numericAmount) || numericAmount < 0) {
      errors.amount = 'Salary amount must be a valid positive number.';
    }
    
  
    const numericBonus = Number(employeeData.salaryDTO.bonus);
    if (!employeeData.salaryDTO.bonus || isNaN(numericBonus) || numericBonus < 0 || numericBonus > 100) {
      errors.bonus = 'Bonus percentage must be between 0 and 100.';
    }

    setFormErrors(errors); // Update the formErrors state with the validation errors

    return Object.keys(errors).length === 0; // If no errors, the form is valid
  };

  const handleSubmit = (event) => {
    event.preventDefault();

   const isValidForm = validateForm(); // Call the function to validate the form
    if (!isValidForm) {
      // If the form is not valid, do not submit
      return;
    }

    // Rest of the code for form submission
    // ...
    if(employeeData && employeeData.employeeDTO.id> 0)
    {
      debugger;
      const flattenedData = {
        employeeDTO: {
          id: employeeData.employeeDTO.id,
          firstName: employeeData.employeeDTO.firstName,
          lastName: employeeData.employeeDTO.lastName,
          gender: employeeData.employeeDTO.gender,
          contactNo: employeeData.employeeDTO.contactNo,
          email: employeeData.employeeDTO.email,
          status: employeeData.employeeDTO.status,
        },  
        salaryDTO: {
          empID: employeeData.salaryDTO.empID,
          amount: employeeData.salaryDTO.amount,
          annual: employeeData.salaryDTO.annual,
          bonus: employeeData.salaryDTO.bonus,
        },
        attachmentDTO: {
          empID: employeeData.attachmentDTO.empID,
          fileName: employeeData.attachmentDTO.fileName,
          fileUrl: employeeData.attachmentDTO.fileUrl,
        },
      };

      dispatch(editEmployee(flattenedData.employeeDTO.id,flattenedData));
     // setFormErrors({});
      handleClose();

    }
    else{
    const flattenedData = {
      employeeDTO: {
       // id: employeeData.employeeDTO.id,
        firstName: employeeData.employeeDTO.firstName,
        lastName: employeeData.employeeDTO.lastName,
        gender: employeeData.employeeDTO.gender,
        contactNo: employeeData.employeeDTO.contactNo,
        email: employeeData.employeeDTO.email,
        status: employeeData.employeeDTO.status,
      },  
      salaryDTO: {
       // empID: employeeData.salaryDTO.empID,
        amount: employeeData.salaryDTO.amount,
        annual: employeeData.salaryDTO.annual,
        bonus: employeeData.salaryDTO.bonus,
      },
      attachmentDTO: {
       // empID: employeeData.attachmentDTO.empID,
        fileName: employeeData.attachmentDTO.fileName,
        fileUrl: employeeData.attachmentDTO.fileUrl,
      },
    };
    
    // Here you can submit the data to the server or handle the form submission
  //  console.log(flattenedData);
    dispatch(createEmployee(flattenedData));
    handleClose();
    }
   
  };

  return (
    <Container>
     
      <Form onSubmit={handleSubmit} noValidate className="mt-4">
        <Form.Group controlId="firstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            name="firstName"
            value={employeeData.employeeDTO.firstName}
            onChange={handleChange}
            isInvalid={!!formErrors.firstName}
          />
          <Form.Control.Feedback type="invalid">{formErrors.firstName}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="lastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            name="lastName"
            value={employeeData.employeeDTO.lastName}
            onChange={handleChange}
            isInvalid={!!formErrors.lastName}
          />
          <Form.Control.Feedback type="invalid">{formErrors.lastName}</Form.Control.Feedback>
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
            isInvalid={!!formErrors.email}
          />
           <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
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
            isInvalid={!!formErrors.amount}
          />
          <Form.Control.Feedback type="invalid">{formErrors.amount}</Form.Control.Feedback>
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
          <Form.Label>Bonus </Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter bonus percentage"
            name="bonus"
            value={employeeData.salaryDTO.bonus}
            onChange={handleChange}
            isInvalid={!!formErrors.bonus}
          />
          <Form.Control.Feedback type="invalid">{formErrors.bonus}</Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">{formErrors.firstName}</Form.Control.Feedback>
      
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
        <div className="text-center">
        {showCreateButton && (
        <Button variant="primary" type="submit" className="mt-3 mb-2">
        {employee ? "Update Employee" : "Create Employee"}
        </Button>
        )}
        </div>
      </Form>
    </Container>
  )
}
export default CreateEmployee;