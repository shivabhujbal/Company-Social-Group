// MyGroupController.java
package com.excelr.controller;

import com.excelr.entity.MyGroup;
import com.excelr.service.MyGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/mygroups")
@CrossOrigin
public class MyGroupController {

    private final MyGroupService myGroupService;

    @Autowired
    public MyGroupController(MyGroupService myGroupService) {
        this.myGroupService = myGroupService;
    }

    @GetMapping
    public ResponseEntity<List<MyGroup>> getAllGroups() {
        List<MyGroup> groups = myGroupService.getAllGroups();
        return new ResponseEntity<>(groups, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MyGroup> getGroupById(@PathVariable int id) {
        MyGroup group = myGroupService.getGroupById(id);
        return group != null
                ? new ResponseEntity<>(group, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<MyGroup> createGroup(@RequestBody MyGroup group) {

        return new ResponseEntity<MyGroup>(myGroupService.createGroup(group),HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateGroup(@PathVariable int id, @RequestBody MyGroup group) {
        group.setId(id);
        myGroupService.updateGroup(group);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable int id) {
        myGroupService.deleteGroupById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/type/{type}")
    public ResponseEntity<List<MyGroup>> getGroupsByType(@PathVariable String type) {
        List<MyGroup> groups = myGroupService.findByType(type);
        return new ResponseEntity<>(groups, HttpStatus.OK);
    }
}
