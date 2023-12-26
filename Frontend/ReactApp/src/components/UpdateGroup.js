import { Link, useNavigate, useParams } from "react-router-dom";
import MessageService from "../services/MessageService";
import React, { useEffect, useState } from "react";
import MyGroupService from "../services/MyGroupService";
import { ToastContainer, toast } from "react-toastify";

const UpdateGroup = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [group, setGroup] = useState({
    groupId: id,
    name: "",
    type: "",
  });

  const { groupId, name, type } = group;

  useEffect(() => {
    loadGroup();
  }, []);
  const loadGroup = async () => {
    const res = await MyGroupService.getGroupById(id);
    setGroup(res);
    console.log(res);
  };

  const handleChange = (e) => {
    setGroup({ ...group, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await MyGroupService.updateGroup(id, group).then(() => {
      toast.success('Group updated', {
        position: toast.POSITION.TOP_CENTER
      });
      navigate(`/admin/dashboard`);
    });
    console.log(response);
  };
  return (
    <div className="container">
      <ToastContainer className="text-start mx-5" />
      <form action="" className="form-control my-5">
        <h2>Update Group Details</h2>
        <div class="container my-5">
          <form id="updateEmployeeForm">
            <div class="form-group">
              <label for="groupName">Group Name:</label>
              <input
                type="text"
                onChange={handleChange}
                class="form-control"
                id="groupName"
                value={name}
                name="name"
                required=""
              ></input>
            </div>

            <div>
              <label for="type">Group Type:</label>
              <select
                className=" form-control"
                name="type"
                value={type}
                onChange={handleChange}
                id="type"
              >
                <option value="#" disabled>
                  Select type
                </option>
                <option value="Technical">Technical</option>
                <option value="Functional">Functional</option>
              </select>
            </div>

            <div className="text-center">
              <button
                type="button"
                class="btn btn-info "
                onClick={handleSubmit}
              >
                Update
              </button>

              <Link
                type="button"
                class="btn btn-info m-2"
                to="/admin/dashboard"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </form>
    </div>
  );
};
export default UpdateGroup;
