package com.example.HerramientaTrabajo.controller;

import com.example.HerramientaTrabajo.dto.ApiResponse;
import com.example.HerramientaTrabajo.dto.RegisterResponse;
import com.example.HerramientaTrabajo.dto.UpdateProfileRequest;
import com.example.HerramientaTrabajo.model.Usuario;
import com.example.HerramientaTrabajo.service.UsuarioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.HerramientaTrabajo.dto.UpdatePasswordRequest;

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

    @PutMapping("/perfil/{id}")
    public ResponseEntity<ApiResponse<?>> actualizarPerfil(
            @PathVariable Long id,
            @RequestBody UpdateProfileRequest request) {

        Usuario usuario = service.actualizarPerfil(
                id,
                request.getNombre(),
                request.getCorreo()
        );

        if (usuario == null) {

            ApiResponse<Object> response =
                    new ApiResponse<>(
                            false,
                            "No fue posible actualizar el perfil",
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
                        "Perfil actualizado correctamente",
                        perfil
                );

        return ResponseEntity.ok(response);
    }

    @PutMapping("/password/{id}")
    public ResponseEntity<ApiResponse<?>> actualizarPassword(
            @PathVariable Long id,
            @RequestBody UpdatePasswordRequest request) {

        Usuario usuario = service.actualizarPassword(
                id,
                request.getPasswordActual(),
                request.getPasswordNueva()
        );

        if (usuario == null) {

            ApiResponse<Object> response =
                    new ApiResponse<>(
                            false,
                            "No fue posible actualizar la contraseña",
                            null
                    );

            return ResponseEntity.badRequest().body(response);
        }

        ApiResponse<Object> response =
                new ApiResponse<>(
                        true,
                        "Contraseña actualizada correctamente",
                        null
                );

        return ResponseEntity.ok(response);
    }

}