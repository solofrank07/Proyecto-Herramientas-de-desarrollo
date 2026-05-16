package com.example.HerramientaTrabajo.model;

public class Receta {

    private String nombre;
    private String descripcion;
    private int precio;
    private String momento;

<<<<<<< HEAD
    // Constructor vacío
    public Receta() {
    }

    // Constructor con parámetros
=======
>>>>>>> f7ead132db0219c71c8f5d55056183e2c6c913c4
    public Receta(String nombre, String descripcion, int precio, String momento) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.momento = momento;
    }

<<<<<<< HEAD
    // Getters y Setters
=======
>>>>>>> f7ead132db0219c71c8f5d55056183e2c6c913c4
    public String getNombre() {
        return nombre;
    }

<<<<<<< HEAD
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

=======
>>>>>>> f7ead132db0219c71c8f5d55056183e2c6c913c4
    public String getDescripcion() {
        return descripcion;
    }

<<<<<<< HEAD
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

=======
>>>>>>> f7ead132db0219c71c8f5d55056183e2c6c913c4
    public int getPrecio() {
        return precio;
    }

<<<<<<< HEAD
    public void setPrecio(int precio) {
        this.precio = precio;
    }

    public String getMomento() {
        return momento;
    }

    public void setMomento(String momento) {
        this.momento = momento;
    }
=======
    public String getMomento() {
        return momento;
    }
>>>>>>> f7ead132db0219c71c8f5d55056183e2c6c913c4
}