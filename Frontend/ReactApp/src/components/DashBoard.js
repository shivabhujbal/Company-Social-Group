import React, { useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import {  useNavigate } from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
import UpdateIcon from '@mui/icons-material/Update';
import LogoutIcon from '@mui/icons-material/Logout';
import MyGroupService from "../services/MyGroupService";
import MessageService from "../services/MessageService";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageService from "../services/ImageService";
import {  ToastContainer,toast } from "react-toastify";




import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';


const DashBoard = () => {
  const [employee, setEmployee] = useState('');
  const [messages, setMessages] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [groupName, setGroupName] = useState('');
  const [allGroups, setAllGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const [userInitials, setUserInitials] = useState('');
  const [groupInitials, setGroupInitials] = useState('');

  // ------------------------------------

  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
 



  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const fileSizeInKB = file.size / 1024; // Calculate file size in KB

  if (fileSizeInKB > 500) {
    toast.error('Size limit is 500kb ! ' , {
      position: toast.POSITION.TOP_CENTER
    });
    } else {
    setImageFile(file);
  }
  };


  const handleAddAttachment = () => {
    fileInputRef.current.click();
    
  };


  const handleSend = async () => {
    try {

      let imgUrl= null;

      if(imageFile){

        const fileList = await ImageService.getListFiles();
        const uploadedFileName = imageFile.name;
  
        const fileNames = fileList.map(file => file.name);
        let count = 1;
        let tempFileName = uploadedFileName;
  
        while (fileNames.includes(tempFileName)) {
          const fileNameParts = uploadedFileName.split('.');
          const extension = fileNameParts.pop();
          tempFileName = `${fileNameParts.join('.')}(${count}).${extension}`;
          count++;
        }
  
        const modifiedFile = new File([imageFile], tempFileName, { type: imageFile.type });
  
        const response1 = await ImageService.uploadFile(modifiedFile);
        imgUrl = response1.message;

     

      }
      
      const messageData = {
        text: messageInput,
        group: selectedGroup,
        employee: employee,
        localDateTime:new Date(),
        url: imgUrl,
       
      };

      const response = await MessageService.createMessage(messageData);
      setMessages([...messages,response]);
      setMessageInput('');
      setImageFile(null);
    } catch (error) {
      console.error("Error Sending Message");
    }
  };




  useEffect(() => {
    const getEmployee = async () => {
      const employeeData = Cookies.get('employee');
      if (employeeData) {
        const parsedEmployee = await JSON.parse(employeeData);
        setEmployee(parsedEmployee);
        const initials = calculateInitials(parsedEmployee.username);
        setUserInitials(initials);
      }
    };

    const calculateInitials = (name) => {
      const nameParts = name.split(' ');
      if (nameParts.length === 1) {
        return nameParts[0].charAt(0).toUpperCase();
      } else {
        const firstNameInitial = nameParts[0].charAt(0).toUpperCase();
        const lastNameInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
        return `${firstNameInitial}${lastNameInitial}`;
      }
    };
    
    

    const fetchAllGroups = async () => {
      try {
        const fetchedAllGroups = await MyGroupService.getAllGroups();
        setAllGroups(fetchedAllGroups);
        if (fetchedAllGroups.length > 0) {
          const firstGroup = fetchedAllGroups[0];
          setSelectedGroup(firstGroup);
          fetchMessages(firstGroup.id);
          setGroupName(firstGroup.name);
          
          
        }
      } catch (error) {
        console.error('Error fetching all groups:', error);
      }
    };

    



    getEmployee();
    fetchAllGroups();
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
    setGroupInitials(calculateGroupInitials(group.name));
  };
  const calculateGroupInitials = (groupName) => {
    const initials = groupName
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
    return initials;
  };
  

  const handleInfoClick = async (group) => {
    setSelectedGroup(group);
    Cookies.set('group',JSON.stringify(group));
    navigate('info');
  };

  const handleCreate = () => {
    navigate('create');
  };

  const handleUpdate = () => {
    navigate(`update/${selectedGroup.id}`);
  };

  const handleLogout = () => {
    navigate('/');
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



const isImageFile = (url) => {
  return /\.(jpeg|jpg|gif|png)$/i.test(url);
};

const getFileIcon = (url) => {
  if (/\.(pdf)$/i.test(url)) {
    return <PictureAsPdfIcon fontSize="large" />;
  } else if (/\.(doc|docx|txt)$/i.test(url)) {
    return <DescriptionIcon fontSize="large" />;
  } else if (/\.(xls|xlsx)$/i.test(url)) {
    return <InsertDriveFileIcon  fontSize="large"/>;
  } else if (/\.(jpeg|jpg|gif|png)$/i.test(url)) {
    return <ImageIcon fontSize="large" />;
  } else {
    return <InsertDriveFileIcon fontSize="large" />;
  }
};
 

  return (
    <div>
      <div className="container-fluid h-100">
      <ToastContainer className="text-start mx-5"/>
        <div className="row h-100">
          <div className="col-12 top-div d-flex align-items-center justify-content-between px-3 bg-gray bg-darken-xs
">
            <div className="w-25">
              <span className=" fs-5">Hello  {employee.username}!</span>
            </div>
           
            <div className="w-75 text-left d-flex align-items-center justify-content-between">
            
              <span className="fw-bold fs-5">{groupName}</span>
             
              <div>
              <IconButton className="text-black" onClick={() => handleInfoClick(selectedGroup)}>
  <InfoIcon fontSize="large" />
</IconButton>

<IconButton className="text-black" onClick={handleUpdate}>
  <UpdateIcon fontSize="large" />
</IconButton>
          
          <IconButton className="bg-danger text-black " onClick={handleLogout}>
  <LogoutIcon fontSize="medium" />
</IconButton>
         
             
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
                        className={selectedGroup && selectedGroup.id === group.id ? 'table-success' : ''}
                      >
                       <td>
                            <div className="w-25">
                              {calculateGroupInitials(group.name) && (
                                <div className="profile-initials">
                                  {calculateGroupInitials(group.name)}
                                </div>
                              )}
                            </div>
                          </td>
                        <td>{group.name}-{group.type}</td>
                        

  
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="btn btn-primary btn-block mt-3" onClick={handleCreate} >Create Group</button>
            </div>
          </div>
          <div className="col-md-9 chat-window bg-cyan bg-lighten-xl">
         
         
          <div className="chat-messages">
  {messages ? (
    messages.map((message, index) => (
      <div key={index} className={`message ${message.employee.id === employee.id ? 'sent' : 'received'}`}>
        <div className={`message-content ${message.employee.id === employee.id ? 'sent-message' : 'received-message'} p-3 rounded mb-2`}>
          <div className="message-info d-flex align-items-center justify-content-between mb-1">
            <div className="d-flex align-items-center">
              <span className="message-sender fw-bold me-2">{message.employee.id === employee.id ? 'You' : message.employee.username}</span>
              <span className="message-timestamp text-muted">{new Date(message.localDateTime).toLocaleString()}</span>
            </div>
            <DeleteIcon style={{ fontSize: '16px', color: 'red' }} onClick={() => handleDeleteMessage(message.id)} />
          </div>
          <div className="message-text">
            {message.text}
          </div>
          {message.url && (
  <div className="message-attachment mt-2">
    {isImageFile(message.url) ? (
      <img
        src={`http://localhost:8888/file/files/${message.url}`}
        alt="Attached file"
        style={{ maxWidth: '100%', maxHeight: '200px' }}
      />
    ) : (
      <div className="file-icon">
        {getFileIcon(message.url)}
      </div>
    )}
  </div>
)}
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
       
        <IconButton className="bg-primary" onClick={handleAddAttachment}>
          <AttachFileIcon />
        </IconButton>
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          style={{ display: "none" }}
          onChange={handleFileInputChange}
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
