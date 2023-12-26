import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useNavigate } from "react-router-dom";
import MyGroupService from "../services/MyGroupService";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ToastContainer, toast } from "react-toastify";

const Info = () => {
  const [group, setGroup] = useState(null);
  const navigate = useNavigate();
  const employee = JSON.parse(Cookies.get("employee"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const selectedGroup = Cookies.get("group");

        if (selectedGroup) {
          const groupData = await JSON.parse(selectedGroup);
          setGroup(groupData);
        }
      } catch (error) {
        console.error("Error:", error);
        setGroup({});
      }
    };

    fetchData();
  }, []);

  const deleteEmployee = async (employeeId) => {
    try {
      // Make an API call to delete the employee from the group
      // if(employee.role==='admin'){

        const response = await fetch(
          `http://localhost:8888/groupemployee/${group.id}/employee/${employeeId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
          );
          
          if (response.ok) {
            // If the deletion is successful, update the state to reflect the change
            const updatedEmployees = group.employees.filter(
              (employee) => employee.id !== employeeId
              );
              setGroup({ ...group, employees: updatedEmployees });
              toast.success('Employee deleted', {
                position: toast.POSITION.TOP_CENTER
              });
            } else {
              toast.error("Error deleting employee:", response.statusText, {
                position: toast.POSITION.TOP_CENTER
              });
            // }
      }
    } catch (error) {
      toast.error("Error deleting employee:", error, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };

  const handleBack = () => {
    console.log(employee.role);
    if (employee.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  };

  const navigateToAdd = () => {
    if (employee.role === "admin") {
      navigate(`/admin/dashboard/add/${group.id}`);
    }
  };

  const handleDeletegroup = async (id) => {
    try {
      await MyGroupService.deleteGroupById(id);
      toast.success("Group added successfully! ", {
        position: toast.POSITION.TOP_CENTER,
      });
      //  console.log('deleted');
      if (employee.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (error) {
      toast.error("Error while delete group", error, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  };
  return (
    <div className="container mt-4">
    <ToastContainer className="text-start mx-5"/>
      <h3 className="mb-4">Group Information</h3>
      {group && (
        <div>
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Group Details</h5>
                  <p className="card-text">Name: {group.name}</p>
                  <p className="card-text">Type: {group.type}</p>
                </div>
              </div>
              {employee.role === "admin" && (
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeletegroup(group.id)}
                >
                  Delete
                </button>
                // <button className='btn btn-danger mt-4' onClick={()=>handleDeletegroup(group.id)} >Delete Group</button>
              )}
            </div>
            {/* Delete group button visible only to the admin */}

            <div className="col-md-6">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Admin</h5>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Role</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.employees
                        .filter((employee) => employee.role === "admin")
                        .map((employee, index) => (
                          <tr key={index}>
                            <td>{employee.username}</td>
                            <td>{employee.role}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-body">
              <h5 className="card-title">Group Members</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    
                    {employee.role==='admin' ? ( <th>Action</th>):(<div></div>)}
                  </tr>
                </thead>
                <tbody>
                  {group.employees
                    .filter(employee => employee.role === "user")
                    .map((emp, index) => (
                      <tr key={index}>
                        <td>{emp.username}</td>
                        <td>{emp.role}</td>
                        {employee.role ==='admin' ? ( <td>
                          <DeleteIcon
                            style={{ fontSize: "16px", color: "red" }}
                            onClick={() => deleteEmployee(emp.id)}
                          />
                        </td>):(<div></div>)}
                       
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      <ArrowBackIcon
        className="mt-4 " // Custom classes
        fontSize="large" // Font size
        style={{
          // Custom styles
          color: "black", // Change icon color
          cursor: "pointer", // Add pointer cursor on hover
          marginRight: "10px", // Add margin-right
        }}
        onClick={handleBack} // onClick function
      />{" "}
      {employee.role === "admin" && (
        <button onClick={navigateToAdd} className="btn btn-primary mt-4 mx-3">
          Add Employee
        </button>
      )}
    </div>
  );
};

export default Info;
