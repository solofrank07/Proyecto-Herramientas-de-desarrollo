package com.example.HerramientaTrabajo.controller;

import com.example.HerramientaTrabajo.model.Usuario;
import com.example.HerramientaTrabajo.service.UsuarioService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
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
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {

        Usuario nuevoUsuario = service.registrar(usuario);

        if (nuevoUsuario == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Todos los campos son obligatorios o el correo ya existe");
        }

        return ResponseEntity.ok(nuevoUsuario);
    }

}
