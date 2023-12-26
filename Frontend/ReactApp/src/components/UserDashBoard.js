import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {  useNavigate } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import LogoutIcon from '@mui/icons-material/Logout';
import MessageService from "../services/MessageService";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import GroupEmployeeService from "../services/GroupEmployeeService";



const DashBoard = () => {
  const [employee, setEmployee] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [groupName, setGroupName] = useState('');
  const [allGroups, setAllGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getEmployee = async () => {
      const employeeData = Cookies.get('employee');
      if (employeeData) {
        const parsedEmployee = await JSON.parse(employeeData);
        setEmployee(parsedEmployee);
      }
    };

    const fetchGroups = async (id) => {
      try {
        const response = await GroupEmployeeService.getGroupsByEmployeeId(id);
        setAllGroups(response);
        Cookies.set("groups", response);
      } catch (error) {
        console.error("Error fetching groups:", error);
      }
    };

    getEmployee();
    if (employee.id) {
      fetchGroups(employee.id);
    }
  }, [employee.id]);

  const fetchMessages = async (id) => {
    try {
      const response = await MessageService.getMessagesByGroupId(id);
      setMessages(response); 
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    fetchMessages(group.id);
    setGroupName(group.name);
  };

  const handleInfoClick = async (group) => {
    setSelectedGroup(group);
    Cookies.set('group',JSON.stringify(group));
    navigate('info');
  };

 

  

  const handleLogout = () => {
    navigate('/');
  };

  const handleSend = async () => {
    try {
      const messageData = {
        text: messageInput,
        group: selectedGroup,
        employee: employee,
        localDateTime:new Date()
      };

      const response = await MessageService.createMessage(messageData);
      setMessages([...messages,response]);
      setMessageInput('');
    } catch (error) {
      console.error("Error Sending Message");
    }
  };

  const handleDeleteMessage = async (id) => {
    try {
      const response = await MessageService.deleteMessage(id);
      if (response) {
        const updatedMessages = messages.filter((message) => message.id !== id);
        setMessages(updatedMessages);
      }
    } catch (error) {
      console.error("Error while deleting message", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredGroups = allGroups.filter(
    (group) =>
      group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-12 top-div d-flex align-items-center justify-content-between px-3 bg-gray bg-darken-xs">
            <div className="w-25">
              <span className="fw-bold">Hello  {employee.username}!</span>
            </div>
            <div className="w-75 text-left d-flex align-items-center justify-content-between">
              <span className="fw-bold">{groupName}</span>
              <div>

              <IconButton className="text-black" onClick={() => handleInfoClick(selectedGroup)}>
  <InfoIcon fontSize="large" />
</IconButton>
   
          
          <IconButton className="bg-danger text-black " onClick={handleLogout}>
  <LogoutIcon fontSize="medium" />
</IconButton>
         
                {/* <button className="btn btn-info" onClick={()=>handleInfoClick(selectedGroup)}>Info</button> */}
                {/* <button className="btn btn-success m-2" onClick={handleUpdate} >Update</button>
                <button className="btn btn-danger " onClick={handleLogout} >Logout</button> */}
              </div>
            </div>
          </div>
          <div className="col-md-3 sidebar">
            <div className="px-3 py-4 d-flex flex-column justify-content-between sidebartable">
              <div>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
                <table className="table table-hover">
                  
                  <tbody>
                    {filteredGroups.map((group, index) => (
                      <tr
                      key={group.id}
                      onClick={() => handleGroupClick(group)}
                      className={
                        selectedGroup && selectedGroup.id === group.id
                          ? "table-success"
                          : ""
                      }
                    >
                        <td>{group.name}-{group.type}</td>
                        
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-md-9 chat-window bg-cyan bg-lighten-xl">
            <div className="chat-messages">
              {messages ? (
                messages.map((message, index) => (
                  <div key={index} className={`message ${message.employee.id === employee.id ? 'sent' : 'received'}`}>
                    <div className={`message-content ${message.employee.id === employee.id ? 'sent-message' : 'received-message'} p-3 rounded mb-2`}>
                      <div className="message-info d-flex  mb-1">
                        <span className="message-sender fw-bold me-2">{message.employee.id === employee.id ? 'You' : message.employee.username}</span>
                        <span className="message-timestamp text-muted me-5 ms-4">{new Date(message.localDateTime).toLocaleString()}</span>
                        {message.employee.id === employee.id && (
                          <DeleteIcon 
                            style={{ fontSize: "16px", color: "red" }}
                            onClick={() => handleDeleteMessage(message.id)}
                          ></DeleteIcon>
                        )}                      </div>
                      <div className="message-text">
                        {message.text}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="alert alert-info">No messages available</div>
              )}
            </div>
            <div className="d-flex">
              <input
                type="text"
                className="form-control m-1"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <SendIcon
          className="icon-button"
          fontSize="large"
          onClick={handleSend}
        />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
