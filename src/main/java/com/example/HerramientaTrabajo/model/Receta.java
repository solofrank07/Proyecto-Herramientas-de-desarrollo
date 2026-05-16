package com.example.HerramientaTrabajo.model;

public class Receta {

    private String nombre;
    private String descripcion;
    private int precio;
    private String momento;

    // Constructor vacío
    public Receta() {
    }

    // Constructor con parámetros
    public Receta(String nombre, String descripcion, int precio, String momento) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.momento = momento;
    }

    // Getters y Setters
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getPrecio() {
        return precio;
    }

    public void setPrecio(int precio) {
        this.precio = precio;
    }

    public String getMomento() {
        return momento;
    }

    public void setMomento(String momento) {
        this.momento = momento;
    }
}