package com.example.HerramientaTrabajo.controller;

import com.example.HerramientaTrabajo.dto.ApiResponse;
import com.example.HerramientaTrabajo.dto.RegisterResponse;
import com.example.HerramientaTrabajo.model.Usuario;
import com.example.HerramientaTrabajo.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin
public class UsuarioController {

    private final UsuarioService service;

    public UsuarioController(UsuarioService service) {
        this.service = service;
    }

    @GetMapping("/perfil/{id}")
    public ResponseEntity<ApiResponse<?>> obtenerPerfil(@PathVariable Long id) {

        Usuario usuario = service.obtenerPerfil(id);

        if (usuario == null) {

            ApiResponse<Object> response =
                    new ApiResponse<>(
                            false,
                            "Usuario no encontrado",
                            null
                    );

            return ResponseEntity
                    .badRequest()
                    .body(response);
        }

        RegisterResponse perfil = new RegisterResponse(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getCorreo()
        );

        ApiResponse<RegisterResponse> response =
                new ApiResponse<>(
                        true,
                        "Perfil obtenido correctamente",
                        perfil
                );

        return ResponseEntity.ok(response);
    }
}