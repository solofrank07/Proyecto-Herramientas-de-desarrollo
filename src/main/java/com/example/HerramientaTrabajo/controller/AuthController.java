package com.example.HerramientaTrabajo.controller;

import com.example.HerramientaTrabajo.dto.ApiResponse;
import com.example.HerramientaTrabajo.dto.LoginRequest;
import com.example.HerramientaTrabajo.dto.LoginResponse;
import com.example.HerramientaTrabajo.dto.RegisterRequest;
import com.example.HerramientaTrabajo.dto.RegisterResponse;
import com.example.HerramientaTrabajo.model.Usuario;
import com.example.HerramientaTrabajo.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UsuarioService service;

    public AuthController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginRequest request) {

        Usuario usuario = service.login(
                request.getCorreo(),
                request.getPassword()
        );

        if (usuario == null) {

            ApiResponse<LoginResponse> response =
                    new ApiResponse<>(false,
                            "Correo o contraseña incorrectos",
                            null);

            return ResponseEntity.badRequest().body(response);
        }

        LoginResponse loginResponse = new LoginResponse(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getCorreo()
        );

        ApiResponse<LoginResponse> response =
                new ApiResponse<>(true,
                        "Inicio de sesión exitoso",
                        loginResponse);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(@RequestBody RegisterRequest request) {

        Usuario usuario = new Usuario();

        usuario.setNombre(request.getNombre());
        usuario.setCorreo(request.getCorreo());
        usuario.setContrasena(request.getContrasena());

        String error = service.validarRegistro(usuario);

        if (error != null) {

            String mensaje;

            switch (error) {

                case UsuarioService.CAMPOS_VACIOS:
                    mensaje = "Todos los campos son obligatorios";
                    break;

                case UsuarioService.NOMBRE_LARGO:
                    mensaje = "El nombre no puede superar los 50 caracteres";
                    break;

                case UsuarioService.NOMBRE_CORTO:
                    mensaje = "El nombre debe tener al menos 3 caracteres";
                    break;

                case UsuarioService.CORREO_INVALIDO:
                    mensaje = "Formato de correo inválido";
                    break;

                case UsuarioService.PASSWORD_CORTA:
                    mensaje = "La contraseña debe tener mínimo 5 caracteres";
                    break;

                case UsuarioService.CORREO_EXISTE:
                    mensaje = "El correo ya está registrado";
                    break;

                case UsuarioService.CORREO_LARGO:
                    mensaje = "El correo no puede superar los 100 caracteres";
                    break;

                case UsuarioService.PASSWORD_LARGA:
                    mensaje = "La contraseña no puede superar los 50 caracteres";
                    break;

                case UsuarioService.CORREO_CORTO:
                    mensaje = "El correo debe tener al menos 8 caracteres";
                    break;

                default:
                    mensaje = "Error de validación";
            }

            ApiResponse<Object> response =
                    new ApiResponse<>(false, mensaje, null);

            return ResponseEntity.badRequest().body(response);
        }

        Usuario nuevoUsuario = service.registrar(usuario);

        RegisterResponse registerResponse = new RegisterResponse(
                nuevoUsuario.getId(),
                nuevoUsuario.getNombre(),
                nuevoUsuario.getCorreo()
        );

        ApiResponse<RegisterResponse> response =
                new ApiResponse<>(true,
                        "Usuario registrado correctamente",
                        registerResponse);

        return ResponseEntity.ok(response);
    }
}