import React, { useState } from "react";
import MyGroupService from "../services/MyGroupService";
import AddEmployee from "./AddEmployee";
import { ToastContainer, toast } from "react-toastify";

const CreateGroup = () => {
  const [newGroup, setNewGroup] = useState(null);
  const [group, setGroup] = useState({
    name: '',
    type: ''
  });

  const handleChange = (e) => {
    setGroup({ ...group, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await MyGroupService.createGroup(group);
      setNewGroup(response);
      toast.success('Group created successfully! ' , {
        position: toast.POSITION.TOP_CENTER
      });
      console.log("New Group:", response); // Print newGroup in console
    } catch (error) {
      toast.error('Error creating group! ' , {
        position: toast.POSITION.TOP_CENTER
      });
      // console.error("Error creating group:", error);
    }
  };

  return (
    <div className="container">
    <ToastContainer className="text-start mx-5"/>
      <form onSubmit={handleSubmit} className="form-control my-5">
        <h5 className="text-center">Create Group</h5>
        <div className="container my-5">
          <div className="form-group">
            <label htmlFor="groupName">Group Name:</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              value={group.name}
              name="name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Group Type:</label>
            <select
              name="type"
              id="type"
              className="form-control"
              value={group.type}
              onChange={handleChange}
            required>
              <option value="" >
                Select type
              </option>
              <option value="Technical">Technical</option>
              <option value="Functional">Functional</option>
            </select>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-info my-2">
              Create
            </button>
            
          </div>
        </div>
      </form>

      {newGroup && newGroup.id && (
                <AddEmployee newGroupId={newGroup.id}></AddEmployee>
            )}
    </div>
  );
};

export default CreateGroup;