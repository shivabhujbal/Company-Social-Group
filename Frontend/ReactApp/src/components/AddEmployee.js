import React, { useEffect, useState } from 'react';
import EmployeeService from '../services/LoginService';
import GroupEmployeeService from '../services/GroupEmployeeService';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const AddEmployee = ({ newGroupId }) => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const getEmployee = async () => {
      const employeeData = Cookies.get('employee');
      if (employeeData) {
        const parsedEmployee = JSON.parse(employeeData);
        setEmployee(parsedEmployee);
        console.log(parsedEmployee.id);
      }
    };
  
    const getAllEmployees = async () => {
      try {
        const response = await EmployeeService.getAllEmployees();
        setEmployees(response);
        console.log(response); // Output the fetched employee data
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };
  
    getEmployee();
    getAllEmployees();
  }, []);
  

  const handleCheckboxChange = (employeeId) => {
    setSelectedEmployees((prevSelectedEmployees) => {
      if (prevSelectedEmployees.includes(employeeId)) {
        return prevSelectedEmployees.filter((id) => id !== employeeId);
      } else {
        return [...prevSelectedEmployees, employeeId];
      }
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    selectedEmployees.push(employee.id)
    console.log(selectedEmployees);
    try {
      const request = {
        group_id: newGroupId,
        employee_ids: selectedEmployees.map(Number)


      };
      console.log(typeof(selectedEmployees.map(Number)));

      const response = await GroupEmployeeService.addemployeesToGroup(request);
      console.log('Response:', response);
      alert('Employees added successfully!');

      navigate(employee.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
    } catch (error) {
      console.error('Error adding employees to group:', error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
  employee.role === 'user' && employee.username.toLowerCase().includes(searchTerm.toLowerCase())
);



  return (
    <div className="container mt-4">
    <h3 className="mb-4">Select Employees</h3>
    <div className="card">
      <div className="card-body" style={{ maxHeight: '300px', overflowY: 'auto' }}>
        <input
          type="text"
          placeholder="Search employees"
          value={searchTerm}
          onChange={handleSearch}
          className="form-control mb-3"
        />
        <form onSubmit={handleOnSubmit}>
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {/* Map through filteredEmployees here */}
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.username}</td>
                    <td>
                      <div className="form-check text-end">
                        <input
                          type="checkbox"
                          className="form-check-input border border-primary"
                          id={`employee-${employee.id}`}
                          value={employee.id}
                          onChange={() => handleCheckboxChange(employee.id)}
                          checked={selectedEmployees.includes(employee.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3">
          
          </div>
          
        </form>
        
      </div>

    </div>
            <button type="submit" className="btn btn-primary" onClick={handleOnSubmit}>
              Add Selected Employees
            </button>
  </div>
);
};

export default AddEmployee;
