package com.excelr.service.impl;

import java.util.List;
import java.util.Optional;

import com.excelr.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excelr.entity.Employee;
import com.excelr.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl implements EmployeeService {
	
	@Autowired
	EmployeeRepository employeeRepository;
	
	@Override
	public String getRoleByUsername(String username,String password) {
		
		Optional<Employee> employeeOptional = employeeRepository.findByUsernameAndPassword(username, password);
		
		return employeeOptional.map(Employee::getRole).orElse(null);
	}
	
	@Override
	public Employee validateLogin(String username,String password) {
		
		Employee employee = employeeRepository.findByUsernameAndPassword(username, password).orElse(null);
		
		return employee;
	}
	
	@Override
	public List<Employee> gelAllEmps(){
		
		return employeeRepository.findAll();
	}

	@Override
	public Employee getEmployeeById(int id) {
		
		Optional<Employee> employeeOptional = employeeRepository.findById(id);
		Employee employee = null;
		
		if(employeeOptional.isPresent()) {
			employee = employeeOptional.get();
		}
		
		
		
		return employee ;
	}

}
