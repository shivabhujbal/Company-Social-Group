package com.excelr.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="Mygroups")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MyGroup {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "group_id")
	private int id;
	

	private String name;
	
	
	private String type;
	
	@ManyToMany
	@JoinTable(
			name="group_employee",
			joinColumns = @JoinColumn(referencedColumnName ="group_id"),
			inverseJoinColumns = @JoinColumn(referencedColumnName ="employee_id")
			)
	
	private List<Employee> employees;
	
	


}
