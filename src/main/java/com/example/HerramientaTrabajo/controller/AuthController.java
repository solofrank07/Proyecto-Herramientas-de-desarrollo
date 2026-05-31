package com.example.HerramientaTrabajo.controller;

import com.example.HerramientaTrabajo.model.Usuario;
import com.example.HerramientaTrabajo.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UsuarioService service;

    public AuthController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public Usuario login(@RequestBody Map<String, String> datos) {

        String correo = datos.get("correo");
        String pass = datos.get("password");

        return service.login(correo, pass);
    }

    @PostMapping("/register")
    public Object registrar(@RequestBody Usuario usuario) {

        Usuario nuevo = service.registrar(usuario);

        if (nuevo == null) {
            return Map.of(
                    "status", "error",
                    "mensaje", "El correo ya existe"
            );
        }

        return Map.of(
                "status", "ok",
                "mensaje", "Usuario registrado correctamente"
        );
    }
}
