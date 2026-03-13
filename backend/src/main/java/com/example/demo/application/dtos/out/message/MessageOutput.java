package com.example.demo.application.dtos.out.message;

import com.example.demo.domain.message.Message;
import com.example.demo.domain.user.User;

public record MessageOutput(User user, Message text) {
}