package com.example.HerramientaTrabajo.controller;

import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class LoginController {

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {

        String usuario = request.get("usuario");
        String password = request.get("password");

        if ("admin".equals(usuario) && "1234".equals(password)) {
            return Map.of("status", "ok");
        } else {
            return Map.of("status", "error");
        }
    }
}