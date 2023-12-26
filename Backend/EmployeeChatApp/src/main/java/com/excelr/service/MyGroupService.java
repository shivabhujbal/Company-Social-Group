// MyGroupService.java (interface)
package com.excelr.service;

import com.excelr.entity.MyGroup;

import java.util.List;

public interface MyGroupService {

    List<MyGroup> getAllGroups();

    MyGroup getGroupById(int id);

   MyGroup createGroup(MyGroup group);

    void updateGroup(MyGroup group);

    void deleteGroupById(int id);

    List<MyGroup> findByType(String type);
}
