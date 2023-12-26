// MyGroupServiceImpl.java
package com.excelr.service.impl;

import com.excelr.entity.Messages;
import com.excelr.entity.MyGroup;
import com.excelr.repository.MyGroupRepository;
import com.excelr.service.MessageService;
import com.excelr.service.MyGroupService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MyGroupServiceImpl implements MyGroupService {

    private final MyGroupRepository myGroupRepository;

    @Autowired
    public MyGroupServiceImpl(MyGroupRepository myGroupRepository) {
        this.myGroupRepository = myGroupRepository;
    }

    @Autowired
    MessageService messageService;

    @Override
    public List<MyGroup> getAllGroups() {
        try {
            return myGroupRepository.findAll();
        } catch (Exception e) {
            // Handle the exception (log it or rethrow, depending on your needs)
            throw new RuntimeException("Error while fetching all groups", e);
        }
    }

    @Override
    public MyGroup getGroupById(int id) {
        try {
            return myGroupRepository.findById(id).orElse(null);
        } catch (Exception e) {
            throw new RuntimeException("Error while fetching group by ID " + id, e);
        }
    }

    @Override
    public MyGroup createGroup(MyGroup group) {
        // You may want to add validation or business logic before saving
        return myGroupRepository.save(group);
    }

    @Override
    public void updateGroup(MyGroup group) {
        try {
            if (myGroupRepository.existsById(group.getId())) {
                // You may want to add validation or business logic before updating
                myGroupRepository.save(group);
            } else {
                // Handle the case where the group doesn't exist
                throw new IllegalArgumentException("Group with ID " + group.getId() + " not found");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error while updating group", e);
        }
    }

    @Override
    public void deleteGroupById(int id) {
        try {
            if (myGroupRepository.existsById(id)) {
                MyGroup group = myGroupRepository.findById(id).get();
                group.setEmployees(null);

                List<Messages> messages = messageService.getAllMessagesByGroupId(id);
                for (Messages message : messages) {
                    messageService.deleteMessageById(message.getId());
                }


                myGroupRepository.deleteById(id);
            } else {
                // Handle the case where the group doesn't exist
                throw new IllegalArgumentException("Group with ID " + id + " not found");
            }
        } catch (Exception e) {
            throw new RuntimeException("Error while deleting group by ID " + id, e);
        }
    }

    @Override
    public List<MyGroup> findByType(String type) {
        try {
            return myGroupRepository.findByType(type);
            // Assuming that there is a method in MyGroupRepository named findByType
            // that returns a list of MyGroup entities based on the 'type' parameter.
        } catch (Exception e) {
            throw new RuntimeException("Error while fetching groups by type", e);
        }
    }
}
