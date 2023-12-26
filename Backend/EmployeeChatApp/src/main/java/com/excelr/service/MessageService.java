package com.excelr.service;

import java.io.IOException;
import java.util.List;

import com.excelr.entity.Messages;
import org.springframework.web.multipart.MultipartFile;

public interface MessageService {

	Messages addMessage(Messages message);




	List<Messages> getAllMessagesByGroupId(int groupid);
	Messages getMessageById(int id);
	String deleteMessageById(int id);
	String updateMessageById(int id, Messages message);
}
