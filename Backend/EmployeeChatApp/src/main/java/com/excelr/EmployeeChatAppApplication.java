package com.excelr;

import com.excelr.service.FilesStorageService;
import jakarta.annotation.Resource;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmployeeChatAppApplication implements CommandLineRunner {
	@Resource
	FilesStorageService storageService;


	public static void main(String[] args) {
		SpringApplication.run(EmployeeChatAppApplication.class, args);
	}

	@Override
	public void run(String... arg) throws Exception {
//    storageService.deleteAll();
		storageService.init();
	}
}
