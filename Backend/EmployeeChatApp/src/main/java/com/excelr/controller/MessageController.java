package com.excelr.controller;



import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.excelr.entity.Messages;

import com.excelr.service.MessageService;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class MessageController {

	@Autowired
	MessageService messageService;
	
	@PostMapping("/message")
	public ResponseEntity<Messages> addMessage(@RequestBody Messages message)
	{
		return new ResponseEntity<Messages>(messageService.addMessage(message), HttpStatus.OK);

	}
	
	@GetMapping("/message/{id}")
	public ResponseEntity<List<Messages>> getAllMessages(@PathVariable int id){
		return new ResponseEntity<List<Messages>>(messageService.getAllMessagesByGroupId(id),HttpStatus.OK);

	}
	
	@GetMapping("/messages/{id}")
	public ResponseEntity<Messages> getMessageById(@PathVariable int id)
	{
		return new ResponseEntity<Messages>(messageService.getMessageById(id), HttpStatus.OK);
	}
	
	@DeleteMapping("/message/{id}")
	public ResponseEntity<String> deleteMessage(@PathVariable int id)
	{
		return new ResponseEntity<String>(messageService.deleteMessageById(id), HttpStatus.OK);
	}
	 
	@PutMapping("/message/{id}")
	public ResponseEntity<String> updateMessage(@PathVariable int id, @RequestBody Messages message)
	{
		return new ResponseEntity<String>(messageService.updateMessageById(id, message), HttpStatus.OK);
	}




	
	
	
	
}

