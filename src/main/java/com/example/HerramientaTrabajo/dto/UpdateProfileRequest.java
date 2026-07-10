package com.example.HerramientaTrabajo.dto;

import com.example.HerramientaTrabajo.dto.UpdateProfileRequest;

public class UpdateProfileRequest {

    private String nombre;
    private String correo;

    public UpdateProfileRequest() {
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }
}