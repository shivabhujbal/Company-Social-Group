package com.excelr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.excelr.entity.Employee;
import java.util.Optional;


@Repository
public interface EmployeeRepository extends JpaRepository<Employee	, Integer>{
	
	Optional<Employee> findByUsernameAndPassword(String username, String password);
	

}
