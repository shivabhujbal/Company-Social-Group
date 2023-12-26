package com.excelr.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "messages")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Messages {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "message_id")
	private int id;
	
	@ManyToOne
	@JoinColumn(name = "employee_id")
	private Employee employee;
	
	@ManyToOne
	@JoinColumn(name = "group_id")
	private MyGroup group;
	
	private String text;
	
	private LocalDateTime localDateTime;


	private String url;





}
