package com.excelr.service;

import java.util.List;

import com.excelr.entity.Employee;
import com.excelr.entity.MyGroup;


public interface GroupEmployeeService {
	
	public void addEmployeeToGroup(int group_id,int employee_id);
	public void addEmployeesToGroup(int group_id,List<Integer> employee_ids);
	void removeEmployeeFromGroup(int group_id, int employee_id);
	List<Employee> getEmployeeByGroupId(int group_id);

	List<MyGroup> getAllGroupsByEmployeeId(int employee_id);
	List<MyGroup> findByEmployeesContaining(Employee employee);

}
