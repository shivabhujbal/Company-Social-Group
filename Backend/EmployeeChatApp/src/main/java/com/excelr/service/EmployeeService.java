package com.excelr.service;

import java.util.List;

import com.excelr.entity.Employee;

public interface EmployeeService {

	String getRoleByUsername(String username, String password);

	Employee validateLogin(String username, String password);

	List<Employee> gelAllEmps();
	
	Employee getEmployeeById(int id);

}
