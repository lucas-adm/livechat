package com.example.demo.application.controllers.message;

import com.example.demo.application.dtos.out.message.MessageOutput;
import com.example.demo.domain.message.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService service;

    @GetMapping
    public List<MessageOutput> fetchHisotry() {
        return service.getAll();
    }

}