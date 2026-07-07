package com.example.HerramientaTrabajo.controller;

import com.example.HerramientaTrabajo.model.Usuario;
import com.example.HerramientaTrabajo.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.HerramientaTrabajo.dto.LoginRequest;
import com.example.HerramientaTrabajo.dto.LoginResponse;
import com.example.HerramientaTrabajo.dto.RegisterRequest;
import com.example.HerramientaTrabajo.dto.RegisterResponse;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UsuarioService service;

    public AuthController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Usuario usuario = service.login(
                request.getCorreo(),
                request.getPassword()
        );

        if (usuario == null) {
            return ResponseEntity
                    .badRequest()
                    .body("Correo o contraseña incorrectos");
        }

        LoginResponse response = new LoginResponse(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getCorreo()
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

        Usuario usuario = new Usuario();

        usuario.setNombre(request.getNombre());
        usuario.setCorreo(request.getCorreo());
        usuario.setContrasena(request.getContrasena());

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
                    return ResponseEntity.badRequest()
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

        RegisterResponse response = new RegisterResponse(
                nuevoUsuario.getId(),
                nuevoUsuario.getNombre(),
                nuevoUsuario.getCorreo()
        );

        return ResponseEntity.ok(response);
    }
}