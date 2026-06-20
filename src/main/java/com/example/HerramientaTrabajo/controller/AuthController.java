package com.example.HerramientaTrabajo.controller;

import com.example.HerramientaTrabajo.model.Usuario;
import com.example.HerramientaTrabajo.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<?> login(@RequestBody Map<String, String> datos) {

        String correo = datos.get("correo");
        String pass = datos.get("password");

        Usuario usuario = service.login(correo, pass);

        if (usuario == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Correo o contraseña incorrectos");
        }

        return ResponseEntity.ok(usuario);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {

        String error = service.validarRegistro(usuario);

        if (error != null) {

            switch (error) {

                case UsuarioService.CAMPOS_VACIOS:
                    return ResponseEntity.badRequest()
                            .body("Todos los campos son obligatorios");

                case UsuarioService.NOMBRE_LARGO:
                    return ResponseEntity.badRequest()
                            .body("El nombre no puede superar los 50 caracteres");

                case UsuarioService.NOMBRE_CORTO:
                    return ResponseEntity.badRequest()
                            .body("El nombre debe tener al menos 3 caracteres");

                case UsuarioService.CORREO_INVALIDO:
                    return ResponseEntity.badRequest()
                            .body("Formato de correo inválido");

                case UsuarioService.PASSWORD_CORTA:
                    return ResponseEntity.badRequest()
                            .body("La contraseña debe tener mínimo 5 caracteres");

                case UsuarioService.CORREO_EXISTE:
                    return ResponseEntity.badRequest()
                            .body("El correo ya está registrado");

                case UsuarioService.CORREO_LARGO:
                    return ResponseEntity
                            .badRequest()
                            .body("El correo no puede superar los 100 caracteres");

                case UsuarioService.PASSWORD_LARGA:
                    return ResponseEntity.badRequest()
                            .body("La contraseña no puede superar los 50 caracteres");

                case UsuarioService.CORREO_CORTO:
                    return ResponseEntity.badRequest()
                            .body("El correo debe tener al menos 8 caracteres");

            }
        }

        Usuario nuevoUsuario = service.registrar(usuario);

        return ResponseEntity.ok(nuevoUsuario);
    }
}