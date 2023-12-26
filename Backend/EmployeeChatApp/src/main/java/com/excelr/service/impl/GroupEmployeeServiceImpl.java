package com.excelr.service.impl;

import java.util.List;


import com.excelr.service.GroupEmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excelr.entity.Employee;
import com.excelr.entity.MyGroup;
import com.excelr.repository.EmployeeRepository;
import com.excelr.repository.MyGroupRepository;

import jakarta.transaction.Transactional;

@Service
public class GroupEmployeeServiceImpl implements GroupEmployeeService {
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	@Autowired
	MyGroupRepository groupRepository;

	@Override
	@Transactional
	public void addEmployeeToGroup(int group_id, int employee_id) {
		
		Employee employee = employeeRepository.findById(employee_id).orElse(null);
		MyGroup group = groupRepository.findById(group_id).orElse(null);
		
		if(employee != null && group !=null) {
			
			if(!group.getEmployees().contains(employee)) {
				group.getEmployees().add(employee);
				groupRepository.save(group);
			}
			else {
				
				System.out.println("Emp already exits");
		
			}
			
			
		}
		else {
			System.out.println("Emp or Group not Found ");
			
		}
	
		
	}

	@Override
	public void removeEmployeeFromGroup(int group_id, int employee_id) {
		MyGroup group = groupRepository.findById(group_id).orElse(null);
		Employee employee = employeeRepository.findById(employee_id).orElse(null);
		if(group != null && group.getEmployees().contains(employee)) {
			
			group.getEmployees().remove(employee);
			groupRepository.save(group);
			
		}
		else {
			System.out.println("ErrorInRemoveEmployee");
		}
		
	}

	@Override
	public List<Employee> getEmployeeByGroupId(int group_id) {
		MyGroup group = groupRepository.findById(group_id).orElse(null);
		if(group!=null) {
			return group.getEmployees().stream().toList();
		}
		return null;
	}

	@Override
	public List<MyGroup> getAllGroupsByEmployeeId(int employee_id) {
		Employee employee = employeeRepository.findById(employee_id).orElse(null);
		if (employee!=null){

			return groupRepository.findByEmployeesContaining(employee);

		}

		return null;
	}

	@Override
	public List<MyGroup> findByEmployeesContaining(Employee employee) {
		return groupRepository.findByEmployeesContaining(employee);
	}


	@Override
	@Transactional
	public void addEmployeesToGroup(int group_id, List<Integer> employee_ids) {
		MyGroup group = groupRepository.findById(group_id).orElse(null);
		if(group !=null) {
			
			for(int emp_id:employee_ids) {
				Employee employee = employeeRepository.findById(emp_id).orElse(null);
				if(employee != null && !group.getEmployees().contains(employee)) {
					group.getEmployees().add(employee);
				}
			}
		
			
			groupRepository.save(group);	
		}
		else {
			System.out.println("GroupNotFound");
		}
		
		
	}
	
	

}
